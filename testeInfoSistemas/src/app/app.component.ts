import { Component, OnInit } from '@angular/core';
import { Veiculo } from './models/Veiculo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  veiculosInit: Veiculo[] = [{
    "id": 1,
    "modelo": "Civic LX",
    "ano": "2013",
    "placa": "CIV-1111",
    "chassi": "11111111",
    "renavam": "19999991",
    "marca": "Honda"
  }, {
    "id": 2,
    "modelo": "Fluence",
    "ano": "2013",
    "placa": "FFF-2222",
    "chassi": "22222222",
    "renavam": "29999992",
    "marca": "Renault"
  }, {
    "id": 3,
    "modelo": "Fit",
    "ano": "2016",
    "placa": "FIT-3333",
    "chassi": "33333333",
    "renavam": "39999993",
    "marca": "Honda"
  }, {
    "id": 4,
    "modelo": "Uno",
    "ano": "2011",
    "placa": "UNO-4444",
    "chassi": "44444444",
    "renavam": "49999994",
    "marca": "Fiat"
  }, {
    "id": 4,
    "modelo": "Kwid",
    "ano": "2018",
    "placa": "KWI-4444",
    "chassi": "44444444",
    "renavam": "49999994",
    "marca": "Renault"
  }];
  ngOnInit() {
    if (!sessionStorage.getItem('veiculos'))
      sessionStorage.setItem('veiculos', JSON.stringify(this.veiculosInit));
  }

}
