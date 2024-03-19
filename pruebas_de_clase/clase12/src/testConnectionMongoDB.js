const { connectToDB, disconnectFromMongoDB } = require("./mongodb.js");

connectToDB()
    .then(() => disconnectFromMongoDB());
