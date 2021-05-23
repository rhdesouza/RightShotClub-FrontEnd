import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { User } from 'src/app/model/entity/User';
import { AdmService } from '../../adm.service';
import { AddRoleUserComponent } from '../add-role-user/add-role-user.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  colunas: string[] = [
    'id',
    'nomeCompleto',
    'name',
    'email',
    'situacao',
    'acoes'
  ];

  public userList;

  constructor(
    private admService: AdmService,
    public dialog: MatDialog,
    private snakeBarService: SnakeBarService
  ) { }

  ngOnInit(): void {
    this.buscarTodosUsuarios();
  }

  private buscarTodosUsuarios() {
    this.admService.getAllUsers().subscribe(retorno => {
      this.userList = new MatTableDataSource(retorno);
      this.userList.paginator = this.paginator;
      this.userList.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
  }

  public addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';

    const modal = this.dialog.open(AddUserComponent, dialogConfig)
      .afterClosed().subscribe(rs => {
        if (rs != 'error' && !!rs) {
          const datas = this.userList.data;
          datas.push(rs);
          this.userList.data = datas;
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
        } else if (rs == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })
  }

  public disabledUser(idUser: number) {
    this.admService.desativarUser(idUser)
      .subscribe(user => {
        const datas: User[] = this.userList.data;
        datas.forEach(element => {
          if (element.id == user.id) {
            element.situacao = user.situacao;
          }
        });
        this.userList.data = datas;
        this.snakeBarService.openSnackBarSuccess("Registro editado com sucesso!")
      })
  }

  public addRoleUser(idUser) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '75%';
    dialogConfig.data = idUser;

    const modal = this.dialog.open(AddRoleUserComponent, dialogConfig)
      .afterClosed().subscribe(rs => {
        if (rs != 'error' && !!rs) {
          /* const datas = this.userList.data;
          datas.push(rs);
          this.roleList.data = datas; */
          this.snakeBarService.openSnackBarSuccess("Registro salvo com sucesso!");
        } else if (rs == 'error') {
          this.snakeBarService.openSnackBarError('Erro ao salvar registro.');
        }
      })
  }

}
