import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public dashboardService: DashboardService,
    public router: Router,
  ) {
    /* this.setGrafAirsoft(); */
  }

  ngOnInit(): void {
    this.setGrafClientes();
    this.setGrafFornecedores();
  }


  /**
   * Gráfico quantitativo Airsdft
   */
  public grafAirsoftLabels: any[] = [];
  public grafAirsoftData: any[] = [0, 0, 0, 0, 0, 0];
  public grafAirsoftType = 'doughnut';
  public totalGrafAirsoft: any = 0;

  public irParaAirsoft() {
    this.router.navigate(["airsoft-list"]);
  }


  /**
   * Gráfico quantitativo Clientes
   */
  public grafClientesLabels: any[] = [];
  public grafClientesData: any[] = [0, 0, 0, 0, 0, 0];
  public grafClientesType = 'doughnut';
  public totalGrafClientes: any = 0;

  public setGrafClientes() {
    this.dashboardService.getQtdClientePorSituacaoGraf().subscribe(rs => {
      this.grafClientesLabels = this.trataQuantitativoGrafDoughnut(rs)[0];
      this.grafClientesData = this.trataQuantitativoGrafDoughnut(rs)[1];
      this.totalGrafClientes = this.trataQuantitativoGrafDoughnut(rs)[2];
    })
  }

  public irParaClientes() {
    this.router.navigate(["cliente-list"]);
  }

  /**
   * Gráfico quantitativo Fornecedores
   */
  public grafFornecedoresLabels: any[] = [];
  public grafFornecedoresData: any[] = [0, 0, 0, 0, 0, 0];
  public grafFornecedoresType = 'doughnut';
  public totalGrafFornecedores: any = 0;

  public setGrafFornecedores() {
    this.dashboardService.getQtdFornecedorPorSituacaoGraf().subscribe(rs => {
      this.grafFornecedoresLabels = this.trataQuantitativoGrafDoughnut(rs)[0];
      this.grafFornecedoresData = this.trataQuantitativoGrafDoughnut(rs)[1];
      this.totalGrafFornecedores = this.trataQuantitativoGrafDoughnut(rs)[2];
    })
  }

  public irParaFornecedores() {
    this.router.navigate(["fornecedor-list"]);
  }

  private trataQuantitativoGrafDoughnut(rs: []) {
    let situacao: any[] = [];
    let quantitativo: any[] = [];
    let total: number = 0;

    if (rs.length > 0) {
      rs.forEach(x => {
        situacao.push(`${x[0]} (${x[1]})`);
        quantitativo.push(x[1]);
        total += x[1];
      })
    } else {
      situacao.push('Sem registros para construção do gráfico.');
      quantitativo.push(0);
    }

    return [situacao, quantitativo, [total]]
  }


}
