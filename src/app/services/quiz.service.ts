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
}
