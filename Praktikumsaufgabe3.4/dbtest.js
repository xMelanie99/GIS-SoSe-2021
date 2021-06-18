"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongodb");
async function connectToDB(_url) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    let students = mongoClient.db("Test").collection("students");
    //   let s: Student = {name: "Max Mustermann", matrikel: 12345};
    //   students.insertOne(s);
    let cursor = students.find(); // Suche nach einer einzelnen Person
    let result = await cursor.toArray();
    console.log(result);
    //   let s: Student = await students.findOne({matrikel: 123456});
    //   console.log(s);
    students.deleteOne({ matrikel: 12345 }); // deleteOne: löscht einen Eintrag
}
connectToDB("mongodb://localhost:27017");
//# sourceMappingURL=dbtest.js.map