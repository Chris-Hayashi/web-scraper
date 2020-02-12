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

    $.ajax({
        url: "/sports/" + $(this).val(),
        type: "GET"
    }).then(function(data) {
        console.log("Data from saved notes: " + JSON.stringify(data));
        const notes = $("#popNotes");

        if (data.note) {
            notes.append("<div class='card'>" +
                            "<div class='card-body'>" + 
                                data.note.body +
                            "</div>" +
                            // "<div class='thisNote deleteNote'>" + 
                            //     "X" + 
                            // "</div>" + 
                        "</div>"
            );
        } else {
            notes.append("<div class='card'><div class='card-body'>" + "There are no notes for this article" +"</div></div>");
            // notes.append
        }




//         <div class="card">
//   <div class="card-body">
//     This is some text within a card body.
//   </div>
// </div>
    });
});

$(".close").on("click", function() {
    $("#popNotes").empty();
})

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
            // console.log("Data from save note: " +  JSON.stringify(data));
            note.val("");
        });
});