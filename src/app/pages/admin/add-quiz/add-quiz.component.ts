import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  
  quiz = {
    title: ''
  };

  categories = [
    {
      categoryID: 12,
      title: 'Programming',
    },
  ];

  constructor(
    private quizService : QuizService, 
    private matSnack : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  formSubmit = () => {

  }

}
