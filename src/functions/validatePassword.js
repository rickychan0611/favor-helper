

var passwordValidator = require('password-validator');
 
// Create a schema
var schema = new passwordValidator();
 
const validatePassword = (password) => {

console.log('validatePassword: ' + password)

// Add properties to it
schema
.is().min(6)                                    // Minimum length 6
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
// Validate against a password string
console.log(schema.validate(password));
// => true
// console.log(schema.validate('invalidPASS'));
// => false
 
// Get a full list of rules which failed
// console.log(schema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]
return schema.validate(password)

}

export default validatePassword