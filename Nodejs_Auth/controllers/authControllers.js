const User = require("../models/User");

// handle Errors
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.properties.message
        });
    }
    return errors;
}

// routing controllers (what defines the behavier of each route).
module.exports.signup_get = (req, res) => {
    res.render("signup");
};

module.exports.login_get = (req, res) => {
    res.render("login");
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    // try to create a user with the body info, if not, send errornode
    try {
        const user = await User.create({ email, password })
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors)
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    res.send(`user login: ${email}, ${password}`);
};