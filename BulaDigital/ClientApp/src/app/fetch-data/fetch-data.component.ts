import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {

  key = '';
  reverse = false;

  cabecalho = [
    { nome: 'Nome', exibe: true, label: 'nomeProduto' },
    { nome: 'Fabricante', exibe: true, label: 'razaoSocial' },
    { nome: 'Data', exibe: true, label: 'data' },
    { nome: 'Download', exibe: true, label: '' }];

  itensPorPagina: number = 10;


  constructor() {
  }


  filtroCabecalho(): any[] {
    return this.cabecalho.filter(c => c.exibe === true);
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}



