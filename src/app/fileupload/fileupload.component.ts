import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UploadserviceService } from '../services/uploadservice.service';
import { fromEvent, Observable, Subscription, } from 'rxjs';
import { AutologoutService } from '../services/autologout.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  uploadFG: FormGroup;
  errorMessage: string;
  show: true;
  subscription: Subscription;

  @ViewChild('uploadfile', { static: false }) uUpload: ElementRef;

  //Cache
  fileSave: any;
  cacheM: Map<string, File> = new Map<string, File>();
  showText: any;

  constructor(private uploadFB: FormBuilder, private uploadService: UploadserviceService, private autoLogout :AutologoutService) {
  }

  ngOnInit() {
    this.createUploadForm();
    const form = document.getElementById('uploadForm');
    this.subscription = fromEvent(form, 'submit').subscribe((event) => {
      if (this.fileSave) {
        this.cacheM.set(this.fileSave.name, this.fileSave);
        this.cacheM.forEach((key, value) => { console.log('key:' + key, 'value:' + value) });
        this.fileSave ="";
      }
    });

    this.uploadService.fetchFiles().subscribe((data)=>{
      console.log(data);
    }, (err)=> console.log(err));

  }

  //Creates the upload form
  createUploadForm(): void {
    this.uploadFG = this.uploadFB.group({
      uploadfile: ['', [Validators.required]]
    });
  }

  //On file change stores the file
  onFileChange(event):void {
    if (event.target.files.length > 0) {
      this.fileSave = event.target.files[0];
      this.uploadFG.get('uploadfile').setValue(this.fileSave);
      console.log('test', this.fileSave);
    }
  }

//Method called on upload button click
  onUploadSubmit(): void {

    if (this.uploadFG.valid) {
      
      this.autoLogout.reset();//resets the logout timer.

      this.errorMessage ="";
      const formData = new FormData();
      formData.append('file', this.uploadFG.get('uploadfile').value);
      
      //code to send file to backend
     let response = this.uploadService.upload(formData).subscribe(result => console.log(result),
      errMess => { this.errorMessage= <any>errMess;} );

      this.uploadFG.reset(
        { uploadfile: [' '] }
      );
      this.uUpload.nativeElement.value = null;

    }
    else {
      this.errorMessage = "Incorrect file type!";
    }
  }

}
