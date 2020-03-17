const fs = require('fs');
const path = require('path');

const filepath = 'E:/JavaScript/Task_2';

let maxFiles = 100;
let maxDirectory = 5;
let files_all= [];

function checkTypeFile(fileType,name){
    reg = new RegExp(fileType);
    if(reg.test(name) && maxFiles > 0){
        maxFiles--;
        return true;
    }
    else {
        return false;
    }
};

function getLastCreatedFile() {
    let lastFile;
    foundFiles = getFiles(filepath,"js");
    let helpDate = Date.parse('1/1/2020 00:00');
    for(let file of foundFiles) {
        console.log("all files = "+file);
        let timeCreate = fs.statSync(file).ctime;
        if(timeCreate > helpDate) {
            helpDate = timeCreate;      
            lastFile = file;         
        }
    }
    console.log("lastFile = "+lastFile);
    return lastFile;
}

function findAllLastFiles(lastFile) {
    let allLastFiles = [];
    for(let file of foundFiles) {
        if(file !== lastFile) {
            if((fs.statSync(lastFile).ctime.getTime() - fs.statSync(file).ctime.getTime()) < 10000) {
                allLastFiles.push(file);
            }
        }
    }
    return allLastFiles;
}

function getFiles (dir,typename, files_ = []){ 
    console.log("Max files_ = " +files_all.length);
    let files = fs.readdirSync(dir);
    console.log("files l = " +files.length);
    for (let i =0; i < files.length; i ++){
        
        let name = path.join(dir,files[i]);
        if (fs.statSync(name).isDirectory() && maxDirectory >0){ 
            console.log("NameDirectory = " +name);   
            maxDirectory--;
            getFiles(name,"js", files_);
        } else {           
            if(checkTypeFile(typename,name)){
            console.log("NameFile = " +name);  
            files_.push(name);           
            }
        }
    }
    return files_;
};
console.log("AllLastFiles whose creation date is less than 10 MS = "+
    findAllLastFiles(getLastCreatedFile())
    );