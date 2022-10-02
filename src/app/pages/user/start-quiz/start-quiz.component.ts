import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  quizID : Number = 0;

  questions: any = [];

  totalQuestions = 0;

  marksScored = 0;

  maxMarks = 0;

  correctAnswer = 0;

  attempted = 0;

  isSubmit : boolean = false;

  constructor(
    private _questionService : QuestionService,
    private _quizService : QuizService,
    private _locationStrategy : LocationStrategy,
    private _route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.preventBackFunctionality();

    this.quizID = this._route.snapshot.params['quizID'];

    this._questionService.getQuestionsOfQuizForUser(this.quizID)
      .subscribe(
        (data : any) => {
          this.questions = data;

          this.totalQuestions = this.questions.length;
          this.attempted = this.questions.length;
          this.maxMarks = this.questions[0]['quiz']['maxMarks'];

          this.questions.forEach((question : any) => {
              question['givenAnswer'] = "";
          });
        },
        (error) => {
          console.error(error);
          Swal.fire("Error !!", `${error.statusText}`, "error");
        }
      );
  }

  preventBackFunctionality = () => {
    history.pushState(null, '', location.href);
    this._locationStrategy.onPopState(
      () => {
        history.pushState(null, '', location.href);
      }
    );
  }

  submitQuiz = () => {
    Swal.fire({
      title: "Do you want to submit the quiz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Submit"
    }).then((response) => {
      this.isSubmit = true;

      if(response.isConfirmed) {
        this.questions.forEach((question : any) => {
            if(question['givenAnswer'] == question['answer']) {
              this.correctAnswer++;

              let oneQuestionMark = question['quiz']['maxMarks'] / question['quiz']['numberOfQuestions'];

              this.marksScored += oneQuestionMark;
            }

            if(question['givenAnswer'].trim() == '') {
              this.attempted--;
            }
        });
      }
    });
  }
}
