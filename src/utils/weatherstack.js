// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request=require('request')
const forecast=(address,callback)=>{
const url='http://api.weatherstack.com/current? '+encodeURIComponent(address)+ 'access_key=3830673069b6f2106e2d1929130030dd&query=37.8267,-122.4233&units=f'
request({url:url,json:true},(error,response) =>{
    if(error){
       callback('unable to find location',undefined)
    }else if(response.body.error){
       callback('unable to connect',undefined)
    }else{
        console.log(response.body.current)
        console.log(response.body.current.weather_descriptions[0]+'. its currently'+response.body.current.temperature+ 'degree temperatur.it feels like' 
        +response.body.current.feelslike +' % the rain ')
         }
        })
    }

module.exports=forecast