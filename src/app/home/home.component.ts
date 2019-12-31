import { Component, OnInit, ɵConsole } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  loadedFeature='recipe';
  onNavigate(feature : string){
this.loadedFeature=feature;
  }

  constructor()
  {

  }

  ngOnInit()
  {
  }

  };
