import { Injectable } from '@angular/core';
import { Veiculo } from '../models/Veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  constructor() { }

  listarVeiculos(): Veiculo[] {
    return JSON.parse(sessionStorage.getItem('veiculos'));
  }
  atualizaVeiculos(veiculos: Veiculo[]): void {
    sessionStorage.setItem('veiculos', JSON.stringify(veiculos));
  }

  cadastrarVeiculo(veiculo: Veiculo): Veiculo {

    let veiculos: Veiculo[] = this.listarVeiculos() || [];
    veiculos.push(veiculo);
    this.atualizaVeiculos(veiculos);
    return veiculo;
  }

  excluirVeiculo(veiculo: Veiculo) {
    let indice: number = this.getIndiceVeiculo(veiculo);
    if (indice >= 0) {
      let veiculos: Veiculo[] = this.listarVeiculos();
      veiculos.splice(indice, 1);
      this.atualizaVeiculos(veiculos);
    }
  }

  editarVeiculo(veiculo: Veiculo) {
    let indice: number = this.getIndiceVeiculo(veiculo);
    let veiculos: Veiculo[] = this.listarVeiculos();
    if (indice >= 0) {
      veiculos[indice] = veiculo;
    }
    this.atualizaVeiculos(veiculos);
  }

  private getIndiceVeiculo(veiculo: Veiculo) {
    let veiculos: Veiculo[] = this.listarVeiculos();
    let indice: number = veiculos.findIndex(v => {
      return v.id === veiculo.id;
    });
    return indice;
  }
}
