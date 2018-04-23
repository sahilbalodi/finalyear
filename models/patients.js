

module.exports = (sequelize, DataTypes) => {
  const patients = sequelize.define('patients', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
  }, {});
  patients.associate = function (models) {

  };
  return patients;
};
