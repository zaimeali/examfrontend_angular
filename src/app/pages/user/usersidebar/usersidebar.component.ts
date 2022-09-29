import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent implements OnInit {

  categories = [];

  constructor(
    private _categoryService : CategoryService
  ) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories()
      .subscribe(
        (data : any) => {
          this.categories = data;
        },
        (error) => {
          console.error(error);
          Swal.fire("Error !!", `${error.statusText}`, "error");
        }
      );
  }

}
