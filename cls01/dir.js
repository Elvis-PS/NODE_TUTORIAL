
/* This module will teach you how to create e delete a folder/directory */


const fs = require('fs');

if(!fs.existsSync('./newDir')){
    fs.mkdir('./newDir', err=>{
        if(err) throw err;
        console.log('directory created');
    })
}

if(fs.existsSync('./newDir')){
    fs.rmdir('./newDir', err=>{
        if(err) throw err;
        console.log('directory removed');
    });
}