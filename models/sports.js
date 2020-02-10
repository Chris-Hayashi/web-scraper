// Require mongoose npm package
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var SportSchema = new Schema({

    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Sport = mongoose.model("Sport", SportSchema);

module.exports = Sport;