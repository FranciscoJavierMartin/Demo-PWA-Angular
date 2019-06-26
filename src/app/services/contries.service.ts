import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContriesService {

  private countries: ICountry[] = [];

  constructor(private http: HttpClient) { }

  getAllCountries(): Promise<ICountry[]>{
    let result: Promise<ICountry[]>;

    if (this.countries.length > 0) {
      result = Promise.resolve(this.countries);
    } else {
      result = new Promise(resolve => {
        this.http.get('https://restcountries.eu/rest/v2/lang/es')
        .subscribe((countries: ICountry[]) => {
          this.countries = countries;
          resolve(this.countries);
        });

      });
    }

    return result;
  }

  getCountryById(id: string): Promise<ICountry> {
    let country: Promise<ICountry>;

    if (this.countries.length > 0) {
      country = this.getCountryByIdFromArray(id);
    } else {
      return this.getAllCountries().then(countries => {
        return Promise.resolve(this.getCountryByIdFromArray(id));
      });
    }

    return country;
  }

  private getCountryByIdFromArray(id: string): Promise<ICountry>{
    return Promise.resolve(
      this.countries.find(c => c.alpha3Code === id)
    );
  }
}
