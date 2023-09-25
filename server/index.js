const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const UserModel = require("./models/Users")

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config();
app.use(express.static('public'))


connectDB()

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/Images')
    },
    filename:(req,file,cb) => {
        cb(null,file.fieldname + "_" + Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
})

app.get("/", (req, res) => {
    res.send("API is running..");
  });

app.post('/v1/api/upload',upload.single('file'),(req,res)=>{
    const { name } = req.body;
    const { filename } = req.file; 
    UserModel.create({ image: filename, name })
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/v1/api/getImage', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

app.listen(3001,()=>{
    console.log("Server is rinning")
})
