import {Component,OnInit, Directive, Input, ViewChild} from '@angular/core';

@Directive({selector: 'pane'})
export class Pane {
  @Input() id !: string;
}

@Component({
  selector: 'app-view-child-comp',
  template: `No View`,
  styleUrls: ['./view-child-comp.component.css']
})
export class ViewChildCompComponent implements OnInit {

  @ViewChild(Pane)
  set pane(v: Pane) {
    setTimeout(() => { this.selectedPane = v.id; }, 0);
  }
  selectedPane: string = '';
  shouldShow = true;
  toggle() { this.shouldShow = !this.shouldShow; }

  ngOnInit() {
  }

}

@Directive({selector: 'child-directive'})
class ChildDirective {
}

@Component({selector: 'someCmp',template: ``})
export class SomeCmp {
  @ViewChild(ViewChildCompComponent) child : ViewChildCompComponent;

  ngAfterViewInit() {
    // child is set
  }
}