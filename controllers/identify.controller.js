import { identifyService } from '../services/identify.service.js';

export const identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    const { status, message, contact } = await identifyService({
      email,
      phoneNumber,
    });

    return res
      .status(status)
      .json(contact ? { message, contact } : { message });
  } catch (error) {
    console.error('Error in identifyContact:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
