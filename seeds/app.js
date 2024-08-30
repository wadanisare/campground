  //require mongoose in the index file to connect to the models folder
const mongoose = require("mongoose");
const cities = require("./cities");
const {places} = require("./seedHelpers");
const {descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");


    //now connect to mongoose data base
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    //To check if connection to db is established use .then to verify that and .catch to catch errors
.then(()=>{
    console.log("Mongo is open for connection")
})
.catch(err =>{
    console.log("Error mongo is not open for connection")
})
    //define an array function for camp titles
const sample = array => array[Math.floor(Math.random() * array.length)];

    //create a new data base 
const seedDB = async () =>{
    //Here we delete the old data in the data base
    await Campground.deleteMany({});
      //Here we create a new database
    const c = new Campground({title: "Purple field"});
    await c.save();

    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            image:  `https://picsum.photos/400?random=${Math.random()}`,
            description: "For all of your camping ground information and needs",
            price
        });
        await camp.save();
    }
}
    //to combine a places to a descriptors let us create a function
seedDB().then(() =>{
    mongoose.connection.close();
})