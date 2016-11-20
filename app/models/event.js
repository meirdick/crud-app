// require mongoose
var mongoose = require('mongoose');
//grab schema
Schema = mongoose.Schema;

//create a schema
var eventSchema = new Schema({
    name: String,
    slug: {
            type: String,
            unique: true
    }
    ,
    description: String
});

// middleware
//make sure slug is created from name
eventSchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
});

//create model
var eventModel = mongoose.model('Event', eventSchema);

// export model for others
module.exports = eventModel;

// function to slugify
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}