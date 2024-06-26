const router = require("express").Router();
const { User } = require("../../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const store = require("store");
router.post("/", async (req, res) => {
   // try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();

        // console.log(user, user._id)
    store.set('user_id', user._id);
    // store.set('firstname', user.firstName);
    // store.set('lastname', user.lastName);
        res.status(200).send({ data: token, firstname: user.firstName, lastname: user.lastName, message: "logged in successfully" });
    // } catch (error) {
    //     res.status(500).send({ message: "Internal Server Error", error: error });
    // }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;