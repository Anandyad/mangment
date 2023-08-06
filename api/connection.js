// Connect to the database using the connection code you provided
const  mongoose=require("mongoose")
mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("Connected successfully to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });
    