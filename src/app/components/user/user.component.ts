import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { PageEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isLoading: boolean;
  displayedColumns: string[] = ['name', 'cpf', 'state', 'status', 'actions'];
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

    this.getUsers();
  }

  async getUsers(pageNumber?: number, search?: string) {

    try {
      let skip = !pageNumber ? 0 : (pageNumber * this.pageSize);
      const users = {
        totalItems: 2,
        data: [
          // { name: 'Empresa 1', cpf: '123.456.789-01', state: 'RS', status: 'Regular' },
          // { name: 'Empresa 2', cpf: '123.456.789-01', state: 'RS', status: 'Regular' },
        ]
      };

      if (users) {
        this.length = users.totalItems;
        this.dataSource = users.data;
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

  edit(user) {
    //this.router.navigate(['/user/edit', user.id]);
  }

  delete(user) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data:
      {
        title: 'Remover cliente',
        message: `Deseja realmente remover o cliente '${user.name}'?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.success("Cliente removido com sucesso!");
      }
    });
  }

  searchUser() {
    this.getUsers(0, this.search);
  }

  changePage(pageEvent: PageEvent) {
    if (pageEvent.pageSize !== this.pageSize) {
      this.pageSize = pageEvent.pageSize;
      this.getUsers(0);
    }
    else {
      this.getUsers(pageEvent.pageIndex);
    }
  }

}
