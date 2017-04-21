var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');
var prompt = require("./prompt.js");




var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});


var customerPurchase = function() {
    connection.query('SELECT * FROM products', function(err, response) {
        if (err) throw err;

        console.table(response);
        prompt.purchase()
    });
};

var managerView = function() {
    connection.query('SELECT * FROM products', function(err, response) {
        if (err) throw err;

        console.table(response);
        prompt.managerEdit();
    });
};

var addIventoryView = function() {
    connection.query('SELECT * FROM products', function(err, response) {
        if (err) throw err;

        console.table(response);
        prompt.addView();
    });
};

var lowInvView = function() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 20 ', function(err, response) {
        if (err) throw err;

        console.table(response);
        prompt.managerEdit();
    });
};

var checkIventory = function(id, qty) {
    connection.query('SELECT stock_quantity FROM products WHERE item_id =?', id, function(err, response) {

        var stockQty = response[0].stock_quantity;

        if (err) throw err;

        if (stockQty > qty) {

            connection.query('SELECT * FROM products WHERE item_id =?', id, function(err, response) {

                if (err) throw err;

                var unitPrice = response[0].price;
                var unitName = response[0].product_name;
                var newStockQty = stockQty - qty;
                var totalPrice = qty * unitPrice

                console.log("You just bought " + qty + " " + unitName + "s your total comes out to be $" + totalPrice);

                connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStockQty, id]);

                console.log("//////////////////////////////  /////////////////////////////////////");

                prompt.keepShop();
            })
        } else {

            console.log("Sorry, we don't have enough units");
            prompt.keepShop();

        }
    })
};
var addIventory = function(id, qty) {


    connection.query('SELECT * FROM products WHERE item_id =?', id, function(err, response) {

        if (err) throw err;
        var stockQty = parseInt(response[0].stock_quantity);
        var unitName = response[0].product_name;
        var newStockQty = stockQty + parseInt(qty);

        console.log("You just added " + qty + " " + unitName + "s to your inventory, the new total is " + newStockQty);

        connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStockQty, id]);

        console.log("//////////////////////////////  /////////////////////////////////////");

        prompt.managerEdit()
    });

};

var addItem = function(name, department, price, qty) {


    connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)', [name, department, price, qty], function(err, response) {

        if (err) throw err;


        console.log("Product Added!");

        managerView();
    });

};





module.exports = {
    customerPurchase,
    checkIventory,
    managerView,
    lowInvView,
    addIventoryView,
    addIventory,
    addItem
};
