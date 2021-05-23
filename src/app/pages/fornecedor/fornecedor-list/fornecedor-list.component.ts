import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { FornecedorDTO } from 'src/app/model/dto/FornecedorDTO';
import { Fornecedor } from 'src/app/model/entity/Fornecedor';
import { FornecedorService } from '../fornecedor.service';
import { AddFornecedorComponent } from './add-fornecedor/add-fornecedor.component';

import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { PageVO } from 'src/app/model/vo/pageVO';
import { GenericValidator } from 'src/app/common/validatorsForm/genericValitadors';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'id',
    'razao_social',
    'nome_fantasia',
    'cpf_cnpj',
    'telefone',
    'situacao',
    'acoes'
  ];

  public fornecedorDtoList: FornecedorDTO[] = [];
  public resultsLength = 0;
  private changedQuery: Boolean = false;
  public filterForm!: FormGroup;


  public fornecedoresList!: MatTableDataSource<Fornecedor>;

  constructor(
    private fornecedoresService: FornecedorService,
    public snakeBarService: SnakeBarService,
    public modalService: ModalService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      razao_social: new FormControl(null, [Validators.minLength(5)]),
      nome_fantasia: new FormControl(null, [Validators.minLength(5)]),
      cpf_cnpj: new FormControl(null, [GenericValidator.validaCpfCnpj]),
    })
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {

          this.changedQuery = this.resultsLength == 0 ? true : false;

          return this.fornecedoresService.getAllFornecedorDTOPageable(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.changedQuery, this.filterForm.value
          );
        }),
        map((pageVO: PageVO) => {
          if (this.changedQuery)
            this.resultsLength = pageVO.totalElements || 0;

          return pageVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        data => this.fornecedorDtoList = data
      );
  }

  public filtrar() {
    if (!this.filterForm.valid)
      return;

    merge(this.filterForm.value)
      .pipe(
        take(0),
        startWith({}),
        switchMap(() => {
          this.changedQuery = true;

          return this.fornecedoresService.getAllFornecedorDTOPageable(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.changedQuery, this.filterForm.value
          );
        }),
        map((pageVO: PageVO) => {
          this.resultsLength = pageVO.totalElements || 0;

          return pageVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        data => this.fornecedorDtoList = data
      );
  }

  public limparFiltro() {
    this.filterForm.controls.razao_social.setValue(null);
    this.filterForm.controls.nome_fantasia.setValue(null);
    this.filterForm.controls.cpf_cnpj.setValue(null);
    this.filtrar();
  }

  public adicionarFornecedor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';

    this.modalService.openModal(AddFornecedorComponent, dialogConfig)
      .afterClosed().subscribe(data => {
        if (data != 'error' && !!data) {
          this.filtrar();
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
        } else if (data == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })

  }

  public editarFornecedor(fornecedor: Fornecedor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.data = fornecedor.id;

    this.modalService.openModal(AddFornecedorComponent, dialogConfig)
      .afterClosed().subscribe(rs => {
        if (rs != 'error' && !!rs) {
          this.filtrar();
          this.snakeBarService.openSnackBarSuccess("Registro editado com sucesso!");
        } else if (rs == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao editar registro.');
        }
      })
  }

  getCpfCnpjMask(): string {
    let lengthCpfCnpj = this.filterForm.value?.cpf_cnpj?.replace(/[^\d]+/g, '').length;

    if (lengthCpfCnpj == 11) {
      return '000.000.000-009';
    } else if (lengthCpfCnpj == 14) {
      return '00.000.000/0000-00';
    }
    return '';
  }

}
