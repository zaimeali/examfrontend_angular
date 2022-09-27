import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
          Swal.fire("Error !!", `${error.statusText}`, "error");
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

  }
}
