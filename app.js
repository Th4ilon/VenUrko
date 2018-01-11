/*let express = require('express');  
let app = express();  
//Static resources server
app.use(express.static(__dirname + '/www'));

let server = app.listen(8082, function () {  
    let port = server.address().port;
    console.log('Server running at port %s', port);
});*/


//file & package cominication
// express client ask for a file(venan.jpg)
//socket.io client send data to  server, Server sends data to client
const express = require('express');  
const app = express();  
let serv = require('http').Server(app);
let io = require('socket.io')(serv,{});


//if the query star just like localhos:8000 it gonna send to indes.html
app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname+'/client'));

serv.listen(8000,()=>{
    let port = 8000;
    console.log('Sup im Working at port %s', port); 
});
//id player connect to the server.
io.sockets.on('connection', (socket)=>{
    console.log('socket connection');
    //same as before but recive data from the client
    socket.on('happy',function(data){
        console.log('happy because ' + data.reason);
    });
    //emit is the function that sends data to  client.
    //it recive messege name 'happy' and object 'reason'(withc is the data it self)
    socket.emit('serverMsg',{
        msg:'hello',
    });
   
});