import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.css']
})
export class TagFilterComponent implements OnInit {

  @Input() titulo: string = "Filtro";

  constructor() { }

  ngOnInit(): void {
  }

}
