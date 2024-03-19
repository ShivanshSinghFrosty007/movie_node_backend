const espress = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = espress.Router();

const { MongoClient, ObjectId } = require('mongodb');

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.cjsivdu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

const authenticate = require('../auth/authKey');

router.get("/:key/data", async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        'Accept': '*/*',
        "Content-Type": "application/json",
    });
    const result = await client.db("moviedb").collection("movie").findOne();
    res.write(JSON.stringify(result));
    res.end();
    console.log('data get');
});

// router.get("/:key/recommend", async function (req, res) {
//     if (!authenticate(req.params.key, res)) {
//         return;
//     }
//     const result = await client.db("songdb").collection("songs").findOne({ _id: new ObjectId('656dcbf6973245b4a2b45ca1') });
//     res.json(result);
// });

// router.get("/:key/search", async function (req, res) {
//     if (!authenticate(req.params.key, res)) {
//         return;
//     }
//     const result = await client.db("songdb").collection("songs").findOne({ _id: new ObjectId('656dcbf6973245b4a2b45ca2') });
//     res.json(result);
// });

// router.get("/:key/trending", async function (req, res) {
//     if (!authenticate(req.params.key, res)) {
//         return;
//     }
//     const result = await client.db("songdb").collection("songs").findOne({ _id: new ObjectId('656dcbf6973245b4a2b45ca3') });
//     res.json(result);
// });

module.exports = router;