import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  public getAllQuizzes = () => {
    return this.http.get(`${baseURL}/api/quiz/`);
  }

  public createQuiz = (quiz : any) => {
    return this.http.post(`${baseURL}/api/quiz/`, quiz);
  }

  public deleteQuiz = (quizID : Number) => {
    return this.http.delete(`${baseURL}/api/quiz/${quizID}`);
  }

  public getQuizbyID = (quizID : Number) => {
    return this.http.get(`${baseURL}/api/quiz/${quizID}`);
  }

  public updateQuiz = (quiz : any) => {
    return this.http.put(`${baseURL}/api/quiz/`, quiz);
  }

  public getQuizzesOfCategory = (categoryID : Number) => {
    return this.http.get(`${baseURL}/api/quiz/category/${categoryID}/active`);
  }

  public getActiveQuizzes = () => {
    return this.http.get(`${baseURL}/api/quiz/active`);
  }
}
