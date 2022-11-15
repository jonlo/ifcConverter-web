require('./config/config')
const express = require('express')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require ('./routes/index'));

const server = app.listen(process.env.PORT, () => {
    console.log(`listening in port ${process.env.PORT}`)
})

module.exports = server
