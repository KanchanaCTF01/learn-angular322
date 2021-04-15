import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  form: FormGroup;
  exchangeRates;
  convert;
  base;
  
  constructor(private httpClient : HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      baseRate: '',
    });
   }

  ngOnInit(): void {
      this.httpClient.get('http://api.exchangeratesapi.io/v1/latest?access_key=d39f178c2459bc9a4be4c8db189d8107&format=1').subscribe(result => {
      this.exchangeRates = result as any;
    });
  }

  covertFxRate() {
    this.base=this.form.value;
    this.convert = this.base.baseRate/this.exchangeRates.rates.THB;
    return this.convert;
  }
}