import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService : CategoryService, 
    private matSnackBar : MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  formSubmit = () => {
    if(this.category.title.trim() == '' ||  this.category.title == null) {
      this.matSnackBar.open("Title Required!!", "", {
        duration: 3000,
      });
      return;
    }

    this.categoryService.addCategory(this.category)
      .subscribe(
        (data : any) => {
          Swal.fire("Success !!", "Category is added successfully", "success");
          this.category = {
            title: '',
            description: '',
          };
          this.router.navigate(['/admin/categories']);
        },
        (error) => {
          Swal.fire("Error !!", `${error.statusText}`, "error");
          console.error(error);
        }
      );
  }

}
