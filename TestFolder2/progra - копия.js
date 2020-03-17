const fs = require('fs');
const path = require('path');

let maxFiles = 3;
let maxDirectory = 0;

function checkTypeFile(fileType,name){
    reg = new RegExp(fileType);
    if(reg.test(name) && maxFiles > 0){
        console.log('maxFiles'+maxFiles);
        maxFiles--;
        return true;
    }
    else {
        return false;
    }
};



function getFiles (dir,files_,typename){ 
    files_ = files_ || [];
    console.log(maxDirectory);
    let files = fs.readdirSync(dir);
    for (let i in files){
        let name = path.join(dir,files[i]);
        if (fs.statSync(name).isDirectory()){    
            if(maxDirectory >0){
            maxDirectory--;
            getFiles(name, files_);
            }
        } else {
            if(checkTypeFile(typename,name)){
            files_.push(files[i]);
                fs.stat(name, function(err,stat){
                console.log(err,stat.birthtime);
                });
            }
        }
    }
    return files_;
};

console.log(getFiles('C:/Users/User/Desktop/Task_2/',0,"js"));