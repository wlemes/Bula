import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-content',
	template: `
    <div class="modal-header">
      <h4 class="modal-title"><strong>{{Status}}!</strong></h4>
    </div>
    <div class="modal-body">
	  <p style="font-size: 14px;">{{Mensagem}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fechar</button>
    </div>
  `
})
export class NgbdModalContent {
	@Input() Status: string;
	@Input() Mensagem: string;

	constructor(public activeModal: NgbActiveModal) { }
}


@Component({
	selector: 'app-bug-report',
	templateUrl: './bug-report.component.html',
})

export class BugReportComponent {
	public http: HttpClient;
	form = new FormGroup({
		message: new FormControl('', [Validators.required]),
		attachments: new FormControl('', [Validators.required])
	});
	public valido: boolean = false;

	constructor(http: HttpClient, private spinner: NgxSpinnerService, private modalService: NgbModal) {
		this.http = http;
	}

	abrir(Status: string, Mensagem: string) {
		const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.Status = Status;
		modalRef.componentInstance.Mensagem = Mensagem;
	}

	// ngOnInit() {
	// 	window.addEventListener("beforeunload", function (e) {
	// 		var confirmationMessage = "\o/";
	// 		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	// 		return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
	// 	}
	// 	);
	// }
	
	onSubmit() {
		this.spinner.show();
		const formData = new FormData();
		formData.append('message', this.form.get('message').value);
		formData.append('attachments', this.form.get('attachments').value);
		this.http.post('/api', formData, {
			headers: new HttpHeaders({
				'enctype': 'multipart/form-data',
			})
		}).subscribe(
			data => {
				this.spinner.hide();
					if (data['ok'] == true) {
						this.abrir('Sucesso', 'Obrigado por reportar um bug!');
					}
					else {
						this.abrir('Erro', 'Ocorreu um erro ao reportar o bug!');
					}
				
				console.log(data);
			}
		);
	}

}
