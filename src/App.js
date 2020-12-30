
import './App.css';
import React from "react"
import weatherlogo from "./finallogo.png"
import Weather from "./Weather"
class App extends React.Component {
  constructor(){
    super()
    this.state={
      lat:"",
      long:"",
      cityName:"",
      userCity:"",
      userCountry:"",
      userState:"",
      hasLoadedCoords:false,
  hasloadedData:false,
      localWeatherdata:[],
      hasPressedButton:false,
      hasLoadedWeatherInfo:false,
      weatherFetchingData:[],
      temp:"",
      feelslike:"",
      humidity:"",
      clouds:"",
      windspeed:"",
      condition:""

    }
  }
 componentDidMount(){
  document.addEventListener('contextmenu', event => event.preventDefault());
   alert("You have to give your location access in order to see local weather info")
   if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position=>{
       this.setState({lat:position.coords.latitude})
       this.setState({long:position.coords.longitude})
       this.setState({hasLoadedCoords:true})
     })
   }
   else{
     alert("Error in receiving location access")
   }
 return fetch("http://ip-api.com/json").then((res)=>{
     if(res.status===200){
       return res.json()
     }
     else{
       alert("Cannot find Location")
     }

  
  }).then((response)=>{
    
     this.setState({userCity:response.city})
     this.setState({userCountry:response.country})
     this.setState({userState:response.regionName})
     this.setState({hasloadedData:true})
   }).then(()=>{ return fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.state.userCity.toLowerCase()+"&appid=d7977aee4febe67766e9ef79abf45f2a").then((res)=>{
    if(res.status===200){
      return res.json()
    }
    else{
      alert("Error")
    }
  }).then((response)=>{
    console.log(response)
    var localarray=[]
    localarray.push(response)
    this.setState({localWeatherdata:localarray})
   

  })})
  
 }

 apiCallforWeather=  (cityName)=>{
return fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=d7977aee4febe67766e9ef79abf45f2a").then(res=>{

if(res.status==200){

return res.json()
}
else{
  alert("There was an error. Put the correct city name and try again")
}
}).then((response)=>{
  if(response){
  console.log(response)
  var weatherdata=[]
  weatherdata.push(response)
  this.setState({hasLoadedWeatherInfo:true})
  this.setState({weatherFetchingData:weatherdata})
  this.setState({temp:Math.floor(response.main.temp-273.15)})
  this.setState({humidity:response.main.humidity})
  this.setState({feelslike:response.main.feels_like})
  this.setState({windspeed:response.wind.speed})
  this.setState({clouds:response.clouds.all})
  this.setState({condition:response.weather[0].main})
  alert("Loaded details ⬇")
}
else{
  return null
}
}).catch(err=>{console.log(err)})

}

  render(){
var content;
if(this.state.hasloadedData===true){
  content=  <h2 style={{color:"lightsalmon"}}>Location : {this.state.userCity} , {this.state.userState} , {this.state.userCountry}</h2>
}
else{
  content=<h2>Loading...</h2>

}

var coordcontent;
if(this.state.hasLoadedCoords===true){
  coordcontent=      <h3>Coordinates: Lat: {this.state.lat}, Long: {this.state.long}</h3>
}
else{
  coordcontent= <h3>Loading...</h3>
}
var weathercontent;
if(this.state.hasLoadedWeatherInfo===false && this.state.hasPressedButton===true){
  weathercontent=<h4>Loading info...</h4>
}


 
  
  return (
    <div className="App">
      <header className="App-header">
      <img  className="logoimg"src={weatherlogo}/>
      <center><h1>Weather App</h1></center> 

    
    
       <h1 style={{fontWeight:"bold",fontFamily:"sans-serif",color:"#3a7bd5"}} className="getweather">Get the weather conditions for any city!</h1>
     
       <br></br>
 
 {content}

 {
   
   this.state.localWeatherdata.map(data=>{
     return(
       <div>

     <center><h3> Condition: {data.weather[0].main}</h3></center>
     <center><h3>Temperature: {Math.floor(data.main.temp-273.15)}°C</h3></center>
    <center> <h3>Feels like: {Math.floor(data.main.feels_like-273.15)}°C</h3></center>
    <center> <h3>Wind Speed: {data.wind.speed}</h3></center>
     <center>{coordcontent}</center>
 

     </div>
     )
   })
 }
 <input onChange={(e)=>{this.setState({cityName:e.target.value})}} className="input100" type="text" name="username" placeholder="Enter any City Name to know its Weather Info!"></input>
 <br></br>

 <center><div  onClick={()=>{this.apiCallforWeather(this.state.cityName.toLowerCase())}} class="button_cont" align="center"><a class="example_a" rel="nofollow noopener">Get Weather</a></div></center>
{weathercontent}
 {
   this.state.hasLoadedWeatherInfo && 
  (
  <Weather temp={this.state.temp} humidity={this.state.humidity} feelslike={Math.round(this.state.feelslike-273.15)} windspeed={this.state.windspeed}  condition={this.state.condition}clouds={this.state.clouds}/>
)
  
 }

 {

/*this.state.hasLoadedWeatherInfo && this.state.hasPressedButton &&
this.state.weatherFetchingData.map(data=>{
(
    <Weather/>
  )
})*/

 }
 <br></br>

 <h1 style={{color:"lightpink"}}>Souritra Kar 2020</h1>
 <h2 style={{color:"mediumpurple"}}>Uses : Openweathermap.org API</h2>
      </header>
  
    </div>
  );
}
}

export default App;
