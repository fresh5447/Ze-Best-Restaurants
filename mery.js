Parse.initialize("0ehE3x8PyWhvp9gboCISiMz7gL8IfonFChetw7Cz", "9XgdnH7iMTmeaxEabD8nM4vgS20LKkTtiB0X58QF");

$(document).ready(function(){




    var parseData = function() {

        var restaurant = Parse.Object.extend("restaurant");
        var query = new Parse.Query(restaurant);
        query.find({
            success: function (results) {
                var restaurantListP = '';
                results.forEach(function (r, i) {
                    restaurantListP = $("<option />", { class: 'restaurant', "id": r.id, text: r.attributes.Name });
                    $('#restaurantList').append(restaurantListP);

                    // console.log(restaurantListP)
                });
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });










        var MenuItem = Parse.Object.extend("MenuItem");
        var query = new Parse.Query(MenuItem);
        query.find({
            success: function(results) {
                var li, menuItemP = [];
                results.forEach(function(mi, i) {
                    var box = $("<input />", { "type": 'checkbox', "class": 'checked', "data-price": mi.attributes.Price });
                    menuItemP.push($("<li />", { "class": 'item', "data-source": mi.attributes.Restaurant_ID}).append(box).append(" " + mi.attributes.Title+" $"+mi.attributes.Price));
                })
                $("#menuItems").append(menuItemP);










                var sum = 0;
                $(".checked").on("click", function() {
                    if($(this).is(':checked')){
                        sum = sum + parseInt($(this).attr("data-price"));
                    } else {
                        sum = sum - parseInt($(this).attr("data-price"));
                    }

                    $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
                    $("#total").text("Total amount due: $"+ sum + ".");

                });

                $(".item").hide();
                // $("#restaurantList").change(function(){
                //      $( "select option:selected" ).each(function() {
                //         $(".item").hide().filter("[data-source=" + this.id + "]").show();
                //     });
                //     $("option:selected").hide().filter("[data-source=" + this.id + "]").show();
                // });
                $("#restaurantList").on("change", function(event) {
                    $( "option:selected" ).each(function() {
                        $(".item").hide().filter("[data-source=" + this.id + "]").show();
                    });
                    $("option:selected").hide().filter("[data-source=" + this.id + "]").show();
                    $("li").each(function(){
                        $(this).children('input')[0].checked = false;
                    });

                    sum = 0;
                    $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
                    $("#total").text("Total amount due: $"+ sum + ".");
                });

            },










            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };
    parseData();

    var saveNewRestaurantItem = function(email, notes, phone_number, menu_item, successCb) {
        var submit = Parse.Object.extend("OrderForm");
        var menu = new submit();

        menu.set("email_address", email);
        menu.set("notes", notes);
        menu.set("phone_number", phone_number);
        menu.set("menu_items", menu_item);


        menu.save(null, {
            success: function(menu){
                //successCb();
                alert('Thank you, come again!');
            },
            error: function(menu, error) {
                console.log('Failed to create a new object, with error code: ' + error.message);
            }
        });
    };

    $('#submit').on('click', function(){
        var userInput = $('.userInput');
        var phone = userInput.find("#phone").val();
        var email = userInput.find("#email").val();
        var comment = userInput.find("#comments").val();
        var item = [];
            $('#menuItems li').each(function(){

              if($(this).children('input')[0].checked = true;){
                    item.push$(this).text();
                };

            });

            item = item.join("");

        saveNewRestaurantItem(email, comment, phone, item);
    })






});




// bob.append(ball)
// bob receive the ball
// list get items

// ball.appendTo(bob)
// the ball is gifted to bob
// item to added to list



//     var restaurants = "", menuItems = "";

//     data.forEach(function(r, i){
//         restaurants += "<li><a id='" + r.id + "'class='restaurant' href='#'>" +r.name + "</a></li>";

//         r.menu.forEach(function(item, i){
//             menuItems += "<li class='item' data-items='" + r.id + "'><input type='checkbox' data-price='"+item.price+"'/>" + item.title + " - $" + item.price +"</li>";
//         });

//     })
// //   already existed       add  variable
//     $("ul#restaurantList").append(restaurants);
//     $("ul#menuItems").append(menuItems);
//     $(".item").hide();

//     $(".restaurant").on("click", function() {
//         $(".item").hide().filter("[data-items=" + this.id +"]").show();
//     });


//     var sum = 0;
//     $("input").on("click", function() {

//         if($(this).is(':checked')){
//             sum = sum + parseInt($(this).attr("data-price"));
//         } else {
//             sum = sum - parseInt($(this).attr("data-price"));
//         }

//         $("#count").text("You've selected " + $("input:checked").length + " item(s)!");
//         $("#total").text("Total amount due: $"+ sum + ".");


//     });



// });


// var data = [
//     {

//         id: "r1",
//         name: "McDonald's",
//         menu: [
//             {title: "burger", price:5},
//             {title: "chicken nuggets", price:3},
//             {title: "fries", price:2},
//             {title: "coke", price:1}
//         ]
//     },
//     {

//         id: "r2",
//         name: "La Foret",
//         menu: [
//             {title: "french onion soup", price:4},
//             {title: "steak", price:30},
//             {title: "creme brulee", price:8},
//             {title: "wine", price:10}
//         ]
//     },
//     {

//         id: "r3",
//         name: "Boiling Crab",
//         menu: [
//             {title: "shrimp", price:4},
//             {title: "blue crab", price:5},
//             {title: "cajun fries", price:2},
//             {title: "beer", price:7}
//         ]
//     },
//     {

//         id: "r4",
//         name: "Bill's Cafe",
//         menu: [
//             {title: "eggs", price:2},
//             {title: "french toast", price:6},
//             {title: "hash browns", price:3},
//             {title: "OJ", price:1}
//         ]
//     }]


});