import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public cadastroNotaFiscal() {
    this.router.navigate(["financeiro/nota-fiscal-list"]);
  }

  public precificacaoProduto() {
    this.router.navigate(["financeiro/precificacao"]);
  }

  public vendaProduto() {
    this.router.navigate(["financeiro/vendas"]);
  }

}
