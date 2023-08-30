const express = require('express');
const {
    Login,
    Signup,
    GetAllUsers,
    GetUser, 
    DeleteUser,
    UpdateUser,
} = require('../controllers/UserController');
const router = express.Router();

//login
router.post('/login', Login);

//signup
router.post('/signup', Signup);

//get all users
router.get('/', GetAllUsers);

//get a specific user
router.get('/:id', GetUser);

//delete a user
router.delete('/', DeleteUser);

//update a user
router.patch('/', UpdateUser);

module.exports = router;