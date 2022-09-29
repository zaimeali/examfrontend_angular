import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quizID = null;

  quizTitle = '';

  question = {
    content: '',
    image: null,
    answer: null,
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    quiz: {
      quizID: null,
    },
  };

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _matSnack : MatSnackBar,
    private _questionService : QuestionService,
  ) { }

  ngOnInit(): void {
    this.quizTitle = this._questionService.getQuizTitle();
    if(this._questionService.getQuizTitle() == '' || this._questionService.getQuizTitle() == null) {
      this.quizTitle = this._route.snapshot.params['title'];
    }
    this.quizID = this._route.snapshot.params['quizID'];
    this.question.quiz.quizID = this.quizID;
  }

  formSubmit = () => {
    if(this.question.content.trim() == '' || this.question.content == null) {
      this._matSnack.open('Content is required', '', {
        duration: 3000,
      });
      return;
    }

    this._questionService.addQuestion(this.question)
      .subscribe(
        (data : any) => {
          Swal.fire('Success !!', 'Question Saved Successfully', 'success');
          this._router.navigate([`/admin/questions/${this.quizID}/${this.quizTitle}`]);
        },  
        (error) => {
          console.error(error);
          Swal.fire('Error !!', `${error.statusText}`, "error");
        }
      );
  }

}
