const espress = require('express');
const app = espress();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { MongoClient, ObjectId } = require('mongodb');

const authenticate = require('./src/auth/authKey');

const client = new MongoClient("mongodb+srv://FrostyNodeApp:qwerty123@cluster0.cjsivdu.mongodb.net/?retryWrites=true&w=majority");

client.connect().then(
    async function () {

        app.get("/", async function (req, res) {
            res.json("Invalid Key");
        });

        app.get("/:key", async function (req, res) {
            if (!authenticate(req.params.key, res)) {
                return;
            }

            res.json("API works");
        });

        const movieRouter = require("./src/routes/movieroute");
        app.use("/", movieRouter);

        const userRouter = require("./src/routes/userroute");
        app.use("/", userRouter);

        const dataRouter = require("./src/routes/dataroute");
        app.use("/", dataRouter);

        app.get('*', function (req, res) {
            res.status(404).send('Invalid Request');
        });
    }
);

app.listen(5000, function () {
    console.log("http://localhost:5000/");
});