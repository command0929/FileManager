var ZipFile = Packages.net.lingala.zip4j.core.ZipFile;
var File = Packages.java.io.File;

/**
 * unzip a file
 * 
 * @param {string} path - The path of the zip file to be extracted.
 * @param {string} toPath - The destination path where the extracted files will be placed.
 * @param {string} [password] - Optional. The password to decrypt the zip file. If not provided, the zip file will be extracted without decryption.
 * @returns {object} - The result object containing:
 *  - {boolean} result - Indicates if the extraction was successful.
 *  - {string} reason - The reason for failure if the extraction was not successful.
 *  - {array} path - An array containing the source path and the destination path.
 *  - {object} v - Additional information:
 *    - {string} zipType - The type of the zip (extension of the zip file, typically "zip").
 *    - {string} [password] - The password used for decryption, if provided.
 *    - {object} [v] - If an error occurs, this will contain the error object.
 */
function unzip(path, toPath, password) {
    if(!File(path).exists() || File(toPath).exists()) {
        return {
            result: false,
            reason: "path does not exist or destination path already exists",
            path: [path, toPath],
            v: {}
        };
    }
    try {
        var zipFile = new ZipFile(path);
        
        if (zipFile.isEncrypted()) {
            zipFile.setPassword(password);
        }
        
        zipFile.extractAll(toPath);

        return {
            result: true,
            reason: "",
            path: [path, toPath],
            v: {
                zipType: path.split(".").slice(-1).join(""),
                password: password
            }
        };
    } catch (err) {
        return {
            result: false,
            reason: "caught error while extracting",
            path: [path, toPath],
            v: err
        };
    }
};

module.exports = unzip;
