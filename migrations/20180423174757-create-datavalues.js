

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('datavalues', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      references: {
        model: 'patients',
        key: 'name',
      },
    },
    heartbeat: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    temperature: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    ecg: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('datavalues'),
};
