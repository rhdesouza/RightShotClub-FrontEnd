import { TestBed } from '@angular/core/testing';
import { RestService } from 'src/app/common/httpService/httpService.component';
import { TipoRequisicaoRestEnum } from 'src/app/model/enum/tipo-requisicao-rest.enum';
import { ClienteService } from './cliente.service';

describe('clienteService', () => {
  let service: ClienteService;
  let httpClient: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TipoRequisicaoRestEnum],
      providers: [TipoRequisicaoRestEnum],
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
