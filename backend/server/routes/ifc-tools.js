
const express = require('express');
const { convertIfc } = require("../controllers/ifcConverterExec");

let app = express();


app.get('/convertIfc', (req, res) => {
    try {
        console.log(req.body.ifcFile);
        console.log(req.body.outputFormat);
        console.log(req.body.parameters);
        res.send({ ok: true, message: req.body.ifcFile });
    } catch (error) {
        res.status(500);
        res.json({
            error: "wrong scans json provided"
        })
    }
})

app.post('/upload-ifc', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let ifc = req.files.ifc;
            ifc.mv('./uploads/' + ifc.name);
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: ifc.name,
                    mimetype: ifc.mimetype,
                    size: ifc.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;