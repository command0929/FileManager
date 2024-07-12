importClass(java.io.File)
importClass(java.io.FileOutputStream)
importClass(java.io.BufferedOutputStream)
importClass(java.lang.Byte)
importClass(java.net.URL)

/**
 * 
 * @param {string} path - file Path
 * @param {byte[]} bytes - bytes
 * @returns {object} - value
 */ 

// max String : 72,000,000

function write(path, bytes) {
    var file = new File(path);
    
    if(file.exists() && file.isDirectory()) {
        return {
            result: false,
            reason: "path is dir",
            path: path,
            getBytes: () => bytes,
        }
    }

    var fos = new FileOutputStream(path);
    var bos = new BufferedOutputStream(fos);
    
    try {
        bos.write(bytes);
    } catch (err) {
        Log.error(err + "\n" + err.stack.slice(0, -1));
    } finally {
        if((typeof bos) != undefined) bos.close();
        if((typeof fos) != undefined) fos.close();
    }
    return {
        result: true,
        reason: "",
        path: path,
        getBytes: () => bytes
    };
}

/**
 * 
 * @param {string} path - filePath
 * @param {string} str - string
 * @returns {object} - value
 */

function writeString(path, str) {
    let bytes = java.lang.String(str).getBytes();
    return write(path, bytes);
}

/**
 * @param {string} path
 * @param {string} Url
 * @return {void}
 */
function download(path, Url){
    let file = new File(path)

    if(file.exists() && file.isDirectory()) {
        return {
            result: false,
            reason: "path is dir",
            path: path,
            getBytes: () => bytes,
        }
    }

    try{
        let url = new URL(Url);
        let connection = url.openConnection();
        let input = connection.getInputStream();

        let output = new FileOutputStream(path);
        let buffer = java.lang.reflect.Array.newInstance(Byte.TYPE, 4096);
        let len;
        
        while((len = input.read(buffer)) != -1){
            output.write(buffer, 0, len);
        }
    }catch (e){
        Log.error(err + "\n" + err.stack.slice(0, -1));
    } finally {
        if((typeof output) != undefined) output.close();
        if((typeof input) != undefined) input.close();
    }
}

function upload /* forked by kakao-client */ (fileName, bytes) {
    // 마지막에 작업
}

module.exports = {
    rawWrite: write,
    write: writeString,
    downloadUrl: download,
    kakaoUpload: upload,
};
