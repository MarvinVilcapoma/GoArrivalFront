import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from 'src/app/services/head.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  /**
   *
   */
  name= "";
  filteredList: any[] = []; // Lista filtrada
  lstPerson: any[] = [];
  displayedList: any[] = [];
  itemsPerPage = 10; // Número de elementos por página
  currentPage = 1; // Página actual inicial
  constructor(private service: LoginService,private head: HeaderService,private cookie: CookieService,private _route: ActivatedRoute,private router: Router) {
    this.head.ocultarEncabezado();
    
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  mandarDk(valor_ : any){
    this.head.mostrarSpinner();
    let id = this.head.encriptar(valor_);
    this.cookie.set("dk_company",id);

    let valor:any = this.cookie.get("cookieLogin");
    valor = this.head.desencriptar(valor);

    valor.oenterprise.id  = valor_.id;
    valor.oenterprise.isAgency  = false;
    valor.oenterprise.oinfoCredit = null;
    valor.oenterprise.name  = valor_.name;
    valor.oenterprise.type  = valor_.typeCompany;
    valor.oenterprise.ruc = valor_.ruc;
    valor.oenterprise.codeDK = valor_.codeDK;
    valor.phone = valor_.phone;
    valor.email = valor_.email;

    this.cookie.delete("cookieLogin","/");

    let vaewq = this.head.encriptar(valor);
    this.cookie.set("cookieLogin",vaewq);


    this.router.navigate(["/flights"]);
  }

  filterItems(): void {


    this.displayedList = this.filteredList.filter(item => {
      const fullName = `${item.name}`;
      return fullName.toLowerCase().includes(this.name.toLowerCase());
    });
    // Volver a la primera página cuando se cambia el filtro
    this.currentPage = 1;
  }

  getCompanies(){
    this.head.mostrarSpinner();
    let userId: any;
    userId = this._route.snapshot.paramMap.get('userID');
    this.service.getCompanies(userId).subscribe(
      x=>{
        if(x.status === 200){
          this.lstPerson = x.ldata;
          this.filteredList = x.ldata;
          this.displayedList = this.filteredList;
        } else {
          this.head.setErrorToastr(x.message);
        }
        
        this.head.ocultarSpinner();
      },
      error => {
        error.status === 404 ? this.head.setErrorToastr("Servicio no encontrado") : this.head.error500(); 
      }
    )
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.displayedList.slice(startIndex, endIndex);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const visiblePages = 5; // Número de páginas visibles (ajusta según tus necesidades)
    const pageArray: number[] = [];
    let startPage: number;
    let endPage: number;
  
    if (totalPages <= visiblePages) {
      // Mostrar todas las páginas si el número total de páginas es menor o igual al número de páginas visibles
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calcular el rango de páginas para mostrar según la página actual y el número de páginas visibles
      const halfVisiblePages = Math.floor(visiblePages / 2);
      if (this.currentPage <= halfVisiblePages) {
        startPage = 1;
        endPage = visiblePages;
      } else if (this.currentPage + halfVisiblePages >= totalPages) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = this.currentPage - halfVisiblePages;
        endPage = this.currentPage + halfVisiblePages;
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }
  
    return pageArray;
  }

  getTotalPages(): number {
    return Math.ceil(this.displayedList.length / this.itemsPerPage);
  }

}
