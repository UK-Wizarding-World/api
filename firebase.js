var admin = require("firebase-admin");

var serviceAccount = process.env.firebase_secret
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount)),

    databaseURL: "https://uk-wizarding-world-default-rtdb.firebaseio.com"
});
var db = admin.database();

module.exports = db;