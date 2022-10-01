import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  categoryID : Number = 0;

  quizzes = [];

  constructor(
    private _quizService : QuizService,
    private _route : ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this._route.params
      .subscribe(
        (params) => {

          if(params['categoryID'] == undefined) {
            this.categoryID = 0;
          } else {
            this.categoryID = Number.parseInt(params["categoryID"]);
          }


          if(this.categoryID == 0) {
            this._quizService.getActiveQuizzes()
              .subscribe(
                (data : any) => {
                  this.quizzes = data;
                },
                (error) => {
                  console.error(error);
                  Swal.fire("Error !!", `${error.statusText}`, "error");
                }
              );
          } else {
            this._quizService.getQuizzesOfCategory(this.categoryID)
              .subscribe(
                (data : any) => {
                  this.quizzes = data;
                },
                (error) => {
                  console.error(error);
                  Swal.fire("Error !!", `${error.statusText}`, "error");
                }
              );
          }
        }
      );
    
    
  }

}
