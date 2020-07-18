'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',[{
      name:'Cao The Anh',
      email:'anhct.poly@gmail.com',
      password:'1',
      phone:'0379723021',
      permission:1,
      createdAt:new Date(),
      updatedAt:new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users',null,{})
  }
};
