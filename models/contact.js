import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'Contact',
    {
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      linkedId: DataTypes.INTEGER,
      linkPrecedence: {
        type: DataTypes.ENUM('primary', 'secondary'),
        defaultValue: 'primary',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      tableName: 'contacts',
    }
  );
};
