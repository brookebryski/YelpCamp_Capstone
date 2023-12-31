const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '651738375cd1e14814d5ef2f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            description: 'This is a campground!', 
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images:
            [
                {
                  url: 'https://res.cloudinary.com/dal9xjy6p/image/upload/v1696467703/YelpCamp/dwvgosvmjuxpb0b0yons.png',
                  filename: 'YelpCamp/dwvgosvmjuxpb0b0yons',
                },
                {
                  url: 'https://res.cloudinary.com/dal9xjy6p/image/upload/v1696467704/YelpCamp/pyvlmiz22ywgdjpf8kya.png',
                  filename: 'YelpCamp/pyvlmiz22ywgdjpf8kya',
                }
              ]
              
        })
        
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})