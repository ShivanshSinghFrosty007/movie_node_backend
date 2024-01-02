const espress = require('express');
const router = espress.Router();

const fs = require("fs");

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb+srv://FrostyNodeApp:qwerty123@cluster0.cjsivdu.mongodb.net/?retryWrites=true&w=majority");

const authenticate = require('../auth/authKey');

router.get("/:key/video/:name", async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }
    const baseAddr = "D:\\node project\\flutterBackend\\src\\data\\videos\\";
    const path = baseAddr + req.params.name;
    const videoSize = fs.statSync(path).size;

    const range = req.headers.range;
    if (range) {
        const CHUNK_SIZE = 20 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/m3u8",
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(path, { start, end });
        videoStream.pipe(res);
    } else {
        fs.readFile(path, (err, data) => {
            res.writeHead(200, { "Content-Type": "video/mp4", "content-length": videoSize });
            res.write(data);
            res.end();
        });
    }
    console.log('video get');
});

router.get('/:key/image/:name', async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }
    const baseAddr = "D:\\node project\\flutterBackend\\src\\data\\images\\";
    const path = baseAddr + req.params.name;

    fs.readFile(path, (err, data) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            'Accept': '*/*',
            "Content-Type": "image/jpg",
        });
        res.write(data);
        res.end();
    });
    console.log('image get');
});

module.exports = router;