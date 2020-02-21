

var moment = require('moment');
var fs = require("fs");

var template = "---\ntitle: {title}\ndate: {date}\ntags: \n---\nhere to write content"
var date = new moment().format("YYYY-MM-DD, HH:MM:SS")
var title = process.argv[2]

if (process.argv.length <= 2) {
    console.error("please enter the title")
    process.exit(1);
}
var replacedString = template.replace("{title}", title).replace("{date}", date)
var path = "./content/blog/{title}.md".replace("{title}", title)

fs.writeFile(path, replacedString,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("new blog generated at " + path)
});