const request=require("request")
const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=01c88d55a62a4af40174c86874034841&query="+latitude+","+longitude+"&units=f";
    request({url,json:true},(error,{body})=>{
        if(error){
           callback("unable to connect to weather service",undefined);
        }else if(body.error){
              callback("unable to find location",undefined);
        }else{
            callback(undefined,body.current.weather_descriptions)
        }
    });
 };

 module.exports=forecast;