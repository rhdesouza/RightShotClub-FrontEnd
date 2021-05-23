import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalService } from 'src/app/common/services/modal.service';
import { SnakeBarService } from 'src/app/common/snakebar/snakebar.service';
import { FinanceiroService } from '../../financeiro.service';
import { AddVendaProdutoComponent } from '../add-venda-produto/add-venda-produto.component';

@Component({
  selector: 'app-venda-produto-list',
  templateUrl: './venda-produto-list.component.html',
  styleUrls: ['./venda-produto-list.component.css']
})
export class VendaProdutoListComponent implements OnInit {

  public filterForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private financeiroService: FinanceiroService,
    private modalService: ModalService,
    private snakeBarService: SnakeBarService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      cliente: new FormControl(null, [Validators.minLength(5)]),
      numeroNota: new FormControl(null, [Validators.pattern(/^[0-9]\d*$/)]),
    })
  }

  public limparFiltro() {
    this.filterForm.reset();
  }

  public filtrar() { }

  public adicionarVenda() {
    let dialogConfigDialog = new MatDialogConfig();
    dialogConfigDialog.disableClose = true;
    dialogConfigDialog.width = '100%';
    dialogConfigDialog.height = '100%';
    
    this.modalService.openModal(AddVendaProdutoComponent, dialogConfigDialog)
      .afterClosed().subscribe(rs => {

      })
  }

}
