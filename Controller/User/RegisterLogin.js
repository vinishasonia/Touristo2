const userSchema = require('../../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = "Hello"

const UserRegister = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body;
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(password, salt)
        const emailExist = await userSchema.findOne({ email })
        if (emailExist) {
            return res.json({ status: false, message: 'Email already exist' })
        }
        const Register = await new userSchema({ name, email, phone, password: secpass, address })
        await Register.save()
        return res.json({ status: true, message: "Registered successfully" })
    }
    catch (err) {
        console.log(err)
    }
}

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Incorrect email or password' })
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.json({ success: false, message: 'Incorrect Password' })
        }
        const data = user.id
        const token = await jwt.sign(data, key)
        const success = true;
       return res.json({ token, success,message: "Login successful" })
    }
    catch (err) {
        console.log(err)
    }
}


const GetOneUser = async (req, res) => {
    try {
        const ViewSingle = await userSchema.findById(req.user);
        res.send(ViewSingle);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}

const GetUser = async (req, res) => {
    try {
        const users = await userSchema.find();
        res.send({ success: true, user: users });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
}



module.exports = { UserRegister, UserLogin, GetOneUser, GetUser }