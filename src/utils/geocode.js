
const request=require("request");
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json.json?access_token=pk.eyJ1IjoiYXVtcmFvIiwiYSI6ImNsa25pZ2kxaDBsNGUzZW1pNTlueGcwN3AifQ.Hm9S2qepn-L38mRI8yuRtg&limit=1";
    request({url,json:true},(error,{body})=>{
      if(error){
          callback("unable to connect to locaTION SERVICES",undefined);
      }else if(body.features.length==0){
          callback('unable to find location,please try again ',undefined);
      }else{
          //we will share couple of values
          callback(undefined,{
              latitude:body.features[0].center[1],
              longitude:body.features[0].center[0],
              location:body.features[0].place_name
          })
      }
    }
 )};

 
module.exports=geocode;
