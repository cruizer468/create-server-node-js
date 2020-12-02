const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res)=>{
//  if(req.url === '/') {
    //  res.writeHead(200, {'content-Type':'text/html'});
    //  res.end('<h1> Home Node With MySql</h1>')
//     fs.readFile(
//         path.join(__dirname,'public', 'index.html'),
//         (err, content) =>{
//          if(err) throw  err;
//          res.writeHead(200, {'content-Type':'text/html'});
//          res.end(content);
//         }
//     )
//  }


//  if(req.url === '/api/users') {
//      const users = [
//         {nmae: 'Ahmed', age:27},        
//         {nmae: 'jack', age:33}
//     ];
//   res.writeHead(200,{'Content-Type':'application/json'});
//   res.end(JSON.stringify(users));

//  }


// Build file Path

let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

// extention of file
let extname = path.extname(filePath);

// initial content type

let contentType = 'text/html';

// check ext and set cotent type

switch(extname) {
    case '.js':
        contentType = 'textjavascript';
     break;
    case '.css':
        contentType = 'text/css';
     break;
    case '.json':
        contentType = 'application/json';
     break;
    case '.jpg':
        contentType = 'image/jpg';
     break; 
}

// read file

fs.readFile(filePath, (err, content) => {
  if(err) {
    if(err.code === 'ENOENT'){
     // page not found
        fs.readFile(
            path.join(__dirname,'public', '404.html'),
            (errs, content) =>{
            res.writeHead(200, {'content-Type':'text/html'});
            res.end(content);
            }
        )
    } else { // some ervr errors
        res.writeHead(500);
        res.end(`server Error ${err.code}`);
    }
  } 
  else {
    // success
    res.writeHead(200, {'content-Type': contentType});
    res.end(content,'utf8')
  }
})



})


const Port = process.env.PORT || 5000;

server.listen(Port, ()=> console.log(`server is runing on port ${Port}`))
