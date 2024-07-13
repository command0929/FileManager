let read = require("./file/read");
let write = require("./file/write");

let utils = {
    // archive: require("./file/archive"), - DEPRECATED
    // extract: require("./file/extract"), - DEPRECATED
    storage: require("./file/storage"),
    download: write.downloadUrl
};
utils.toString = (() => "[object Utils]").bind({});

let result = {
    utils: utils,
    read: read.read,
    write: write.write,
    rawRead: read.rawRead,
    rawWrite: write.rawWrite,
    delete: require("./file/delete"),
};

result.toString = (() => "[object FileManager]").bind({});
module.exports = result;
