var inquirer = require('inquirer');


var itemChoice = [{
    type: 'input',
    name: 'itemId',
    message: 'Please enter the ID of the product?'
}, {
    type: 'input',
    name: 'howManyUnits',
    message: 'How many units would you want to buy?'
}];

var keepShopping = {
    type: 'rawlist',
    name: 'choices',
    message: 'Would you like to keep shopping?',
    choices: ['Yes', 'No']
};

var managerOptions = {
    type: 'rawlist',
    name: 'choices',
    message: 'What would you like to do?',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New product']
}

var addingOptions = [{
    type: 'input',
    name: 'itemId',
    message: 'Please enter the ID of the product?'
}, {
    type: 'input',
    name: 'howManyUnits',
    message: 'How many units would you want to add?'
}];

var addNewItem = [{
    type: 'input',
    name: 'productName',
    message: 'Product Name?'
}, {
    type: 'input',
    name: 'department',
    message: 'What department?'
}, {
    type: 'input',
    name: 'price',
    message: 'Price of the Item?'

}, {
    type: 'input',
    name: 'qty',
    message: 'stock Quantity?'
}];


var purchase = function() {
    var app = require("./app.js");
    inquirer.prompt(itemChoice).then(function(answer) {

        var itemNumb = answer.itemId;
        var itemQty = answer.howManyUnits;

        app.checkIventory(itemNumb, itemQty);
    });
};

var addView = function() {
    var app = require("./app.js");
    inquirer.prompt(addingOptions).then(function(answer) {

        var itemNumb = answer.itemId;
        var itemQty = answer.howManyUnits;

        app.addIventory(itemNumb, itemQty);
    });
};

var newItem = function() {
    var app = require("./app.js");
    inquirer.prompt(addNewItem).then(function(answer) {

       var name = answer.productName;
       var department = answer.department;
       var price = answer.price;
       var qty = answer.qty;

        app.addItem(name, department, price, qty);
    });
};

var managerEdit = function() {
    var app = require("./app.js");
    inquirer.prompt(managerOptions).then(function(answer) {

        var selection = answer.choices;

        switch (selection) {

            case 'View Products for Sale':
                app.managerView();
                break;
            case 'View Low Inventory':
                app.lowInvView();
                break;
            case 'Add to Inventory':
                app.addIventoryView();
                break;
            case 'Add New product':
                newItem();
                break;
        };


    });
};

var keepShop = function() {
    var app = require("./app.js");
    inquirer.prompt(keepShopping).then(function(answer) {

        if (answer.choices === "Yes") {
            app.customerPurchase();
        } else {
            console.log("BYE!")
        }
    });
};

module.exports = {
    purchase,
    keepShop,
    managerEdit,
    addView
};
