import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { rightshot } from '../common/constantes/RightShotClub';
import { ModalService } from '../common/services/modal.service';
import { LoginService } from '../login/login.service';
import { Menu } from '../model/entity/Menu';
import { UserSettingsComponent } from '../userSettings/user-settings.component';
import { SidenavService } from './sidenav.service';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('onMainContentChange', [
      state('null',
        style({
          'margin-left': '0px'
        })
      ),
      state('false',
        style({
          'margin-left': '70px'
        })
      ),
      state('true',
        style({
          'margin-left': '200px'
        })
      ),
      transition('false => true', animate('250ms ease-in')),
      transition('true => false', animate('250ms ease-in')),
    ]),
    trigger('animateText', [
      state('false',
        style({
          'display': 'none',
          opacity: 0,
        })
      ),
      state('true',
        style({
          /* 'display': 'block', */
          'display': 'inline',
          opacity: 1,
        })
      ),
      transition('false => true', animate('0ms ease-in')),
      transition('true => false', animate('0ms ease-out')),
    ]),
    trigger('animateCard', [
      state('false',
        style({
          'display': 'none',
          opacity: 0,
        })
      ),
      state('true',
        style({
          'display': 'block',
          /* 'display': 'inline', */
          opacity: 1,
        })
      ),
      transition('false => true', animate('0ms ease-in')),
      transition('true => false', animate('0ms ease-out')),
    ]),
    trigger('onSideNavChange', [
      state('false',
        style({
          'width': '70px'
        })
      ),
      state('true',
        style({
          'min-width': '200px'
        })
      ),
      transition('false => true', animate('350ms ease-in')),
      transition('true => false', animate('200ms ease-out')),
    ]),
    trigger('rotatedState', [
      state('false',
        style({
          transform: 'rotate(0)'
        })),
      state('true',
        style({
          transform: 'rotate(-360deg)'
        })),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in'))
    ]),
    trigger('flyInOut', [
      state('*', style({ transform: 'translateX(0)' })),
      transition('* => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
    ])
  ]
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  public usuarioLogado: boolean = false;

  public tituloAplicacao = rightshot.tituloAplicacao;
  public versao = rightshot.versao;

  public isExpanded: boolean = false;
  public linkText: boolean = false;
  public inicialUser!: string;

  public listaMenu!: Array<Menu>;

  @ViewChild("snav") snav!: any;

  public user!: string;
  public nomeCompleto!: string;
  public imageSRC!: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router,
    public loginService: LoginService,
    public navService: SidenavService,
    private modalService: ModalService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


    this.loginService.usuarioLogado.subscribe(async rs => {
      this.usuarioLogado = rs;
      if (!!this.usuarioLogado) {
        this.getInfoUserNavbar();
        this.getMenu();
      } else
        this.closeSnavException();
    });
  }

  public getInfoUserNavbar() {
    this.loginService.getUserSettings().subscribe(rs => {
      this.loginService.getUserId(rs.id).subscribe(rs => {
        this.user = rs?.user;
        this.nomeCompleto = rs?.nomeCompleto;
        if (!!rs?.data)
          this.imageSRC = `data:${rs?.fileType};base64,${rs?.data}`;
        else
          this.imageSRC = null;
      })

    })
  }

  public getMenu() {
    this.navService.getMenu().subscribe((rs: Array<Menu>) => {
      this.listaMenu = rs;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  menu: NavItem[] = [
    {
      displayName: 'Menu 1',
      iconName: 'home',
      route: 'dashboard',
    },
    {
      displayName: 'Menu 2',
      iconName: 'ballot',
      route: 'entradasGADE',
    },
    {
      displayName: 'Guia Médico',
      iconName: 'description',
      children: [
        {
          displayName: 'Observação',
          iconName: 'how_to_reg',
          route: '/misexpedientes'
        },
        {
          displayName: 'Telefone',
          iconName: 'waves',
          route: '/todos'
        },
        {
          displayName: 'Contato',
          iconName: 'ballot',
          route: '/todoss'
        }
      ]
    },
    {
      displayName: 'Menu 3',
      iconName: 'description',
      children: [
        {
          displayName: 'Menu 3.1',
          iconName: 'how_to_reg',
          route: '/misexpedientes'
        },
        {
          displayName: 'Menu 3.2',
          iconName: 'waves',
          route: '/todos'
        }
      ]
    },
    {
      displayName: 'Menu 4',
      iconName: 'group',
      children: [
        {
          displayName: 'Menu 4.1',
          iconName: 'search',
          route: '/busquedaperfiles'
        }
      ]
    }
  ];

  fecharNavToogle() {
    if (this.isExpanded) {
      this.linkText = !this.isExpanded;
      setTimeout(() => {
        this.isExpanded = !this.isExpanded
      }, 10)
    } else {
      this.isExpanded = !this.isExpanded
      setTimeout(() => {
        this.linkText = this.isExpanded;
      }, 400)
    }
  }

  public logout() {
    this.loginService.logout();
  }

  public closeSnavException() {
    if (this?.snav) {
      if (this.snav["_animationState"] = 'open')
        this.snav['_animationState'] = 'void';
    }
  }

  public userSettings() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';

    this.modalService.openModal(UserSettingsComponent, dialogConfig).afterClosed().subscribe(data => { })
  }

  prepareRoute(outlet: RouterOutlet) {
    if (!outlet.isActivated)
      return null;

    return this.router.url;
  }
}
