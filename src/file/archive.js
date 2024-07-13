var ZipFile = Packages.net.lingala.zip4j.core.ZipFile;
var ZipParameters = Packages.net.lingala.zip4j.model.ZipParameters;
var Zip4jConstants = Packages.net.lingala.zip4j.util.Zip4jConstants;
var File = Packages.java.io.File;

/**
 * arhchive file or directory
 * 
 * @param {string} path - The path of the file or directory to be zipped.
 * @param {string} toPath - The destination path where the zip file will be created.
 * @param {string} [password] - Optional. The password to encrypt the zip file. If not provided, the zip file will not be encrypted.
 * @returns {object} - The result object containing:
 *  - {boolean} result - Indicates if the zipping was successful.
 *  - {string} reason - The reason for failure if the zipping was not successful.
 *  - {array} path - An array containing the source path and the destination path.
 *  - {object} v - Additional information:
 *    - {string} fileType - The type of the source (file or directory).
 *    - {string} zipType - The type of the zip (extension of the zip file, typically "zip").
 *    - {string} [password] - The password used for encryption, if provided.
 *    - {object} [v] - If an error occurs, this will contain the error object.
 */
function zip(path, toPath, password) {
    if(!File(path).exists() || File(toPath).exists()) {
        return {
            result: false,
            reason: "path does not exist or destination path already exists",
            path: [path, toPath],
            v: {}
        };
    }
    try {
        var parameters = new ZipParameters();
        parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
        parameters.setCompressionLevel(Zip4jConstants.DEFLATE_LEVEL_ULTRA);
        parameters.setEncryptFiles(password ? true : false);
        parameters.setEncryptionMethod(Zip4jConstants.ENC_METHOD_AES);
        parameters.setAesKeyStrength(Zip4jConstants.AES_STRENGTH_256);
        if (password) parameters.setPassword(password);
        
        var finalPath = toPath.split("/").slice(-1).includes(".") ? toPath : toPath + ".zip";
        var zipFile = new ZipFile(finalPath);
        
        zipFile.addFile(new File(path), parameters);

        return {
            result: true,
            reason: "",
            path: [path, toPath],
            v: {
                fileType: File(path).isFile() ? "file" : "directory",
                zipType: finalPath.split(".").slice(-1).join(""),
                password: password
            }
        };
    } catch (err) {
        return {
            result: false,
            reason: "caught error while archiving",
            path: [path, toPath],
            v: err
        };
    }
};

module.exports = zip;
