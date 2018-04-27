import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as $$ from 'materialize-css';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
