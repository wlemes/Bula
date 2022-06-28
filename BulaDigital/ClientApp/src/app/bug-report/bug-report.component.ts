import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-bug-report',
	templateUrl: './bug-report.component.html',
})

export class BugReportComponent {
	public http: HttpClient;
	form = new FormGroup({
		message: new FormControl(''),
		attachments: new FormControl('')
	});
	fileHolder: File | null;

	constructor(http: HttpClient, private spinner: NgxSpinnerService) {
		this.http = http;
		this.fileHolder = null;
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
//		formData.append('attachments', this.fileHolder, this.fileHolder.name);
		this.http.post('/api', formData, {
			headers: new HttpHeaders({
				'enctype': 'multipart/form-data',
			})
		}).subscribe(
			data => {
				this.spinner.hide();
				console.log(data);
				alert('Obrigado por reportar um bug!');
			}
		);
	}

	onFileChange(event) {
		this.fileHolder = event.target.files[0];
	}
}
