// $.getJSON("/sports", function(data) {
//     for (var i = 0; i < data.length; i++) {
        
//     }
// })

// console.log

// $("#saved").on("click", function(event) {
//     event.preventDefault();

//     $.ajax({
//         url: "/sports",
//         // url: "/scrape",
//         type: "GET"
//     }).then(function(data) {
//         // console.log("Response: " + JSON.stringify(data));
//     });
// })

$(".saveArticle").on("click", function(event) {
    event.preventDefault();
    console.log("saveArticle click event is working");
    console.log("This.val(): " + $(this).val());
    // $.getJSON("/sports/" + $(this).val().split("=")[1], function(data) {

    // })
    $.ajax({
        url: "/api/sports/" + $(this).val(),
        // url: "/scrape",
        type: "PUT"
    }).then(function(data) {
        console.log("Response: " + JSON.stringify(data));
        location.reload();
    });
});

$("#scrape").on("click", function() {
    // event.preventDefault();
    console.log("scrape event listener is working correctly.");
    
    $.ajax({
        url: "/scrape", 
        type: "GET"
    }).then(function() {
        console.log("ajax funtion is working correctly");
        location.reload();
    });
})

$("#clear").on("click", function() {

    $.ajax({
        url: "/api/clear", 
        type: "GET"
    }).then(function() {
        console.log("api/clear route call working correctly");
        location.reload();
    });
})