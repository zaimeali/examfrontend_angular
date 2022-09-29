import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    {
      categoryID: null,
      title: '',
      description: ''
    },
  ];

  constructor(
    private categoryService : CategoryService,
    private matSnack : MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe((data : any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        Swal.fire("Error", `${error.statusText}`, "error");
        console.error(error);
      })
  }

  deleteCategory = (categoryID : any) => {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: "delete",
      title: 'Are you sure?'
    }).then((result) => {
      if(result.isConfirmed) {
        this.categoryService.deleteCategory(categoryID)
        .subscribe(
          (data : any) => {
            this.matSnack.open("Deleted Successfully", "", {
              duration: 3000,
            });
            this.categories = this.categories.filter((category) => category.categoryID != categoryID);
          },
          (error) => {
            console.error(error);
            Swal.fire("Error !!", `${error.statusText}`, "error");
          }
        );
      }
    });
  }
}
