import { Component, OnInit } from '@angular/core';
import { ContriesService } from 'src/app/services/contries.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  country: ICountry;

  constructor(
    public countriesService: ContriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.countriesService.getCountryById(id)
      .then(country => {
        let res: any;

        if (!country) {
          res = this.router.navigateByUrl('/');
        } else {
          this.country = country;
        }

        return res;
      });
  }

}
