

module.exports = (sequelize, DataTypes) => {
  const datavalues = sequelize.define('datavalues', {
    name: {
      type: DataTypes.STRING,
      references: {
        model: 'patients',
        key: 'name',
      },
    },
    heartbeat: DataTypes.DOUBLE,
    temperature: DataTypes.DOUBLE,
  }, {});
  datavalues.associate = function (models) {
    // associations can be defined here
  };
  return datavalues;
};
