const User = require('../models/User')


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password){
            res.status(401).send({msg:"Please Provide all details"})
        }
        const user = await User.create({ ...req.body })
        const token = user.createJwt()
        res.status(201).json({ user: { name: user.name }, token })
    } catch (err) {
        res.status(401).json({ msg: "Something went Wrong", err: err });
    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(401).send({ msg: "Please Provide Email & Password" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).send({ msg: "User not exsist" })
        }
        //compare password
        const isMatch = await user.comparePassword(password)
        if(isMatch){
            const token = user.createJwt()
            res.status(201).json({ user: { name: user.name }, token })   
        }else(
            res.status(401).send({ msg: "invalid user details" })
        )
    } catch (error) {
        res.status(401).json({msg:'invalid user details', err:error})
    }
}


module.exports = { register, login }