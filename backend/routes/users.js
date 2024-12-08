const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get(`/`, async (req, res) => {
    try {
        const userList = await User.find().select('-passwordHash');
        res.status(200).send(userList);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving users', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'The user with the given ID was not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving user', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = new User({
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
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(400).send({ success: false, message: 'The user cannot be created!', error });
    }
});
//  update route
router.put('/:id', async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if a new password is provided
        const newPassword = req.body.password
            ? bcrypt.hashSync(req.body.password, 10)  // Hash the new password
            : userExist.passwordHash;  // Keep the old password if none provided

        // Update the user with new data
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                passwordHash: newPassword, // Use the hashed password
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

        if (!user) {
            return res.status(400).json({ message: 'The user cannot be updated!' });
        }

        res.status(200).json(user); // Send the updated user data back
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});


// Email check route
router.get('/email-check', async (req, res) => {
    try {
        const { email, type } = req.query;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            if (type === 'register') {
                return res.status(404).json({ message: 'Email not found! Please register first.' });
            }
            return res.status(404).json({ message: 'Email not found! Please check your email address.' });
        }

        // If type is "register", return user not found message
        if (type === 'register') {
            return res.status(400).json({ message: 'This email is already registered!' });
        }

        // For forgot password, return user data including ID
        res.status(200).json(existingUser); // Send the user data, including the ID
    } catch (error) {
        res.status(500).json({ message: 'Error checking email', error });
    }
});

// ... other routes (unchanged)

// Forgot Password Route (POST /forgot-password)
router.post('/forgot-password', async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email not found!' });
      }
  
      // Hash the new password
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
  
      // Update user with new password
      user.passwordHash = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  });


// Login route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'The user not found' });
        }

        const passwordMatch = bcrypt.compareSync(req.body.password, user.passwordHash);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Password is incorrect!' });
        }

        const response = {
            message: user.isAdmin ? 'Admin login successful' : 'User login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            },
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
});

router.post('/register', async (req, res) => {
    try {
        // Check for duplicate email
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists!' });
        }

        const user = new User({
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

        const savedUser = await user.save();
        res.status(201).json({ message: 'Registration successful', user: savedUser });
    } catch (error) {
        res.status(400).json({ message: 'The user cannot be created!', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found!' });
        }
        res.status(200).json({ success: true, message: 'The user is deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting user', error });
    }
});

router.get(`/get/count`, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).send({ userCount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving user count', error });
    }
});


module.exports = router;
