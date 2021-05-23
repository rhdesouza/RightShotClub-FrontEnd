import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnakeBarService } from '../common/snakebar/snakebar.service';
import { User } from '../model/entity/User';
import { AdmService } from './adm.service';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { AddRoleUserComponent } from './user/add-role-user/add-role-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';


@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public irParaUsuario(){
    this.router.navigate(["adm/user-list"]);
  }

  public irParaRoles(){
    this.router.navigate(["adm/roles-list"]);
  }

  public irParaInfoRSC(){
    this.router.navigate(["adm/info-rsc"]);
  }

}
