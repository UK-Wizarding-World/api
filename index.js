require("dotenv").config("./.env");
console.log(process.env)
const express = require('express');
const app = express();

const { readdirSync } = require("node:fs");
const { join } = require("node:path");
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

const cors = require("cors");
app.use(cors())

const { json } = require('body-parser')
const methodOverride = require('method-override')

app.use(json())
app.use(methodOverride())

const CURRENT_VERSION = 1
app.get("/", async (req, res) => {
    res.status(200).redirect(`/api/v${CURRENT_VERSION}`)
})

app.get(`/api/v${CURRENT_VERSION}`, (req, res) => {
    res.status(200).json({ "version": Number(req.params.version) })
})

const routesPath = join(__dirname, 'routes');
const routeFiles = readdirSync(routesPath).filter(file => file.endsWith('.js'));

for (const file of routeFiles) {
    const filePath = join(routesPath, file);
    const route = require(filePath);
    //console.log(file.split(".")[0])
    app.use(`/api/v${CURRENT_VERSION}/` + file.split(".")[0], route)
}

const listener = app.listen(5000, () => {
    console.log("Your app is listening on port " + listener.address().port + "\n Full url: localhost:"+listener.address().port);
    console.log(listener.address())
});

module.exports = app; // must export the app so that vercel can use it as a function