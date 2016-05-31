var fs = require('fs');
var pathNode = require('path');

function filepathGetter(dir) {

    var files = fs.readdirSync(dir);
    var filepathArray = [];
    files.forEach(function(filename) {
        var filepath = pathNode.join(dir, filename);
        if (fs.statSync(filepath).isDirectory()) {
            filepathArray = filepathArray.concat(filepathGetter(filepath));
        } else {
            filepathArray.push(filepath);
        }

    });
    return filepathArray;
}

function getModuleName(path, len) {
    var filename = path.split('/');
    return filename[filename.length - len];
}



module.exports = {
    filepathGetter: filepathGetter,
    getModuleName: getModuleName
};
