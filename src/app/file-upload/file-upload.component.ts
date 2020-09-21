import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  template: `
    <div style="height:300px;margin-top: 20px; max-width: 50%;top:50px">
      <!-- <div class="container" style="margin-top: 20px; max-width: 50%;"> -->
      <div style="height:200px; width: 200px; background: gray">
        <button (click)="submit()">Upload Image</button>
        <img src="{{imgUrl}}">

      </div>
    </div>
  `,
  styles: []
})
export class FileUploadComponent implements OnInit {
  progress = 0;
  upload = {}
  file: File;
  imgUrl = 'http://210.114.91.205:8042/instances/3a03bba1-b1e897b8-4a0599a6-02c36bb5-ad5f59c0/preview';

  success = false;

  constructor( private http: HttpClient ) {
  }
  ngOnInit() {
  }

  async submit() {
    this.downloadImage(this.imgUrl)
  }
  downloadImage(url: string) {
    fetch(url).then((res)=>{
      return res.blob();
    }).then(blob =>{
      const imageFile = {images:new File([blob], 'myImageFile.PNG',{type:"image/png"})}
      const imageData = toFormData(imageFile);
      console.log('--imageData', imageData);
      this.uploadImage(imageData);


      // let fileReader: FileReader = new FileReader();
      // fileReader.onload = (event)=> {
      //   console.log('---> read file', event, event.target['result'])
      //   const formData = new FormData();
      //   formData.append( 'images', event.target['result'])
      //   this.uploadImage(formData);
      //
      // }
      // fileReader.readAsDataURL(blob);
    })

  }

  private uploadImage(formData: FormData) {
    this.http.post('http://localhost:3000/multiple-upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
    ).subscribe(res => {
      this.progress = 0;
      this.success = true;
    });
  }
}

export function toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
