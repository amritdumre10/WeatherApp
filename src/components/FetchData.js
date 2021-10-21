import React, {
    Component
} from 'react';
import axios from 'axios';
import './mystyle.css'

class FetchData extends Component{
    state = {
        data:{
            city:'Kathmandu',
            country:'Nepal'
        },
        inputInfo: [],
        weatherdata:{
            coord: {
            lon: '',
            lat: ''
            },
            weather: [
              {
                id: '',
                 main : '' ,
                 description :  '',
                 icon :  ''
              }
            ],
             base :  '',
             main : {
               temp : '',
               feels_like : '',
               temp_min : '',
               temp_max : '',
               pressure : '',
               humidity : ''
            },
             visibility : '',
             wind : {
               speed : '',
               deg : ''
            },
             clouds : {
               all : ''
            },
             dt : '',
             sys : {
               type : '',
               id : '',
               country :  '' ,
               sunrise : '',
               sunset : ''
            },
             timezone : '',
             id : '',
             name :  '' ,
             cod : ''
          }
        }

    
     
    componentDidMount() {
        let{data}=this.state;


        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+data.city+','+data.country+'&appid=8d2de98e089f1c28e1a22fc19a24ef04&units=metric')
            .then(response => {
                this.setState({
                    weatherdata: response.data
                })
                console.log(this.state.weatherdata);
            })                                                           
            .catch(error => {
                console.log('error', error)
            })
    }

    handleChange(e) {
        let { data } = this.state;
        let { name, value } = e.target;
        data[name] = value;
        this.setState({
            data
        })
    }
        
    handleSubmit() {
        let { data, inputInfo} = this.state;
      
        inputInfo.push({
            city: data.city,
            country: data.country
        })
        

        this.setState({
            inputInfo
        })

        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+data.city+','+data.country+'&appid=8d2de98e089f1c28e1a22fc19a24ef04&units=metric')
            .then(response => {
                this.setState({
                    weatherdata: response.data
                })
                console.log(this.state.weatherdata);
            })                                                           
            .catch(error => {
                console.log('error', error)
            })

        
    }

    convertTime(unixTime){
        let dt = new Date(unixTime * 1000)
        let h = dt.getHours()
        let m = "0" + dt.getMinutes()
        let t = h + ":" + m.substr(-2)
        return t
    }

    getCurrentDate(separator='/'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
    
        render() {
            return(
                    <div className='main'>
                    <div className='top'>
                    <p className='findweather'>Find Today's Weather Here</p>
                    </div>

                
                    <label>Country: </label>
                    <input 
                        style={{width:'200px' , height:'20px'}}
                        name="country"
                        value={this.state.country}
                        type='text'
                        onChange={(e) => { this.handleChange(e) }}
                    />

                    <label>  City: </label>
                    <input 
                        style={{width:'200px' , height:'20px'}}
                        name="city"
                        value={this.state.city}
                        type='text'
                        onChange={(e) => { this.handleChange(e) }}
                    />

                    <button style={{ height:'100px'},{color:'white'},{backgroundColor:'#42A8EC'}} onClick={() => this.handleSubmit()}>Get Weather</button>

                    <p className='countCity' style={{fontSize:'25px'}}> {this.state.data.city}, {this.state.data.country} <br/> <br/> Date: {this.getCurrentDate()}</p>

                    <div className="status">
                    <img src={'http://openweathermap.org/img/wn/'+this.state.weatherdata.weather[0].icon+'@2x.png'}/>
                    <p style={{marginTop:'0px'}}> {this.state.weatherdata.weather[0].main} </p>
                    </div>
                  
                    
                    <p className='mainTemp'> {Math.round(this.state.weatherdata.main.temp)}°C</p>
                    

                    <div className='bottom'>
                        <p className='items'>Min Temp <p>{Math.round(this.state.weatherdata.main.temp_min)}°C</p></p> 
                        <p className='items'>Max Temp <p>{Math.round(this.state.weatherdata.main.temp_max)}°C</p></p> 
                        <p className='items'>Humidity <p>{this.state.weatherdata.main.humidity}%</p></p> 
                        <p className='items'>Latitude<p>{this.state.weatherdata.coord.lat}</p></p>      
                        <p className='items'>Longitude<p>{this.state.weatherdata.coord.lon}</p></p> 
                        <p className='items'>Sunrise<p>{this.convertTime(this.state.weatherdata.sys.sunrise)} hrs</p></p> 
                        <p className='items'>Sunset<p>{this.convertTime(this.state.weatherdata.sys.sunset)} hrs</p></p>
                    </div>
                    </div>
                );
            }
        }
    
 export default FetchData;