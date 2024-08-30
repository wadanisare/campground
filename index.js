const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
  //require mongoose in the index file to connect to the models folder
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Campground = require("./models/campground");
    //now connect to mongoose data base
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    //To check if connection to db is established use .then to verify that and .catch to catch errors
.then(()=>{
    console.log("Mongo is open for connection")
})
.catch(err =>{
    console.log("Error mongo is not open for connection")
});
const app = express(); //for excution

    //now set up ejsMate engine
app.engine("ejs", ejsMate);
    //Now set up ejs engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
    //req.body is alway blank by defualt so we have tell express to parse the body
    //parsing is converting text or source data into structural data
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

    //now let us display the titles of each campground
app.get("/campgrounds", async(req, res) =>{
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index",{campgrounds})
});

app.get("/campgrounds/new", (req, res)=>{
    res.render("campgrounds/new");
});
app.post("/campgrounds", async(req, res)=>{
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

   //Let us set up the route to our show page
app.get("/campgrounds/:id", async(req, res) =>{
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", {campground});
});

    //Let us edit a campground
    //first get the route ready
    //secondly set up the put/patch route to perfome the edit
    //third install method-Overide and require it.

app.get("/campgrounds/:id/edit", async(req, res) =>{//pre-populate campground data to the form to be edited
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", {campground});
});
    //Let's set the put/patch/delete route so we can make edition to happen
app.put("/campgrounds/:id", async(req, res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
     res.redirect(`/campgrounds/${campground._id}`);
});

    //It is time to delete a campground from our list of campgrounds
app.delete("/campgrounds/:id", async(req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
});
    
    
    //Now let us make a new a compground by setting up the route. Right after this you need to require your model
app.get("/campground", async(req, res)=>{
    const camp = new Campground({title: "my backyard", price: 25.96, description: "cheap camping"})
await camp.save();
res.render(camp)
});

app.listen(3000, ()=>{
    console.log("listening on port 3000")
})
