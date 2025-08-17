import { Op } from 'sequelize';
import { Contact } from '../models/index.js';

export const identifyService = async ({ email, phoneNumber }) => {
  if (!email && !phoneNumber) {
    return {
      status: 400,
      message: 'At least one of email or phoneNumber is required',
      contact: null,
    };
  }

  const orConditions = [];
  if (email) orConditions.push({ email });
  if (phoneNumber) orConditions.push({ phoneNumber });

  const contacts = await Contact.findAll({
    where: {
      deletedAt: null,
      ...(orConditions.length > 0 && { [Op.or]: orConditions }),
    },
    order: [['createdAt', 'ASC']],
  });

  if (!contacts.length) {
    const newContact = await Contact.create({ email, phoneNumber });
    return {
      status: 200,
      message: 'New contact created as primary',
      contact: {
        primaryContatctId: newContact.id,
        emails: [email].filter(Boolean),
        phoneNumbers: [phoneNumber].filter(Boolean),
        secondaryContactIds: [],
      },
    };
  }

  const primary =
    contacts.find((c) => c.linkPrecedence === 'primary') || contacts[0];
  const secondaryContacts = [];

  for (const it of contacts) {
    if (it.id !== primary.id && it.linkPrecedence === 'primary') {
      await it.update({
        linkPrecedence: 'secondary',
        linkedId: primary.id,
      });
    }
    if (it.id !== primary.id) {
      secondaryContacts.push(it);
    }
  }

  const related = await Contact.findAll({
    where: {
      [Op.or]: [{ id: primary.id }, { linkedId: primary.id }],
      deletedAt: null,
    },
    order: [['createdAt', 'ASC']],
  });

  const emails = new Set();
  const phoneNumbers = new Set();
  const secondaryContactIds = [];

  for (const c of related) {
    if (c.email) emails.add(c.email);
    if (c.phoneNumber) phoneNumbers.add(c.phoneNumber);
    if (c.linkPrecedence === 'secondary') secondaryContactIds.push(c.id);
  }

  const isNew =
    ![...emails].includes(email) || ![...phoneNumbers].includes(phoneNumber);
  if (isNew && (email || phoneNumber)) {
    const newSec = await Contact.create({
      email,
      phoneNumber,
      linkedId: primary.id,
      linkPrecedence: 'secondary',
    });
    if (newSec.email) emails.add(newSec.email);
    if (newSec.phoneNumber) phoneNumbers.add(newSec.phoneNumber);
    secondaryContactIds.push(newSec.id);
  }

  return {
    status: 200,
    message: 'Contact identification successful',
    contact: {
      primaryContatctId: primary.id,
      emails: [
        primary.email,
        ...[...emails].filter((e) => e !== primary.email),
      ],
      phoneNumbers: [
        primary.phoneNumber,
        ...[...phoneNumbers].filter((p) => p !== primary.phoneNumber),
      ],
      secondaryContactIds,
    },
  };
};
