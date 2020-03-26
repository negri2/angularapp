import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { PageEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  isLoading: boolean;
  displayedColumns: string[] = ['name', 'cnpj', 'state', 'status', 'actions'];
  dataSource: Array<any>;
  length: number;
  pageSize = 20;
  pageSizeOptions: number[] = [10, 20, 50];
  search: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
    private alertService: AlertService) { }

  async ngOnInit() {
    this.isLoading = true;

    this.getCompanies();
  }

  async getCompanies(pageNumber?: number, search?: string) {

    try {
      let skip = !pageNumber ? 0 : (pageNumber * this.pageSize);
      const companies = {
        totalItems: 0,
        data: [
          { name: 'Empresa 1', cnpj: '34.669.869/0001-45', state: 'RS', status: 'Regular' },
          { name: 'Empresa 2', cnpj: '34.669.869/0002-88', state: 'RS', status: 'Regular' },
        ]
      };

      if (companies) {
        this.length = companies.totalItems;
        this.dataSource = companies.data;
      }

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  add() {
    //this.router.navigate(['/user/create']);
  }

  edit(company) {
    //this.router.navigate(['/user/edit', user.id]);
  }

  delete(company) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data:
      {
        title: 'Remover empresa',
        message: `Deseja realmente remover a empresa '${company.name}'?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.success("Empresa removido com sucesso!");
      }
    });
  }

  searchCompany() {
    this.getCompanies(0, this.search);
  }

  changePage(pageEvent: PageEvent) {
    if (pageEvent.pageSize !== this.pageSize) {
      this.pageSize = pageEvent.pageSize;
      this.getCompanies(0);
    }
    else {
      this.getCompanies(pageEvent.pageIndex);
    }
  }

}
