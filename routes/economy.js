const express = require("express");
const router = express.Router(); // same as app
const db = require("../firebase.js");

router.get("/", (req, res) => {
    res.status(200).json({ "status": "working correctly" })
});

router.get("/:id/get", (req, res) => {

    let ref = db.ref(`/${req.params.id}/leaderstats`)
    ref.on("value", async (snapshot) => {
        res.send(snapshot.val())
    })

})

router.get("/:id/set", (req, res) => {
    let data = req.query.data; // the table that the user's data should be changed to

    let ref = db.ref(`/${req.params.id}/leaderstats`)
    ref.set(req.query.data)

})

// allows the main script to require this and add it to an api route

module.exports = router; 
