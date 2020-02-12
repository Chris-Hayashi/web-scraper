$(".saveArticle").on("click", function(event) {
    event.preventDefault();
    // console.log("saveArticle click event is working");
    // console.log("This.val(): " + $(this).val());

    $.ajax({
        url: "/api/sports/" + $(this).val(),
        type: "PUT"
    }).then(function(data) {
        // console.log("Response: " + JSON.stringify(data));
        location.reload();
    });
});

$("#scrape").on("click", function() {
    $.ajax({
        url: "/scrape", 
        type: "GET"
    }).then(function() {
        location.reload();
    });
})

$("#clear").on("click", function() {

    $.ajax({
        url: "/api/clear", 
        type: "GET"
    }).then(function() {
        location.reload();
    });
})

$("#saveNote").on("click", function() {
    
});