import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { HeaderService } from 'src/app/services/head.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent  implements OnInit {
  sidebarVisible: boolean = true;
  switch_expression = "";
  isExpanded = true;
  isSidenavExpanded = true;
  isShowing = false;
  blockNav = true;
  lstMenu: any[] = [];
  cookieValue: any;
  lstServices: any;
  items: MenuItem[] = [];
  constructor(private router: Router, private head: HeaderService, private cookie: CookieService) {
    this.cookieValue = this.cookie.get('cookieLogin');
    this.cookieValue = this.head.desencriptar(this.cookieValue);
    if (this.cookieValue === "") {
      this.router.navigate([""]);
    }
    this.lstServices = this.cookie.get("lstMenu");
    this.lstServices = this.head.desencriptar(this.lstServices);
    this.lstServices.forEach((element: any) => {
      if (element.name === "Administrador") {
        this.lstMenu = element.lsubMenu;
      }
    });
  }

ngOnInit(): void {
  console.log(this.lstMenu);
  this.items = [
    {
        label: 'Mail',
        icon: 'pi pi-envelope',
        badge: '5',
        items: [
            {
                label: 'Compose',
                icon: 'pi pi-file-edit',
                shortcut: '⌘+N'
            },
            {
                label: 'Inbox',
                icon: 'pi pi-inbox',
                badge: '5'
            },
            {
                label: 'Sent',
                icon: 'pi pi-send',
                shortcut: '⌘+S'
            },
            {
                label: 'Trash',
                icon: 'pi pi-trash',
                shortcut: '⌘+T'
            }
        ]
    },
    {
        label: 'Reports',
        icon: 'pi pi-chart-bar',
        shortcut: '⌘+R',
        items: [
            {
                label: 'Sales',
                icon: 'pi pi-chart-line',
                badge: '3'
            },
            {
                label: 'Products',
                icon: 'pi pi-list',
                badge: '6'
            }
        ]
    },
    {
        label: 'Profile',
        icon: 'pi pi-user',
        shortcut: '⌘+W',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                shortcut: '⌘+O'
            },
            {
                label: 'Privacy',
                icon: 'pi pi-shield',
                shortcut: '⌘+P'
            }
        ]
    }
];
}

  convertPMenu(){
    this.lstMenu.forEach(element => {
      element["label"] = element.name;
      element["items"] = element.lsubMenu;
    });
  }

  routeMenu(valor: any) {
    const routes: { [key: string]: string | (() => void) } = {
      'Flujos Aprobación': () => this.router.navigate(['flows/approval-flows']),
      'Gestión de Empresas': () => {
        if (this.head.getIsAgency()) {
          this.router.navigate(['flows/administrator-agency']);
        } else {
          this.router.navigate(['flows/administrator']);
        }
      },
      'Gestión Pseudos': () => this.router.navigate(['flows/pseudo-management']),
      'Cobros y Cancelaciones': () => this.router.navigate(['flows/payments-cancellations']),
      'Gestión de políticas': () => this.router.navigate(['flows/policy-management']),
      'Gestión de Agencias': () => {
        if (this.cookieValue.orole.isSuperUser) {
          this.router.navigate(['flows/agency-management-user']);
        } else {
          this.router.navigate(['flows/agency-management']);
        }
      },
      'Gestión de cargos': () => this.router.navigate(['flows/charge-management']),
      'Gestión de menus': () => this.router.navigate(['flows/menu-management']),
      'Gestión cargos internacionales': () => this.router.navigate(['flows/charge-international-management']),
      'Perfiles GDS': () => this.router.navigate(['flows/profile-gds-management']),
      'Gestión Centro Costo': () => this.router.navigate(['flows/cost-center']),
      'Gestión de códigos': () => this.router.navigate(['flows/code-management']),
      'Gestión de cupones': () => this.router.navigate(['flows/coupon-management']),
      'Perfil Usuario GDS': () => this.router.navigate(['flows/user-management-agent']),
      'Gestión de grupos': () => this.router.navigate(['flows/group-management']),
      'Roles de empresa': () => this.router.navigate(['flows/business-roles']),
      'Gestión de Usuarios': () => this.router.navigate(['flows/user-management']),
      'Gestión de Tarjetas': () => this.router.navigate(['flows/card-management']),
      'Gestión SMTP': () => this.router.navigate(['flows/smtp-management']),
    };
  
    const routeAction = routes[valor.name];
    if (routeAction) {
      if (typeof routeAction === 'function') {
        routeAction();
      } else {
        this.router.navigate([routeAction]);
      }
    }
  }


  mouseenter(): void {
    this.isSidenavExpanded = true;
  }

  mouseleave(): void {
    if (this.blockNav) {
      return;
    }
    this.isSidenavExpanded = false;
  }

  bloquear() {
    if (this.blockNav) {
      this.blockNav = false;
    } else {
      this.blockNav = true;
    }

  }

  closed() {
    this.head.logout();
    localStorage.removeItem('authToken');
    localStorage.setItem('logoutEvent', 'logout' + Math.random());
    this.router.navigate([""]);
  }

  profileRout() {
    this.router.navigate(["flows/profile"]);
  }

  flight() {
    this.head.mostrarSpinner();
    this.router.navigate(["flights"]);
  }

}
