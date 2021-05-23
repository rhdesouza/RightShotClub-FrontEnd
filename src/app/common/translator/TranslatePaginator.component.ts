//import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class translatePaginator extends MatPaginatorIntl {

    // itemsPerPageLabel = 'Stavki po stranici';
    // nextPageLabel     = 'Slijedeća stranica';
    // previousPageLabel = 'Prethodna stranica';
    
    itemsPerPageLabel ="Itens por página:"
    firstPageLabel = 'Primeira página';
    nextPageLabel = 'Próximo';
    previousPageLabel = 'Anterior';
    lastPageLabel = 'Última página';
  
    getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 de ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
    };
  
}