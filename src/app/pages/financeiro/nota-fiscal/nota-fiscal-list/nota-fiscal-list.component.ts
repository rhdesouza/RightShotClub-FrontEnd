import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { NotaFiscal } from 'src/app/model/entity/NotaFiscal';
import { FinanceiroService } from '../../financeiro.service';



@Component({
  selector: 'app-nota-fiscal-list',
  templateUrl: './nota-fiscal-list.component.html',
  styleUrls: ['./nota-fiscal-list.component.css']
})
export class NotaFiscalListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'id',
    'numero',
    'cpnjFornecedor',
    'fornecedor',
    'valorTotal',
    'situacao',
    'acoes'
  ];

  public notaFiscalList: any;

  constructor(
    private router: Router,
    private financeiroService: FinanceiroService,
    private snackeBarService: SnakeBarService
  ) { }

  ngOnInit(): void {
    this.getAllNotaFiscal();
  }

  public adicionarNotaFiscal() {
    this.router.navigate(['financeiro/nota-fiscal-list/add-nota-fiscal']);
  }

  private getAllNotaFiscal() {
    this.financeiroService.getAllNotaFiscal().subscribe((retorno: NotaFiscal[]) => {
      this.notaFiscalList = new MatTableDataSource(retorno);
      this.notaFiscalList.paginator = this.paginator;
      this.notaFiscalList.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.notaFiscalList.filter = filterValue.trim().toLowerCase();
  }

  public gerarEstoque(idNotaFiscal: number) {
    this.financeiroService.gerarEstoquePorIdNF(idNotaFiscal)
      .subscribe((rs: NotaFiscal) => {
        let datas: NotaFiscal[] = this.notaFiscalList.data;
        datas.forEach((element: NotaFiscal) => {
          if (element.id == rs.id) {
            element.situacao = rs.situacao;
          }
        });
        this.notaFiscalList.data = datas;
        this.snackeBarService.openSnackBarSuccess(`Itens da Nota Fiscal nº ${rs.numero} disponíveis em estoque.`);
      })
  }

  public editarNotaFiscal(idNotaFiscal: number) {
    this.router.navigate(['financeiro/nota-fiscal-list/nota-fiscal/edit'], { queryParams: { idNotaFiscal: idNotaFiscal } });
  }
}
