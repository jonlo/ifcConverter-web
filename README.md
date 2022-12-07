# ifcConverter-web

Convert your ifc files to different 3d objects.

This project is divided into a backend application that allows you to convert a IFC file to different 3d files, and a frontent which let's you upload the file and preview it before downloading.

The application is fully dockerized and can be deployed easily into two separated components.


![](https://github.com/jonlo/ifcConverter-web/ifc-convert.gif)

## Backend

The backend is developed under node.js, and uses [IfcOpenShell](https://blenderbim.org/docs-python/ifcconvert/usage.html) to transform IFC files to different 3d files.

If you deploy it via docker, it will be launched using pm2, [pm2](https://pm2.keymetrics.io/) allowing the application to run under cluster mode.

### post /upload

```
ifc : file
```
Uploads a ifc file

Returns

```
data: {
    name: ifc.name,
    mimetype: ifc.mimetype,
    size: ifc.size
}
```

### post /convert

body:
```
{
    file : fileName,
    options: [],
    outputFile:outPutFileName
}
```


Converts an ifc file to the output file name extension file type. You can add IfcopenShell allowed optionss.

Returns
```
{
    ok: bool,
    file: outputFileName 
}
```

### get /download

queryParams:

file : fileName
```
/download?file=yourFile.dae
```
Downloads a file

Returns file

## Frontend

Built using react framework and three.js.
It allows you to upload an ifc file, convert it and preview in a webgl canvas before downloading.