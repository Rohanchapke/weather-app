import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent implements OnInit {
  
  timeline : any[] = [];
  
  @Input()
  cityName: any;
  
  constructor(private weatherService: WeatherService){}
  
  ngOnInit(): void {
    this.weatherService.getWeatherForecast(this.cityName).subscribe({
      next: (response) => {this.getTodayWeather(response)},
      error: (err) => { console.error('Error handler:', err); },
      complete: () => { }     
    }
    )
  }

  daterange()
  {
    const start= new Date();
    start.setHours(start.getHours()+(start.getTimezoneOffset()/60))
    const to = new Date(start);
    to.setHours(to.getHours()+2,to.getMinutes()+59,to.getSeconds()+59);
    return{start, to}
  }

  getTodayWeather(todayWeather : WeatherData)
  {
    for(const weather of todayWeather.list.slice(0,4))
      {
        let popcal= ((weather.pop * 100)/10).toString();
        let a = parseInt(popcal, 10) * 10; 
        let b = a + 10; 
        let pop=((weather.pop * 100) - a > b - (weather.pop * 100))? b : a;
        this.timeline.push({
          time:this.getLongFormatUnixTime(weather.dt,todayWeather.city.timezone),
          temp: weather.main.temp,
          pop: pop,
          pops:(weather.pop * 100),
          imgsrc:"https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"
        })
      }
  }

   getLongFormatUnixTime(epochTime: number, utcOffsetSeconds: number) {
    const date = new Date((epochTime + utcOffsetSeconds) * 1000);
    return date.toLocaleTimeString([], { timeZone: 'UTC'}).replace(/:\d\d/, '');
  }


}
