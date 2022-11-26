
const express = require('express');
const converter = require('../middlewares/converter');

let app = express();


app.post('/convert', converter, (req, res) => {
    try {
        res.set("Connection", "close");
        res.send({ ok: true, file: req.body.outputFile });
    } catch (error) {
        res.status(500);
        res.json({
            error: "wrong scans json provided"
        })
    }
})

app.post('/upload', async (req, res) => {
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

app.get('/download', function (req, res) {
    const file = `./uploads/${req.query.file}`;
    try {
        res.download(file);
    } catch (error) {
        res.status(500);
        res.json({
            error: "wrong file provided"
        })
    }
});

module.exports = app;