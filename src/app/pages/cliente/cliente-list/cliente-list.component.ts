import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { Cliente } from 'src/app/model/entity/Cliente';
import { PageableVO } from 'src/app/model/vo/pageableVO';
import { ClienteService } from '../cliente.service';
import { AddClienteComponent } from './add-cliente/add-cliente.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'id',
    'nome',
    'email',
    'telefone',
    'situacao',
    'created_date',
    'acoes'
  ];

  public clientesList: Cliente[] = [];
  public resultsLength = 0;
  public filterForm!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private snakeBarService: SnakeBarService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      nome: new FormControl(null, [Validators.minLength(5)]),
      email: new FormControl(null),
    })
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.clienteService.getClientePageable(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.filterForm.value
          );
        }),
        map((pageableVO: PageableVO) => {
          this.resultsLength = pageableVO.totalElements || 0;

          return pageableVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        data => this.clientesList = data
      );
  }

  public filtrar() {
    if (!this.filterForm.valid)
      return;

    //let obs: Observable<any> = observableOf(this.filterForm.value)

    merge(observableOf(this.filterForm.value))
      .pipe(
        take(0),
        startWith({}),
        switchMap(() => {
          return this.clienteService.getClientePageable(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.filterForm.value
          );
        }),
        map((pageableVO: PageableVO) => {
          this.resultsLength = pageableVO.totalElements || 0;

          return pageableVO.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(
        (data: Cliente[]) => this.clientesList = data
      );
  }

  public limparFiltro() {
    this.filterForm.controls?.['nome'].setValue(null);
    this.filterForm.controls?.['email'].setValue(null);
    this.filtrar();
  }

  public adicionarCliente() {
    this.modalService.openModal(AddClienteComponent).afterClosed().subscribe(data => {
      if (data != 'error' && !!data) {
        this.filtrar();
        this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
      } else if (data == 'error') {
        this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
      }
    })
  }

  editar(row: Cliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = row.id;

    this.modalService.openModal(AddClienteComponent, dialogConfig).afterClosed().subscribe(rs => {
      if (rs != 'error' && !!rs) {
        this.filtrar();
        this.snakeBarService.openSnackBarSuccess("Registro editado com sucesso!");
      } else if (rs == 'error') {
        this.snakeBarService.openSnackBarError('Erro ao editar registro.');
      }
    })
  }



}
