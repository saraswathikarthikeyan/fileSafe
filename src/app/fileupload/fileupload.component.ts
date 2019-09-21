import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UploadserviceService } from '../services/uploadservice.service';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  uploadFG:FormGroup;
  errorMessage:string;
  timeInterval:number = 10000;
  firstTime = Date.now();
  lasttime= Date.now();
  MINUTES_UNITL_AUTO_LOGOUT = 1 // in mins
  CHECK_INTERVAL = 15000 // in ms
  
  constructor (private uploadFB : FormBuilder, private uploadService:UploadserviceService){ 
  }

  ngOnInit() {
    this.createUploadForm();
  }

  createUploadForm(): void{
    this.uploadFG = this.uploadFB.group ({
      uploadfile : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]] 
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadFG.get('uploadfile').setValue(file);

      console.log('test',file);
    }
  }

  onUploadSubmit(){

    if(this.uploadFG.valid) {

      const formData = new FormData();
      formData.append('file', this.uploadFG.get('uploadfile').value);

      let response = this.uploadService.upload(formData).subscribe(result => console.log(result),
      errMess => { this.errorMessage= <any>errMess;} );

      this.uploadFG.reset({
        uploadfile: ''});
      
      //console.log(response);
      //this.uploadService.upload(formData,localStorage.getItem('token'))
      //console.log(formData);
    }
    else {
      this.errorMessage = "Incorrect file type!";
    }
  }

}
