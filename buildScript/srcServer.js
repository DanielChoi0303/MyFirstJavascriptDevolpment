
var express = require('express');
var path = require('path')
var open = require('open')
var port = 3000
var app =express()
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/' ,function(req, res){
    res.sendFile(path.join(__dirname, '../src/index.html'))
});
app.get('/greetDaniel', function(req,res){
    res.sendFile(path.join(__dirname, '../src/daniel.html'))
});
app.get('/studentAddress', function(req,res){
    res.send("we will add student address here nex time");
})



app.post('/submit-student-data', function(req, res){
    var name=req.body.firstname +''+req.body.lastname;
    var sql = require("mssql");
    sql.close();


    var config = {
        user:'AshelyDad',
        password:'AshelyDad',
        server:'ashelydad.c9fnrriilcpj.us-east-1.rds.amazonaws.com',
        database:'SchoolDB'
    };
    
    sql.connect(config, function(err){
        if (err) console.log(err);
        var request = new sql.Request();

         request.query(`insert into Student (FirstName, LastName, Address, State, Phone_Number, Email, State) values ('${req.body.firstname}','${req.body.lastname}'
        ,'${req.body.address}','${req.body.state}','${req.body.phone_number}','${req.body.email}')`,
        function(err, recordset){
            if(err) console.log(err)
            res.send(name + 'Submitted Successfully!');
        });
    });
});

app.listen(port, function(err){
    if (err){
        console.log(err);
    }else{
        open('http://localhost:'+port);
    }

})

        
    
   


