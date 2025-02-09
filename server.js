import mongoose from 'mongoose';
import app from './app.js';
import bodyParser from "body-parser"
import dotenv from "dotenv"

const PORT = process.env.PORT || 2000;
const MONGOURL = process.env.MONGO_URI;

app.use(bodyParser.json());

mongoose.connect(MONGOURL).then(() => {
    console.log("DB connect sucessfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port :${PORT}`);
    })
})
    .catch((error) => {
        console.log(error);
    })