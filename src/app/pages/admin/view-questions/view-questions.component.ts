import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  quizID = null;
  quizTitle = "";
  questions = [];

  constructor(
    private _questionService : QuestionService,
    private _route : ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.quizID = this._route.snapshot.params['quizID'];
    this.quizTitle = this._route.snapshot.params['title'];

    this._questionService.getQuestionsOfQuiz(this.quizID)
      .subscribe(
        (data : any) => {
          this.questions = data;
        },
        (error) => {
          console.error(error);
          Swal.fire("Error !!", `${error.statusText}`, "error");
        }
      );
  }

  addQuestion = () => {
    this._questionService.updateQuizTitle(this.quizTitle);
    this._router.navigate([`/admin/questions/add/${this.quizID}/${this.quizTitle}`]);
  }

}
