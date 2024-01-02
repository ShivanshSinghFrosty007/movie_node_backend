const key = "qwerty123";

function authenticate(apiKey, res) {
    if (apiKey == key) {
        return true;
    }
    // res.json("wrong key");
    return false;
}

module.exports = authenticate;