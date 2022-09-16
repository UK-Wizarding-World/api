const express = require("express");
const router = express.Router(); // same as app

router.get("/", (req, res) => {
    res.status(200).json({ "status": "working correctly" })
});

router.get("/getData/:id", (req, res) => {
    const db = require("../firebase.js");

    let ref = db.ref(`/${req.params.id}/leaderstats`)
    ref.once("value", async (snapshot) => {
        console.log(snapshot.val())
    })
    let data = { "Galleon":  Math.floor(Math.random() * 1000), "Knut":  Math.floor(Math.random() * 1000), "Sickle":  Math.floor(Math.random() * 1000) }
    ref.set(data).then(() => {
        console.log(ref)
        ref.on("value", async (snapshot) => {
            console.log(snapshot.val())

            res.json(snapshot.val())
        })
    })

})

// allows the main script to require this and add it to an api route

module.exports = router; 
