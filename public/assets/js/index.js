// $.getJSON("/sports", function(data) {
//     for (var i = 0; i < data.length; i++) {
        
//     }
// })

// console.log

$("#saved").on("click", function(event) {
    event.preventDefault();

    $.get("/saved", function(data) {
        console.log("Data: " + data);
    });
})

$("#saveArticle").on("click", function(data) {
    // $.ajax()
});

$("#scrape").on("click", function() {
    // event.preventDefault();
    console.log("scrape event listener is working correctly.");
    
    $.ajax({
        url: "scrape", 
        type: "GET"
    }).then(function() {
        console.log("ajax funtion is working correctly");
        location.reload();
    });
})