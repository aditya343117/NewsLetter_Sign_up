const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");
const { stringify } = require("querystring");
//const request= require("request");
const app= express();
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html");
    
})

app.post("/", function(req, res){
    const firstname= req.body.fname;
    const lastname= req.body.lname;
    const email= req.body.Email; 

    const data={
        members:[
            {
                email_address: email,
               // status : subscribed,
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData= JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/693078fdad";

    const options={
        method: "POST",
        auth: "aditya1:f5642d73c8482bd236cd8f866f01fee4-us11"
    }

      const request  = https.request(url, options, function(response){
          response.on("data", function(data){
             console.log(JSON.parse(data));
          })
    })

    request.write(jsonData);
    request.end();

})

app.listen(3000, function(){
   console.log("server is running at port 3000");
})

//api= f5642d73c8482bd236cd8f866f01fee4-us11
//audiance/list id=693078fdad