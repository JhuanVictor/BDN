import { ToastyConfig } from 'ng2-toasty';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private toastyConfig: ToastyConfig){
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'bottom-left';
  }

  title = 'bdn';
}
