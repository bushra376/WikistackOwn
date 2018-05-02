const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/wikistackOwn', {
  logging: false
});

let Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false //MUST BE DEFINED, No null values       
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    content: {
        type: Sequelize.TEXT ,// can have any length
        allowNull: false 
    },
    status: {
        type: Sequelize.ENUM('open','close') //ONLY has one of the 2 defined values
    }
}, {
    //defining HOOKS
    hooks: {
        beforeValidate: function(page) {    //beforeValidate triggers before instance(page) is saved
            if(page.title){
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            }                     
        }
    },
    getterMethods: {    //dont call them just acces them like properties
        route : function () {
            return '/wiki/' + this.urlTitle;
        }
    }
});

let User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,   //Database controls this
        unique: true,
        validate: { //isEmail given as constraint at APPLICATION level (Sequelize does it/ prevents it) Database does not do it
            isAEmail: true
        }
    }
});

module.exports = {
    Page,
    User,
    db
}