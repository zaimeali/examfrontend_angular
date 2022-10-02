import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // using as state management
  currentQuizTitle = '';

  constructor(
    private _http : HttpClient
  ) { }

  public getQuestionsOfQuiz = (quizID : any) => {
    return this._http.get(`${baseURL}/api/question/quiz/admin/${quizID}`);
  }

  public getQuestionsOfQuizForUser = (quizID : Number) => {
    return this._http.get(`${baseURL}/api/question/quiz/${quizID}`);
  }

  public addQuestion = (question : any) => {
    return this._http.post(`${baseURL}/api/question/`, question);
  }

  public updateQuizTitle = (quizTitle : string) => {
    this.currentQuizTitle = quizTitle;
  }

  public getQuizTitle = () => {
    return this.currentQuizTitle;
  }

  public deleteQuestionByID = (questionID : any) => {
    return this._http.delete(`${baseURL}/api/question/${questionID}`);
  }

  public pushEvalQuiz = (questions : any) => {
    return this._http.post(`${baseURL}/api/question/eval-quiz`, questions);
  }
}
