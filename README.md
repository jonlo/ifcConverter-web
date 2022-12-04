# ifcConverter-web

This project is divided into a backend application that allows you to convert a IFC file to different 3d files, and a frontent which let's you upload the file and preview it before downloading.

The application is fully dockerized and can be deployed easily into two separated components.

## Backend

The backend is developed under node.js, and uses [https://blenderbim.org/docs-python/ifcconvert/usage.html](IfcOpenShell) to transform IFC files to different 3d files.

### post /upload

ifc : file

Uploads a ifc file

Returns

data: {
    name: ifc.name,
    mimetype: ifc.mimetype,
    size: ifc.size
}

### post /convert

body:

{
file : fileName,
options: [],
outputFile:outPutFileName
}

Converts an ifc file to the output file name extension file type. You can add IfcopenShell allowed optionss.

Returns

{ ok: bool, file: outputFileName }

### get /download

queryParams:

file : fileName

Downloads a file

Returns file

## Frontend

Built using react framework and three.js.
It allows you to upload an ifc file, convert it and preview in a webgl canvas before downloading.