const express = require("express");
const router = express.Router(); // same as app

router.get("/", (req, res) => {
    res.status(200).json({ "status": "working correctly" })
});

router.get("/getData/:id", (req, res) => {
    const db = require("../firebase.js");

    let ref = db.ref(`/${req.params.id}/leaderstats`)
    ref.on("value", async (snapshot) => {
        res.send(snapshot.val())
    })

})

// allows the main script to require this and add it to an api route

module.exports = router; 
