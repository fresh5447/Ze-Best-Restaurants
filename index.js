/**
 * Created by DavidTrinh on 8/29/14.
 */

Parse.initialize("gJhHWhjPnw5FjWpcp9rexP1z15dlzTQrhvc5XfJy", "XILId6OYItAMYe7wl1E67nIVP99PYYh78t2Cndje");

$(function() {


    var fetchParseData = function() {

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

    };

    fetchParseData();




    ////  TOGGLE THE DISPLAY OF menuITEMS /////

    $("#menuItem").on("click", ".restaurant", function() {
        $(".item").hide().filter("[data-source=" + $(this).attr('id') + "]").show();
        console.log("this");

        return false;
    });



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

    $.ajax({
        type: "GET",
        url: "https://github.com/codective.json",
        success: function(data) {
            var events = "";
            data.forEach(function(eventLine, i) {
                console.log(eventLine);
                events += "<li><a href='" + eventLine.url + "'>" + eventLine.type + "</a></li>";
            })
            $("#github").append(events);
        }
    });

});