const fs = require('fs');
const path = require('path');
function checkTypeFile(fileType){

};



function getFiles (dir,files_){ 
    files_ = files_ || [];
    
    let files = fs.readdirSync(dir);
    for (let i in files){
        let name = path.join(dir,files[i]);
        if (fs.statSync(name).isDirectory()){    
            getFiles(name, files_);
        } else {
            if(/\.js$/.test(name)){
            files_.push(files[i]);
            }
        }
    }
    return files_;
};

console.log(getFiles('C:/Users/User/Desktop/Task_2/'));