//const IncomingForm = require('formidable').IncomingForm
const fs = require('fs')
var fls = require('./models/FilesList');
var FL = fls.FilesList;


module.exports = function list(req, res) {
    //requiring path and fs modules
    const path = require('path');
    var arr = [];
    //joining path of directory 
    const directoryPath = path.join(__dirname, 'uploads/pdf');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(async function (file) {
            // Do whatever you want to do with the file
            var statsObj = await getStats(directoryPath + '\\' + file)
            /* console.log(statsObj); */

            var ob = new FL(file, formatBytes(statsObj.size));
            /*   fls.fileName = file;
              fls.dimension = statsObj.size /1000; //Getting MB */
            console.log(ob);
            arr.push(ob);
        });
        //console.log(JSON.stringify(arr));
        setTimeout(() => res.json(arr), 3000);
    });
}

async function getStats(path) {
    return fs.statSync(path);
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}