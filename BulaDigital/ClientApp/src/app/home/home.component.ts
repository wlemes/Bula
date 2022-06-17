import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public bulas: Content[] = [];
  public http: HttpClient;
  public pesquisa: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
  }

  pesquisar() {
    console.log("pesquisar ", this.pesquisa);
    this.http.get<Bula>(`https://bula.vercel.app/pesquisar?nome=${this.pesquisa}&pagina=1`).subscribe(result => {
      this.bulas = result.content;
      console.log('result', result);
    }, error => console.error(error));
  }


}

export interface Content {
  idProduto: number;
  numeroRegistro: string;
  nomeProduto: string;
  expediente: string;
  razaoSocial: string;
  cnpj: string;
  numeroTransacao: string;
  data: Date;
  numProcesso: string;
  idBulaPacienteProtegido: string;
  idBulaProfissionalProtegido: string;
}

export interface Bula {
  content: Content[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  sort?: any;
  size: number;
  number: number;
}
