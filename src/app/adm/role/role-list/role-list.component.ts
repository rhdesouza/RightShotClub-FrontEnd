import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { AdmService } from '../../adm.service';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  @ViewChild('TableTwoPaginator', { static: true }) tableTwoPaginator!: MatPaginator;
  @ViewChild('TableTwoSort', { static: true }) tableTwoSort!: MatSort;

  colunasRoles: string[] = [
    'id',
    'modulo',
    'subModulo',
    'acao',
    'name',
  ];

  public roleList;

  constructor(
    private admService: AdmService,
    public dialog: MatDialog,
    private snakeBarService: SnakeBarService
  ) { }

  ngOnInit(): void {
    this.buscarTodasRoles();
  }

  public addRole() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';

    const modal = this.dialog.open(AddRoleComponent, dialogConfig)
      .afterClosed().subscribe(rs => {
        if (rs != 'error' && !!rs) {
          const datas = this.roleList.data;
          datas.push(rs);
          this.roleList.data = datas;
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
        } else if (rs == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })
  }

  private buscarTodasRoles() {
    this.admService.getAllRoles().subscribe((retorno) => {
      this.roleList = new MatTableDataSource(retorno);
      this.roleList.paginator = this.tableTwoPaginator;
      this.roleList.sort = this.tableTwoSort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.roleList.filter = filterValue.trim().toLowerCase();
  }

}
