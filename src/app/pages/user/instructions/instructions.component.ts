import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizID : Number = 0;

  quiz : any = {};

  constructor(
    private _quizService : QuizService,
    private _route : ActivatedRoute,
    private _router : Router,
  ) { }

  ngOnInit(): void {
    this._route.params
      .subscribe(
        (params) => {
          this.quizID = Number.parseInt(params["quizID"]);

          this._quizService.getQuizbyID(this.quizID)
            .subscribe(
              (data : any) => {
                this.quiz = data;
              },
              (error) => {
                console.error(error);
                Swal.fire("Error !!", `${error.statusText}`, "error");
              }
            );
        },
        (error) => {
          console.error(error);
          Swal.fire('Error !!', "Didn't get any quiz id", "error");
        }
      );
  }

  startQuiz = () => {
    Swal.fire({
      'icon': 'question',
      'title': "Do you want to start?",
      'showCancelButton': true,
      'confirmButtonText': 'Start'
    }).then((response) => {
      if(response.isConfirmed) {
        this._router.navigate([`/user/quiz/${this.quizID}`]);
      }
    });
  }

}
