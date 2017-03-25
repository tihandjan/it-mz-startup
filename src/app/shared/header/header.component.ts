import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuOpen: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.menuOpen.emit('lol');
    console.log('no oop!')
  }

}
