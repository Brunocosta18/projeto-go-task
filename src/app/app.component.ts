import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { MainContent } from './components/main-content/main-content';


@Component({
  selector: 'app-root',
  imports: [Header, MainContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
 
  
}
