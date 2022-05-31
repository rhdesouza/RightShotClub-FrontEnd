import { TestBed } from '@angular/core/testing';

import { CriptoJsService } from './cripto-js.service';

describe('CriptoJsService', () => {
  let service: CriptoJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriptoJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
