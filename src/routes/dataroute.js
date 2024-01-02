const espress = require('express');
const router = espress.Router();
const http = require('https'); // or 'https' for https:// URLs

const fs = require("fs");

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb+srv://FrostyNodeApp:qwerty123@cluster0.cjsivdu.mongodb.net/?retryWrites=true&w=majority");

const authenticate = require('../auth/authKey');

router.get("/:key/video/:name", async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }
    const baseAddr = "https://raw.githubusercontent.com/ShivanshSinghFrosty007/movie_node_backend/main/src/data/videos/";
    const path = baseAddr + req.params.name;
    
    const request = http.get(baseAddr, function (response) {
        res.writeHead(200, { "Content-Type": "video/mp4" });
        response.pipe(res);
    });

    console.log('video get');
});

router.get('/:key/image/:name', async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }
    const baseAddr = "https://raw.githubusercontent.com/ShivanshSinghFrosty007/movie_node_backend/main/src/data/images/";
    const path = baseAddr + req.params.name;

    const request = http.get(path, function (response) {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            'Accept': '*/*',
            "Content-Type": "image/jpg",
        });
        response.pipe(res);
    });
    console.log('image get');
});

module.exports = router;