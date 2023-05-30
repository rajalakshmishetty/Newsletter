const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/" , function(req,res){

   res.sendFile(__dirname + "/signup.html")

})

app.post("/" ,function(req,res){
const firstName = req.body.Fname;
const lastName = req.body.Lname;
const email = req.body.email;

const data ={
   members : [
      {
         email_address:email,
         status : "subscribed",
         merge_fields:{
            FNAME: firstName,
            LNAME:lastName
         }


      }
   ]
};

const jsonData = JSON.stringify(data)

const url ="https://us21.api.mailchimp.com/3.0/lists/23391f24c9";
const options={
method:"POST",
auth:"rajalakshmi1:d4646124291fa89003c10f9900520591-us21"
}

const request = https.request(url ,options ,function(response){
   if (response.statusCode===200) {
      res.sendFile(__dirname + "/success.html")
      
   } else{
      res.sendFile(__dirname + "/failure.html")


   }



   response.on("data", function(data){
      console.log(JSON.parse(data));
   })


})

request.write(jsonData);
request.end();

})

app.post("/failure",function(req, res){

   res.redirect("/")
})


app.listen(process.env.PORT ||3000,function(){
console.log("Server is running in port 3000");

})


//API Key
// d4646124291fa89003c10f9900520591-us21


///List Id

//23391f24c9