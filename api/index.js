const dotenv = require('dotenv'); 
dotenv.config(); 
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const User = require("./model/user");
const app = express();
var isEmpty = require('is-empty');
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
require("./connection");

app.get("/test", (req, res) => {
    res.send("test ok");
});

//Api For register
app.post("/register", async (req, res) => {
    let { name, email, password } = req.body;
    // Convert fields to strings
    if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
        return res.status(400).json({ message: "All fields are required." });
    }
    console.log(name, email, password);
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt); // Hash password
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log(user);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err); 
    }
});

//Api  for Login

app.post("/Login",(req,res)=>{
    const {email,password}=req.body;
    try{
      const   userDoc=  User.findOne({email})
      if(userDoc){
        res.json('Login  Succefull')
      }
      else{
        res.json("Notfound")
      }
       
    }
    catch(err){
        res.status(500).json(err);
    }
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
