import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(
    private quizService : QuizService, 
    private matSnack : MatSnackBar,
    private route : ActivatedRoute,
    private categoryService : CategoryService,
    private router : Router,
  ) { }

  quizID = 0;

  quiz  = {
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

  ngOnInit(): void {
    
    this.categoryService.getAllCategories()
      .subscribe(
        (data : any) => {
          this.categories = data;
        },
        (error) => {
          console.error(error);
          Swal.fire("Error !!", "Error in fetching categories", "error");
        }
      );

    this.quizID = this.route.snapshot.params['quizID'];

    this.quizService.getQuizbyID(this.quizID)
      .subscribe(
        (data : any) => {
          this.quiz = data;
        },
        (error) => {
          console.error(error);
          Swal.fire("Error !!", "Error in fetching quiz", "error");
        }
      );
  }

  formSubmit() {
    if(this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.matSnack.open("Title is required", "", {
        duration: 3000,
      });

      return;
    }

    this.quizService.updateQuiz(this.quiz)
      .subscribe(
        (data : any) => {
          Swal.fire("Success", "Updated Successfully", "success");
          this.router.navigate(['admin/quizzes']);
        },
        (error) => {
          console.error(error);
          Swal.fire("Error !!", error.statusText, "error");
        }
      );
  }
}
