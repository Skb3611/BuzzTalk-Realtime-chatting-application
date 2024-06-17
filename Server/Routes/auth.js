const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../Models/User')

router.get("/", (req, res) => {
    res.send("hello")
})
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const CheckUsername = await User.findOne({ username })
        const CheckEmail = await User.findOne({ email })
        if (CheckEmail)
            return res.json({ msg: "Email already exists.Try to Login", status: false })
        if (CheckUsername)
            return res.json({ msg: "Username already exists", status: false })

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedpassword
        })
        delete user.password;
        return res.json({
            "status": true, user: {
                id: user._id,
                username: user.username,
                email: user.email,
                // password: user.password,
                is_profile_set: user.is_profile_set,
                profileImg: user.profileImg
            }
        })

    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ status: false, msg: "Invalid Credentials" })
        }
        else {
            const PassCheck = await bcrypt.compare(password, user.password)
            if (!PassCheck) {
                return res.json({ status: false, msg: "Invalid Credentials" })
            }
            else {
                return res.json({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    // password: user.password,
                    is_profile_set: user.is_profile_set,
                    profileImg: user.profileImg
                })
            }
        }
    } catch (error) {
        (error)
        res.status(500).send("Internal Server Error")
    }
})
router.post('/setProfile', async (req, res) => {
    try {
        let { id, Selected } = req.body;
    // (user)
    const user = await User.findOneAndUpdate({ _id: id }, {
        profileImg: Selected,
        is_profile_set: true
    }, {new: true})
    return res.status(200).json(
        {
            id: user._id,
            username: user.username,
            email: user.email,
            // password: user.password,
            is_profile_set: await user.is_profile_set,
            profileImg: await user.profileImg
        }
    )
    } catch (error) {
        res.status(500).send("Internal server error.")
    }
})
router.get('/getusers/:id',async(req,res)=>{
    try {
       let id=req.params.id.slice(1,req.params.id.length)
        let users= await User.find({_id:{$ne:id}}).select(["username","email","profileImg"])
       return res.status(200).json({users})
    } catch (error) {
        res.status(500).send("Internal server error.")
    }
})
module.exports = router