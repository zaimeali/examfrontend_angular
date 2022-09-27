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
      quizID: null,
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',
      category: {
        title: '',
      },
    },
  ];

  constructor(private quizService : QuizService) { }

  ngOnInit(): void {
    this.quizService.getAllQuizzes()
      .subscribe(
        (data : any) => {
          this.quizzes = data;
        },
        (error) => {
          console.error(error);
          Swal.fire("Error!!", `${error.statusText}`, "error");
        }
      );
  }

  deleteQuiz = (quizID : any) => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then(
      (result) => {
        if(result.isConfirmed) {
          this.quizService.deleteQuiz(quizID)
            .subscribe(
              (data : any) => {
                Swal.fire("Success", "Deleted Successfully", "success");
                this.quizzes = this.quizzes.filter((quiz) => quiz.quizID != quizID);
              },
              (error) => {
                console.error(error);
                Swal.fire("Error", "Error in deleting quiz", "error");
              },
            );
        }
      }
    );
  }
}
