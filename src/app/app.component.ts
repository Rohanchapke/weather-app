import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CitiesServiceService } from './services/cities.service.service';
import { debounceTime } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
  
})
export class AppComponent implements OnInit {
  cities=['RIO DE JANEIRO','BEIJING','LOS ANGELES'];
  value = '';
  filteredOptions : any[] = [];
  formGroup: FormGroup= new FormGroup({
    c1: new FormControl('')
  });
  title = 'weather-app';
  options = ["Sam", "Varun", "Jasmine"];
  constructor(private service : CitiesServiceService , private fb : FormBuilder){}
  ngOnInit(): void {
    this.initForm();
    this.getCities();
  }
  initForm(){
    this.formGroup = this.fb.group({
      'city' : ['']
    });
    this.formGroup.get('city')!.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(response => {
      if(response && response.length){
        this.filterData(response);
      } else {
        this.filteredOptions = [];
        this.cities=['RIO DE JANEIRO','BEIJING','LOS ANGELES'];
      }
      
    })
  }
  filterData(enteredData: any){
    this.filteredOptions = this.options.filter((item: string) => {
      if (item !== null && item !== undefined)
        {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
        }else{
          return false;
        }
    })
  }

  getCities(){
    this.options=[];
    this.service.getData().subscribe(response => {
      const list=response.split('\n');
      list.shift();
      list.forEach(e=>
        {
          const str=e.split(',');
          this.options.push(str[1]+", "+str[3]);
        }
      )
    })
  }
  onOptionSelected(event: MatAutocompleteSelectedEvent){
    this.cities=[event.option.value];
  }
  tabClikced($event: { index: any; }){
   console.log($event.index);
  }
}

