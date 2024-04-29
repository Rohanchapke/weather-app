import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrl: './future.component.css'
})
export class FutureComponent implements OnInit {
  weatherData:any[]=[];
  @Input()
  cityName: any;
  constructor(private weatherService: WeatherService){}
  ngOnInit(): void {
    this.weatherData =[];
    this.weatherService.getWeatherForecast(this.cityName).subscribe({
      next: (response) => {this.futureForecast(response)},
      error: (err) => { console.error('Error handler:', err); },
      complete: () => { }     
    }
    )
  }

  futureForecast(data: WeatherData)
  {
      for(let i=0; i < data.list.length ;i=i+8)
        {
          this.weatherData.push(
            {
              date:data.list[i].dt_txt,
              temp_max: data.list[i].main.temp_max,
              temp_min: data.list[i].main.temp_min,
              imgsrc:"https://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x.png",
              desc:data.list[i].weather[0].description
            }
          );
        }
        
  }
}
