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

$(".addNote").on("click", function() {

    // console.log("Value of add button: " + $(this).val());
    $("#articleId").text(
        $(this).val()
    );
    $("#saveNote").val(
        $(this).val()
    )
});

$("#saveNote").on("click", function() {
    const note = $("#newNote");
    if (note.val())
        $.ajax({
            url: "/sports/" + $(this).val(),
            type: "POST",
            data: {
                body: note.val()
            }
        }).then(function(data) {
            console.log("Data from save note: " +  JSON.stringify(data));

            note.val("");
        });
});