const dotenv = require('dotenv');
dotenv.config();

key = process.env.AUTH_KEY;

function authenticate(apiKey, res) {
    if (apiKey == key) {
        return true;
    }
    // res.json("wrong key");
    return false;
}

module.exports = authenticate;