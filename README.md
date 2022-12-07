# ifcConverter-web

Convert your ifc files to different 3d objects.

I made a wrapper around Ifc Open shell, a library that allows you to convert IFC files to other formats (dae, obj, stl, etc) using different options.
It's built on React, Nodejs, three.js and IfcOpenshell.
The backend can be deployed on his own, which can be very useful not only for the web (where there are very good solutions such as ifc.js) but also for unity or unreal applications where plugins for this type of task are quite expensive.
The front allows you to upload and preview your Ifc in a webgl canvas before downloading it.

It's fully dockerized(into three different containers) and can be deployed anywhere using pm2 to manage the nodejs process, allowing you to work in cluster mode for better perfomance.

![](https://github.com/jonlo/ifcConverter-web/blob/main/ifc-convert.gif)

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
