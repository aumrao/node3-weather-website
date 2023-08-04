const path=require('path');
const hbs=require('hbs');
const express=require('express');

const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");

const app=express();

const publicDirectoryPAth=path.join(__dirname,'../public');
const viewsPAth=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views',viewsPAth);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPAth)); 


app.get('',(req,res)=>{
      res.render('index',{
        title:'Weather App',
        name:'andrew meads'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us Page',
        name:' andrew meads'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
       helpText:"welcome to help page",
       title:'Help',
       name:'Andrew Mead'
    })
})


//app.com   /help  /about
app.get('',(req,res)=>{
    res.send('<h1><b>Hello Express</b></h1>');
})

app.get('/weather',(req,res)=>{
    location=req.query.address;
    if(!location){
        return res.send({error:"please provide the address"});
    }else{
 


        geocode(location,(error,{latitude,longitude,location}={})=>{
            if(error){
                console.log(error);
            }
            forecast(latitude,longitude, (error, forecastData) => {
                console.log(location)
                console.log(forecastData)
                res.send({
                    forecast:forecastData,
                    location:location
                })
              });
        });



      
    }
   
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:'Help Page Not Found'
    })
    
 })

 app.get('/products',(req,res)=>{
    if(!req.query.search){
        return  res.send({
            error:"you must provide a search term"
          })
    }else{
        console.log(req.query.search);
        res.send({
            products:[]
        })
    }
   
 })

app.get('*',(req,res)=>{
   res.render('error',{
    error:"404 page not found"
   });
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000cd')
});