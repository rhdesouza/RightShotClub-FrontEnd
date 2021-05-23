import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snakebar.component';

@Injectable({ providedIn: 'root' })
export class SnakeBarService {

    constructor(
        public _snackBar: MatSnackBar
    ) { }

    /**
     * Configuração inicial
     */
    private durationInSeconds = 3;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';


    openSnackBar(msg: string, msgAction?: string):MatSnackBarRef<any> {
        return this._snackBar.open('<i class="fas fa-times"></i>' + msg, msgAction, {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    openSnackBarSuccess(msg: string): MatSnackBarRef<any> {
        const _snackType = 'success';
        return this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: { message: msg, snackType: _snackType, snackBar: this._snackBar }
        });
    }

    openSnackBarError(msg: string): MatSnackBarRef<any> {
        const _snackType = 'error';
        return this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: { message: msg, snackType: _snackType, snackBar: this._snackBar }
        });
    }

    openSnackBarWarn(msg: string): MatSnackBarRef<any> {
        const _snackType = 'warn';
        return this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: { message: msg, snackType: _snackType, snackBar: this._snackBar }
        });
    }

    openSnackBarInfo(msg: string): MatSnackBarRef<any> {
        const _snackType = 'info';
        return this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: { message: msg, snackType: _snackType, snackBar: this._snackBar }
        });
    }

}
