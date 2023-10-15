const express = require('express');
const route = express.Router();
const VerifyJwtToken = require('../passport');
const registrationController = require('../controllers/registration');

route.post('/registration',registrationController.registration);
route.get('/getAllUserProfile',registrationController.getAllUserDetails);
route.get('/getUserProfile',VerifyJwtToken,registrationController.getUserDetails);
route.put('/updateUserProfile',VerifyJwtToken,registrationController.updateUserPorfile);
route.patch('/updateUsrBio/:_id',registrationController.updateUserBio);
route.delete('/deleteUserAccount/:account_id',registrationController.deleteAccount);

module.exports = route;