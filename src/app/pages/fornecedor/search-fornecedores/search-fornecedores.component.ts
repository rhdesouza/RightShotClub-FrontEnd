import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fornecedor } from 'src/app/model/entity/Fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-search-fornecedores',
  templateUrl: './search-fornecedores.component.html',
  styleUrls: ['./search-fornecedores.component.css']
})
export class SearchFornecedoresComponent implements OnInit {
  colunas: string[] = [
    'id',
    'cpfCnpj',
    'razaoSocial',
    'situacao'
  ];

  public fornecedoresList: any;
  public linhaSelecionada: any;
  public fornecedorSelecionado: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private dialogRef: MatDialogRef<SearchFornecedoresComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public fornecedor: any,
    private fornecedorService:FornecedorService,
  ) {
    this.getAllFornecedores();
  }

  ngOnInit(): void {
    if (!!this.fornecedor){
      this.linhaSelecionada = this.fornecedor;
    }
    
  }

  private getAllFornecedores() {
    this.fornecedorService.getAllFornecedores().subscribe((retorno: Fornecedor[]) => {
      this.fornecedoresList = new MatTableDataSource(retorno);
      this.fornecedoresList.paginator = this.paginator;
      this.fornecedoresList.sort = this.sort;
    }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fornecedoresList.filter = filterValue.trim().toLowerCase();
  }

  public selecionar(linha: any) {
    this.linhaSelecionada = (this.linhaSelecionada == linha.id) ? null : linha.id;
    this.fornecedorSelecionado = !!this.linhaSelecionada ? linha : null;
  }

  public salvar() {
    this.dialogRef.close(this.fornecedorSelecionado);
  }

  public fechar() {
    this.dialogRef.close("close");
  }
}
