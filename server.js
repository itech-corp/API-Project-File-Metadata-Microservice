'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
let multer = require('multer');
//let storage = multer.diskStorage({destination:(req,file,cb)=>{
//                                cb(null,'uploads')
//                                },
//                                filename:(req,file,cb)=>{
//                                  cb(null,file.fieldname)
//                                }
//                                });
let upload=multer({dest:'/tmp'});
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});
app.route("/api/fileanalyse").post(upload.single('upfile'),(req,res,next)=>{
    console.log(req.file);
  res.json({Name:req.file.originalname,type:req.file.mimetype,size:req.file.size+" bytes"});
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
  
});
