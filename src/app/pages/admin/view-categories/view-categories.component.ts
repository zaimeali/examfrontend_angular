import { Component, OnInit } from '@angular/core';
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
      cid: null,
      title: '',
      description: ''
    },
  ];

  constructor(private categoryService : CategoryService) { }

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

}
