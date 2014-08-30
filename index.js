
Parse.initialize("gJhHWhjPnw5FjWpcp9rexP1z15dlzTQrhvc5XfJy", "XILId6OYItAMYe7wl1E67nIVP99PYYh78t2Cndje");

$(function() {


    var fetchParseData = function() {


///////////    BEGIN RESTAURANT QUERY  /////////


        var Restaurant = Parse.Object.extend("Restaurant");
        var query = new Parse.Query(Restaurant);
        query.find({
            success: function (results) {
                var resList = '';
                results.forEach(function (r, i) {
                    resList = $("<option />", { class: 'restaurant', value: r.id, text: r.attributes.Name });
                    $('#restaurant').append(resList);
                });
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
////////// END RESTAURANT QUERY   //////////////////





///////////   BEGIN menuITEM QUERY  ///////////////////

        var menuItem = Parse.Object.extend("menuItem");
        var query = new Parse.Query(menuItem);
        query.find({
            success: function(results) {
                var li, menuItems = [];

                results.forEach(function(mi, i) {
                    var cb = $("<input />", { "type": 'checkbox' });
                    menuItems.push($("<li />", { "class": 'item', "data-source": mi.attributes.restaurant_id }).append(cb).append(" " + mi.attributes.menuItem +" |  $" + mi.attributes.Price) );




                    //  selectRes.push($("<option />", {"value": mi.attributes.}))
                })
                console.log(results);
                $("ul#menuItem").append(menuItems);
                //$('ul#selectItemList').append(selectRes);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

  ///////////////     END menuITEM QUERY    //////////////////////////





  ///////////////     BEGIN ORDER QUERY       /////////////////////////
//
//        var Order = Parse.Object.extend("Order");
//        var query = new Parse.Query(Order);
//        query.find({
//            success: function (results) {
//                var orderList = '';
//                results.forEach(function (o, i) {
//                    orderList = $("<option />", { class: 'receivedOrder', value: o.id, text: o.attributes.emailAddress });
//                    $('#receivedOrder').append(orderList);
//                });
//            },
//            error: function (error) {
//                alert("Error: " + error.code + " " + error.message);
//            }
//        });

  ////////////       END ORDER QUERY     ////////////////////

    };

    fetchParseData();



    ////// BEGIN SET ORDER FUNCTION    ////////////

$('.btn btn-default').on('click', function(){

   var notes = $('#notes').val();
   var emailAddress = $('#emailAddress').val();
   var phoneNumber = $('#phoneNumber').val();
   // var menuItem = $('menuItem').val();

    saveNewOrder();

})



    var saveNewOrder = function(emailAddress, phoneNumber, notes , menuItem, successCB) {
        var orderItem = Parse.Object.extend("Order");
        var menu = new orderItem();

        menu.set("emailAddress", emailAddress);
        menu.set("phoneNumber", phoneNumber);
        menu.set("notes", notes);
        menu.set("menuItem", menuItem);




        menu.save(null, {
            success: function(menu){
                successCb();
            },
            error: function(menu, error) {
                console.log('Failed to create a new object, with error code: ' + error.message);
            }
        });
    };


    ///////////  END SET ORDER FUNCTION




    ////  TOGGLE THE DISPLAY OF menuITEMS /////

    $("#menuItem").on("click", ".restaurant", function() {
        $(".item").hide().filter("[data-source=" + $(this).attr('id') + "]").show();
        console.log("this");

        return false;
    });


//test//
    ////// ADDING UP THE SUM OF THE CHECKED BOX'S///////


    var sum = 0;
    $("input").on("click", function() {

        if($(this).is(':checked')){
            sum = sum + parseInt($(this).attr("data-price"));
        } else {
            sum = sum - parseInt($(this).attr("data-price"));
        }

        $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
        $("#total").text("Total amount due: $"+ sum + ".");


    });



//    $('.restaurant').on("click", function(){
//         $(".item").hide().filter("[data-source=" + this.id + "]").show();


    //////// ATTEMPTING GET TO PUSH ORDER TO PARSE ///////

//    $.ajax({
//        type: "GET",
//        url: "https://www.parse.com/apps/restaurant-application/collections#class/Order",
//        success: function(data) {
//            var Order = "";
//            data.forEach(function(Order, i) {
//                console.log(Order);
//                Order += "<tr><a href='" + Order.url + "'>" + eventLine.type + "</a></tr>";
//            })
//            $("#github").append(events);
//        }
//    });

});