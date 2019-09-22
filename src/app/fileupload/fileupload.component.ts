import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { UploadserviceService } from '../services/uploadservice.service';

import { fromEvent, Observable, Subscription,  } from 'rxjs';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  uploadFG:FormGroup;
  errorMessage:string;
  firstTime = Date.now();
  lasttime= Date.now();
  show:true;
  subscription:Subscription;

  @ViewChild('uploadfile', {static: false}) uUpload: ElementRef;

  //Cache
  fileSave:any;
  cacheM: Map<string, File> = new Map<string, File>();
  showText:any;

  constructor (private uploadFB : FormBuilder, private uploadService:UploadserviceService){ 
  }

  ngOnInit() {
      this.createUploadForm();
      const form = document.getElementById('uploadForm');

      this.subscription = fromEvent(form , 'submit' ).subscribe((event) => {
      this.cacheM.set(this.fileSave.name,this.fileSave);
      this.cacheM.forEach((key,value)=>{ console.log('key:'+key,'value:'+value) });

    });

  }

  openFile(myData)
  {
    const formDatasend = new FormData();
    myData.append('file', myData);

    /*let response = this.uploadService.uploadLocal(myData).subscribe(result => console.log(result),
    errMess => { this.errorMessage= <any>errMess;} );*/
  }

  createUploadForm(): void{
    this.uploadFG = this.uploadFB.group ({
      uploadfile : ['', [Validators.required]] 
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileSave = event.target.files[0];
      this.uploadFG.get('uploadfile').setValue(this.fileSave);
       console.log('test',this.fileSave);
    }
  }
  

  onUploadSubmit(){

    if(this.uploadFG.valid) {

      const formData = new FormData();
      formData.append('file', this.uploadFG.get('uploadfile').value);      
      /*
      //code to send file to backend
      let response = this.uploadService.upload(formData).subscribe(result => console.log(result),
      errMess => { this.errorMessage= <any>errMess;} );*/

      this.uploadFG.reset(
          {  uploadfile: [' ']  }          
      );
      this.uUpload.nativeElement.value = null;          
      
      //console.log(response);
      //this.uploadService.upload(formData,localStorage.getItem('token'))
      //console.log(formData);
    }
    else {
      this.errorMessage = "Incorrect file type!";
    }
  } 

}
