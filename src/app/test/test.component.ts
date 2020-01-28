import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../HttpComponents/downloadfile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [HttpClient]
})
export class TestComponent implements OnInit {
  evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
  constructor(private service:DownloadFileService ) { }

  ngOnInit() {
  }

  DownloadFile($event:MouseEvent){

    this.service.DownloadFile("http://localhost:51632/export/addresses?softGroup=S55&mapClass=1d").;

    // debugger;
    // const url = window.URL.createObjectURL(blob);


    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "data.pascal";
    // link.click();

    // window.URL.revokeObjectURL(url);
  }

}