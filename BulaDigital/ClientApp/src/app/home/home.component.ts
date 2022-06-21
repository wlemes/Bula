import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { retry } from 'rxjs/operators'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public bulas: Content[] = [];

  public http: HttpClient;
  public pesquisa: string;
  public totalElements: string;

  filter: string;
  key = '';
  reverse = false;

  cabecalho = [
    { nome: 'Nome', exibe: true, label: 'nomeProduto' },
    { nome: 'Fabricante', exibe: true, label: 'razaoSocial' },
    { nome: 'Data de Publicação', exibe: true, label: 'data' },
    { nome: 'Bula Paciente', exibe: true, label: '' },
    { nome: 'Bula Profissional', exibe: true, label: '' }];

  pagina: number = 1;
  total: number = 0;
  itensPorPagina: number = 10;
  loading = false;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
  }

  pesquisar() {

    this.loading = true;

    this.http.get<Bula>(`https://bula.vercel.app/pesquisar?nome=${this.pesquisa}&pagina=${this.pagina}`)
      .pipe(retry(10))
      .subscribe(result => {
        this.bulas = result.content;
        this.total = result.totalElements;

      }, error => console.error(error), () => {
        this.loading = false
      });
  }


  filtroCabecalho(): any[] {
    return this.cabecalho.filter(c => c.exibe === true);
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  pageChange(page: number) {
    this.pagina = page;
    this.pesquisar();
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
  totalElements: string;
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
