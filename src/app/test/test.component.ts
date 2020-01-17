import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
  constructor() { }

  ngOnInit() {
  }

}