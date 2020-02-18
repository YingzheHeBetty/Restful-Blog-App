var bodyParser = require("body-parser");
var mongoose   = require("mongoose");
var express    = require("express");
var app        = express();
var methodOverride = require("method-override");
//App Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine", "ejs");
app.use(express.static("public")); // custome style sheets
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

app.get("/", function(req,res){
	res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Errors!");
		} else {
			res.render("index", {blogs: blogs});
		}
	})

});
app.get("/blogs/new", function(req,res){
	res.render("new");
});

app.post("/blogs", function(req, res){
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new")
		} else {
			res.redirect("/blogs");
		}
		
	})
});

//Show Route
app.get("/blogs/:id", function(req, res){
	//find Blog by id and execute
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	})
})

/Edit route
app.get("/blogs/:id/edit", function(req,res){
	//find Blog by id and execute
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBog});
		}		
	});
})

// Update route

app.put("/blogs/:id", function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
})


app.listen(3000, function(){
		   console.log("Server is running");
		   })