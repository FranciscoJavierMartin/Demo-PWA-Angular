import { Component, OnInit } from '@angular/core';
import { ContriesService } from 'src/app/services/contries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: ICountry[] = [];

  constructor(public countriesService: ContriesService) { }

  ngOnInit() {
    this.countriesService.getAllCountries()
      .then((countries: ICountry[]) => this.countries = countries);
  }

}
