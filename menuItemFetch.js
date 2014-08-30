var fetchParseData = function() {

    var Order = Parse.Object.extend("Order");
    var query = new Parse.Query(Order);
    query.find({
        success: function (results) {
            var orderList = '';
            results.forEach(function (o, i) {
                orderList = $("<option />", { class: 'receivedOrder', value: o.id, text: o.attributes.emailAddress });
                $('#receivedOrder').append(orderList);
            });
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });

    });





fetchParseData();


var saveNewRestaurantItem = function(title, price, resId , successCb) {
    var MenuItem = Parse.Object.extend("MenuItem");
    var menu = new MenuItem();

    menu.set("title", title);
    menu.set("price", price);
    menu.set("restaurant_id", resId);

    menu.save(null, {
        success: function(menu){
            successCb();
        },
        error: function(menu, error) {
            console.log('Failed to create a new object, with error code: ' + error.message);
        }
    });
};