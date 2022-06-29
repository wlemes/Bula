import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { retry } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbdModalContent } from '../bug-report/bug-report.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	public bulas: Content[] = [];
	public http: HttpClient;
	public pesquisa: string;
	public totalElements: string;
	public apr: Medicamento[] = [];

	filter: string;
	key = '';
	reverse = false;

	cabecalho = [
		{ nome: 'Nome', exibe: true, label: 'nomeProduto' },
		{ nome: 'Fabricante', exibe: true, label: 'razaoSocial' },
		{ nome: 'Data de Publicação', exibe: true, label: 'data' },
		{ nome: 'Bula Paciente', exibe: true, label: '' },
		{ nome: 'Bula Profissional', exibe: true, label: '' }];

	cabecalhoMorenfo = [
		{ nome: 'Apresentação', exibe: true, label: 'apresentacao' },
		{ nome: 'Vias de Administração', exibe: true, label: 'viasAdministracao' },
		{ nome: 'IFA Único', exibe: true, label: 'ifaUnico' },
		{ nome: 'Conservação', exibe: true, label: 'conservacao' },
		{ nome: 'Restrição de Prescrição', exibe: true, label: 'restricaoPrescricao' },
		{ nome: 'Restrição de Uso', exibe: true, label: 'restricaoUso' },
		{ nome: 'Destinação', exibe: true, label: 'destinacao' },
		{ nome: 'Restrição de Hospitais', exibe: true, label: 'restricaoHospitais' },
		{ nome: 'Tarja', exibe: true, label: 'tarja' },
		{ nome: 'Ativa', exibe: true, label: 'ativa' }
	]

	pagina: number = 1;
	total: number = 0;
	numProcesso: string;
	itensPorPagina: number = 10;
	loading = false;
	numero: number = 0;
	mostrar: boolean = false;

	constructor(http: HttpClient, private spinner: NgxSpinnerService, @Inject('BASE_URL') baseUrl: string, private modalService: NgbModal) {
		this.http = http;
	}

	abrir(Status: string, Mensagem: string) {
		const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.Status = Status;
		modalRef.componentInstance.Mensagem = Mensagem;
	}

	pesquisar() {

		this.loading = true;
		this.spinner.show();
		this.http.get<Bula>(`https://bula.vercel.app/pesquisar?nome=${this.pesquisa}&pagina=${this.pagina}`)
			.pipe(retry(10))
			.subscribe(
				result => {
					if (this.pesquisa == null) {
						this.abrir('Erro', 'Por favor, digite o nome de um medicamento para pesquisar.');
					}
					else if (result.numberOfElements == 0) {
						this.spinner.hide();
						this.abrir('Erro', 'Nenhum medicamento encontrado.');
					}
					else {
						this.bulas = result.content;
						this.total = result.totalElements;
						this.numProcesso = result.content[this.numero].numProcesso;
					}
				}, error => console.error(error), () => {
					this.spinner.hide();
				});

	}

	getMoreInfo(numProcesso: string) {
		this.http.get<Apresentacoes>(`https://bula.vercel.app/medicamento/${numProcesso}`)
			.pipe(retry(10))
			.subscribe(result => {
				this.apr = result.content;
				this.mostrar = true;
				console.log(this.apr);
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

export interface Medicamento {
	codigo: number;
	apresentacao: string;
	formasFarmaceuticas: string[];
	numero: number;
	tonalidade: string;
	dataPublicacao: string;
	validade: string;
	tipoValidade: string;
	registro: string;
	principiosAtivos: string[];
	complemento: string;
	embalagemPrimaria: Embalagem;
	embalagemSecundaria: Embalagem;
	embalagemSecundariaTodas: Embalagem[];
	envoltorios: Envoltorio[];
	acessorios: Acessorio[];
	acondicionamento: string;
	marcas: Marca[];
	fabricantesNacionais: Fabricante[];
	fabricantesInternacionais: Fabricante[];
	viasAdministracao: string[];
	ifaUnico: boolean;
	conservacao: string[];
	restricaoPrescricao: string[];
	restricaoUso: string[];
	destinacao: string[];
	restricaoHospitais: string;
	tarja: string;
	medicamentoReferencia: string;
	apresentacaoFracionada: string;
	dataVencimentoRegistro: string;
	ativa: boolean;
	inativa: boolean;
	emAnalise: boolean;
}

export interface Apresentacoes {
	content: Medicamento[];
	apresentacao: string;
	viasAdministracao: string[];
	ifaUnico: boolean;
	conservacao: string[];
	restricaoPrescricao: string[];
	restricaoUso: string[];
	destinacao: string[];
	restricaoHospitais: string;
	tarja: string;
	ativa: boolean;
}

export interface Embalagem {
	tipo: string;
	observacao: string;
}

export interface Envoltorio {
	tipo: string;
	observacao: string;
}

export interface Acessorio {
	tipo: string;
	observacao: string;
}

export interface Fabricante {
	fabricante: string;
	cnpj: string;
	pais: string;
	uf: string;
	cidade: string;
	etapaFabricacao: string;
}

export interface Marca {
	tipo: string;
	observacao: string;
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
