const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Removed jwt import since it's no longer needed

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({ message: 'The user with the given ID was not found.' });
    }
    res.status(200).send(user);
});

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });
    user = await user.save();

    if (!user)
        return res.status(400).send('The user cannot be created!');

    res.send(user);
});

router.put('/:id', async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true }
    );

    if (!user)
        return res.status(400).send('The user cannot be updated!');

    res.send(user);
});

// Removed the /login route since JWT authentication is not being used anymore
router.post('/login', async (req, res) => {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send('The user not found');
    }

    // Compare the provided password with the stored hashed password
    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
        // Prepare the response object
        const response = {
            message: user.isAdmin ? 'Admin login successful' : 'User login successful',
            user: {
                id: user._id,  // Include the user ID in the response
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            },
        };

        // Send the response
        res.status(200).send(response);
    } else {
        // If the password is incorrect, return an error message
        res.status(400).send('Password is incorrect!');
    }
});


router.post('/register', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });
    user = await user.save();

    if (!user)
        return res.status(400).send('The user cannot be created!');

    res.send(user);
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'The user is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments();
    if (!userCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        userCount: userCount
    });
});

module.exports = router;
