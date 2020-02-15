var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var express    = require("express");
var app        = express();

//App Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine", "ejs");
app.use(express.static("public")); // custome style sheets
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model Config
//define Schema
var blogSchema = new mongoose.Schema({
	author: {type: String, default: "Betty He"},
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
// compile into a model
var Blog = mongoose.model("Blog", blogSchema);

// Restful Routes
// Blog.create({
// 	title: "Test Blog",
// 	image: "hhfosdhfog0",
// 	body: "Hello"
// });

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Errors!");
		} else {
			res.render("index", {blogs: blogs});
		}
	})

});

app.get("/", function(req,res){
	res.redirect("/blogs");
})
app.listen(3000, function(){
		   console.log("Server is running");
		   })