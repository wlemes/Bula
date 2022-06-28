import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consulta-categoria',
  templateUrl: './consulta-categoria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class categoriaComponent {
  public bulas: Content[] = [];
  public http: HttpClient;
  public numCategoria: number = 0;

  key = '';
  reverse = false;
  p: number = 1;
  loading: boolean = false;
  filter: string;

  constructor(http: HttpClient, private spinner: NgxSpinnerService , @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
  }

  cabecalho = [
    { nome: 'Nome', exibe: true, label: 'nomeProduto' },
    { nome: 'Fabricante', exibe: true, label: 'razaoSocial' },
    { nome: 'Data de Publicação', exibe: true, label: 'data' },
    { nome: 'Bula Paciente', exibe: true, label: '' },
    { nome: 'Bula Médica', exibe: true, label: '' },];


  pagina: number = 1;
  total: number = 0;
  itensPorPagina: number = 10;

  listarMedicamentos() {
    this.loading = true;
    this.spinner.show();

    this.http.get<Bula>(`https://bula.vercel.app/medicamentos?categoria=${this.numCategoria}&pagina=${this.pagina}`).subscribe(result => {
      this.bulas = result.content;
      this.total = result.totalElements;
      // this.bulas.length = result.totalElements;
    }, error => {
      console.log(error);
    }
    ).add(() => {
      this.loading = false;
      this.spinner.hide();
    }
    );
  }

  filtroCabecalho(): any[] {
    return this.cabecalho.filter(cabecalho => cabecalho.exibe);
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  pageChange(page: number) {
    this.pagina = page;
    this.listarMedicamentos();
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

