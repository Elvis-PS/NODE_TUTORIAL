
/* This module will teach you how to us fs api to read, write, append and rename files */

const fsPromisses = require('fs').promises;
const path = require('path');

const fileOps = async()=>{
    try{
        const data = await fsPromisses.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
        console.log(data);
        // await fsPromisses.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromisses.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromisses.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you Elvis');
        await fsPromisses.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromisses.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf-8');
        console.log(newData);

        //deletes the file
        await fsPromisses.unlink(path.join(__dirname, 'files', 'promiseComplete.txt'));

    }catch(err){
        console.error(err);
    }
}

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data)=>{
//     if(err) throw err;
//     console.log(data);

// })

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), "Hi new file", err=>{
//     if(err) throw err;
//     console.log('Write file');
    
//     fs.appendFile(path.join(__dirname, 'files', 'test.txt'), "Testing text", err=>{
//         if(err) throw err;
//         console.log('append complete');

//         fs.rename(path.join(__dirname, 'files', 'test.txt'), path.join(__dirname, 'files', 'renamedFile.txt'), err=>{
//             if(err)throw err; 
//             console.log('file renamed')
//         });
        
//     })
// })
fileOps();
console.log('hello')



//exit on uncaught erros
process.on('uncaughtException', err=>{
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1)
})
