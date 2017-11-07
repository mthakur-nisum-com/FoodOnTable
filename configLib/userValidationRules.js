var Joi = require('joi');
module.exports = {
    registration: {
        body: {
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            emailId: Joi.string().email().required().label('Email'),
            phoneNumber: Joi.number().required().label('Phone Number'),
            password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).min(6).max(10).required().label('Password'),
            confirmPassword: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).min(6).max(10).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Confirm Password' } }).label('Confirm Password'),
        }
    }

}