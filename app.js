const experss = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = experss();
app.use(bodyParser.urlencoded({extended: true}));//When we want to pass the data that comes in the html form
app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html");
});
 app.post("/",function(req,res){
     const city = req.body.CityName;
     console.log("city");
     const appid = '//api key';
     const url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+ "&unit=metric";
    //  https request from the external server
  https.get(url,function(response){
  console.log(response.statusCode);

//  Data is coming from an external server
  response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].weatherDescription;
      const imageIcon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+imageIcon+"@2x.png";
      res.write(" The temp of " +city +" is "+ temp +" Degrees Celcius");
      res.write("<img src=" + iconUrl +">");
      res.send();
  });
 });
  

});


/*app.get("/",function(req,res){
    const appid = de48181ea19190405eaf8fd396e231dc;
     const url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+ 

 https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const weatherDescription = weatherData.weather[0].weatherDescription
      const temp = weatherData.main.temp
      const imageIcon = weatherData.weather[0].icon
      const iconUrl = "http://openweathermap.org/img/wn/"+imageIcon+"@2x.png"
      res.write(" The temp of agra is "+ temp+"shivam");
      res.write("<img src=" +iconUrl+">");
      res.send();
  })
 })
  

})*/


app.listen(process.env.PORT,function(){
  console.log("Server is running on the port 8080");
})