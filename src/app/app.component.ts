import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  title = 'rightShot';

constructor(
  private router: Router,
){}
}
