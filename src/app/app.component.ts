import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    
  }
  title = 'abuka';

  constructor(private authService:AuthenticationService){
  } 
}
 