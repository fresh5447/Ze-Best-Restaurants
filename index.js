
//////////////    API Key  and   JavaScript Key    ////////////

Parse.initialize("gJhHWhjPnw5FjWpcp9rexP1z15dlzTQrhvc5XfJy", "XILId6OYItAMYe7wl1E67nIVP99PYYh78t2Cndje");




$(function() {


    var fetchParseData = function () {








///////////    BEGIN RESTAURANT QUERY  /////////


        var Restaurant = Parse.Object.extend("Restaurant");
        var query = new Parse.Query(Restaurant);
        query.find({
            success: function (results) {
                var resList = '';
                results.forEach(function (r, i) {
                    resList = $("<option />", { class: 'restaurant', id: r.id, text: r.attributes.Name });
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
            success: function (results) {
                var li, menuItems = [];

                results.forEach(function (mi, i) {
                    var cb = $("<input />", { "type": 'checkbox', "data-price": mi.attributes.Price});
                    menuItems.push($("<li />", { "class": 'item', "data-source": mi.attributes.restaurant_id }).append(cb).append(" " + mi.attributes.menuItem + " |  $" + mi.attributes.Price));


                    //  selectRes.push($("<option />", {"value": mi.attributes.}))
                });

                $("ul#menuItem").append(menuItems);
                //$('ul#selectItemList').append(selectRes);


                //// initiating checkbox sum loop ////
                var sum = 0;


                $('.checked').on("click", function () {
                    if ($(this).is(':checked')) {
                        sum = sum + parseInt($(this).attr("data-price"));
                    } else {
                        sum = sum - parseInt($(this).attr("data-price"));
                    }

                    $("#count").text("You've selected " + $("input-checked").length + " item(s)!");
                    $("total").text("Total amount due: $" + sum + ".");

                });

                //////////   SHOW AND HIDE MENU ITEMS   ///////////
                $(".item").hide();


                $("#restaurant").on("change", function (event) {
//                    alert("tittys");

                    $("option:selected").each(function () {

                        $('.item').hide().filter("[data-source=" + this.id + "]").show();

                    });


                    $('li.item').each(function () {
                        $(this).children('input')[0].checked = false;
                    });

                    sum = 0;
                    $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
                    $(".price").text("Total amount due: $" + sum + ".");
//                });

                    var sum = 0;
                    $("input:checkbox").on("click", function () {

                        if ($(this).is(':checked')) {
                            sum = sum + parseInt($(this).attr("data-price"));
                        } else {
                            sum = sum - parseInt($(this).attr("data-price"));
                        }

                        $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
                        $(".price").text("Total amount due: $" + sum + ".");


                    });


                });

            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }


    fetchParseData();


/////          FIRST WE DECLARE A FUNCTION THAT WILL TAKE THE ARGUMENTS FROM THE FORM /////
////           WE NEED TO CREATE AN AJAX EVENT THAT WILL TAKE THE DATA ENTERED INTO THESE /////
/////          FORM AND SAVE IT TO THE ARGUMENTS IN THE PREVIOUS FUNCTION //////

    var saveNewOrder = function (emailAddress, phoneNumber, notes, menuItem, successCB) {
        var orderItem = Parse.Object.extend("Order");
        var menu = new orderItem();

        menu.set("emailAddress", emailAddress);
        menu.set("phoneNumber", phoneNumber);
        menu.set("notes", notes);
        menu.set("menuItem", menuItem);

        menu.save(null, {
            success: function (menu) {
                //successCb();
                alert('Thank you, come again!');
            },
            error: function (menu, error) {
                console.log('Failed to create a new object, with error code: ' + error.message);
            }
        });
    };

    $('#submit').on('click', function () {    //SUBMIT MIGHT NOT WORK

        var notes = $('#notes').val();
        var emailAddress = $('#emailAddress').val();    ////MAY NEED .FIND$('EVENT')
        var phoneNumber = $('#phoneNumber').val();
        console.log(notes,emailAddress, phoneNumber);
        /// Looping menuItems to add checked box's //////
        var item =[];
        $('#menuItem li').each(function () {

            if ($(this).children('input')[0].checked) {
                item.push($(this).text());
            }


        });

        item = item.join("")


        saveNewOrder(emailAddress, phoneNumber, notes, item);
    });


    ///////////  END SET ORDER FUNCTION


    ////  TOGGLE THE DISPLAY OF menuITEMS /////

//    $("#menuItem").on("click", ".restaurant", function () {
////        $(".item").hide().filter("[data-source=" + $(this).attr('id') + "]").show();
////        console.log("this");
////
////        return false;

    var Order = Parse.Object.extend("Order");
    var query = new Parse.Query(Order);
    query.find({
        success: function (results) {
            results.forEach(function (o, i) {
                $('tbody').prepend("<tr><td>" + o.attributes.menuItem + "  </td><td> " + o.attributes.emailAddress + " </td><td> " + o.attributes.phoneNumber + " </td><td> " + o.attributes.notes + " </td>  </tr>");

                //  selectRes.push($("<option />", {"value": mi.attributes.}))
            });
        },
        error: function(err) {

        }
    });

    $('#tinySort').on("click", function(){
        $('tbody tr').tsort("td");

    });




//test//
    ////// ADDING UP THE SUM OF THE CHECKED BOX'S///////





//    $('.restaurant').on("click", function(){
//         $(".item").hide().filter("[data-source=" + this.id + "]").show();
//
//
//    ////// ATTEMPTING GET TO PUSH ORDER TO PARSE ///////
//
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

