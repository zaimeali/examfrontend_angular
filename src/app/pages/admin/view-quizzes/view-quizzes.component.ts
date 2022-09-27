import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [
    {
      qId: 23,
      title: 'test',
      description: 'testing',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Tester',
      },
    },
    {
      qId: 23,
      title: 'test',
      description: 'testing',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Tester',
      },
    },
  ];

  constructor(private quizService : QuizService) { }

  ngOnInit(): void {
    this.quizService.getAllQuizzes()
      .subscribe(
        (data : any) => {
          console.log(data);
          this.quizzes = data;
        },
        (error) => {
          console.error(error);
          Swal.fire("Error!!", `${error.statusText}`, "error");
        }
      );
  }

}
