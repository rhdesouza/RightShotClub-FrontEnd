import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PrecificacaoProdutoHistoricoDTO } from 'src/app/model/dto/PrecificacaoProdutoHistoricoDTO';

@Component({
  selector: 'app-historico-precificacao',
  templateUrl: './historico-precificacao.component.html',
  styleUrls: ['./historico-precificacao.component.css']
})
export class HistoricoPrecificacaoComponent implements OnInit {
  public produto!: FormGroup;

  displayedColumns: string[] = ['lastModifiedBy', 'lastModifiedDate', 'markupReferncia', 'valorMedioNF','valorProdutoSugerido','valorProduto'];
  dataSource = new MatTableDataSource(this.historico.historicoPrecificacao);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public historico: PrecificacaoProdutoHistoricoDTO,
    private dialogRef: MatDialogRef<HistoricoPrecificacaoComponent>,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log(this.historico);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private createForm() {
    this.produto = this.formBuilder.group({
      cod_produto: new FormControl(this.historico.produto.codProduto),
      descricao: new FormControl(this.historico.produto.descricao),
    })
  }

  public fechar(){
    this.dialogRef.close();
  }


}
