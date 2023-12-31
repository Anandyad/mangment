const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const User = require("./model/user");
const app = express();
var isEmpty = require('is-empty');
const build = require('path');
const path = require('path');
const jwt = require('jsonwebtoken')
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
require("./connection");

app.use(express.static(path.join(__dirname, './dist/assets')))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/assets/index.html'))
})
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

app.post("/Login", async (req, res) => {
    debugger
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passwordOk = bcrypt.compareSync(password, userDoc.password);
            if (passwordOk) {
                const sign = jwt.sign({ id: userDoc._id, email: userDoc.email }, process.env.SECRET, { expiresIn: 86400 });
                res.cookie("token", sign).json({ success: true, token: sign });

            }
        }
        else {
            res.json("user  not  found")
        }
    }
    catch (err) {
        res.status(404).json({ success: false, message: 'User not found' });
    }
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
