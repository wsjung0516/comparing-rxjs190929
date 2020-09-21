import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-upload-process',
  template: `
    <div class="file-drop-area">
      <span class="fake-btn">Choose file</span>
      <span class="file-msg">{{file ? file.name : 'or drag and drop file here' }}</span>
      <input class="file-input" type="file">
    </div>
    <app-progress [progress]="progress"></app-progress>

  `,
  styles: [`
    @import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);

    /*// https://codepen.io/Saminou24/pen/kXEYGB*/
    .file-drop-area {
      border: 1px dashed #7c7db3;
      border-radius: 3px;
      position: relative;
      width: 450px;
      max-width: 100%;
      margin: 0 auto;
      padding: 26px 20px 30px;
      -webkit-transition: 0.2s;
      transition: 0.2s;
    }

    .file-drop-area.is-active {
      background-color: #3F4069;
    }

    .fake-btn {
      background-color: #3F4069;
      border: 1px solid #9E9EC4;
      border-radius: 3px;
      padding: 8px 15px;
      margin-right: 8px;
      font-size: 12px;
      text-transform: uppercase;
    }

    .file-msg {
      font-size: small;
      font-weight: 300;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      max-width: calc(100% - 130px);
      vertical-align: middle;
    }

    .file-input {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      cursor: pointer;
      opacity: 0;
    }

    .file-input:focus {
      outline: none;
    }


  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadProcessComponent,
      multi: true
    }
  ],
})
export class UploadProcessComponent implements OnInit {
  @Input() progress;
  onChange: Function;
  private file: File | null = null;

  ngOnInit() {
  }

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

}
