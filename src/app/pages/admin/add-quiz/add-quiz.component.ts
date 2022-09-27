import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      categoryID: null,
    },
  };

  categories = [
    {
      categoryID: null,
      title: '',
    },
  ];

  constructor(
    private quizService : QuizService, 
    private categoryService: CategoryService,
    private matSnack : MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
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

  formSubmit = () => {
    if(this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.matSnack.open("Title is required", "", {
        duration: 3000,
      });
      return;
    }

    if(this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) {
      this.matSnack.open("Max marks is required", "", {
        duration: 3000,
      });
      return;
    }

    if(this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null) {
      this.matSnack.open("Number of questions is required", "", {
        duration: 3000,
      });
      return;
    }

    this.quizService.createQuiz(this.quiz)
      .subscribe(
        (data : any) => {
          Swal.fire("Added", "Quiz added successfully", "success");

          this.quiz = {
            title: '',
            description: '',
            maxMarks: '',
            numberOfQuestions: '',
            active: true,
            category: {
              categoryID: null,
            },
          };

          this.router.navigate(['admin/quizzes']);
        },
        (error) => {
          console.error(error);
          Swal.fire("Error !!", `${error.statusText}`, "error");
        },
      );
  }

}
