let CORE = require("./core.js");
let File = java.io.File;

function storage(path) {
    let _File = File(path);
    if(!_File.exists()) return -1;
    let bytesList = DirectoryReader(path);
    let bytes = 0; bytesList.map(e => bytes += e.bytes);
    return CORE(bytes);
}

let DirectoryReader = /** @functions */ function (directoryPath) {
    let directory = new File(directoryPath);
    
    let bytes = [];

    if(directory.exists() && directory.isDirectory()) {
        for(let file of directory.listFiles()) {
            if(file.isFile()) {
                let fileBytes = file.length();
                bytes.push({
                    path: file.toPath().toString(),
                    name: file.getName(),
                    bytes: fileBytes
                });
            }else if(file.isDirectory()) {
                bytes = bytes.concat(DirectoryReader(file.toPath()));
            }
        }

    } else if(directory.exists()) {
        bytes.push({
            path: file.toPath().toString(),
            name: directory.getName(),
            bytes: directory.length()
        });
    }

    return bytes;
}

exports['getStorage'] = storage;
