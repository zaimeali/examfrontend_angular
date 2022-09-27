import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  public getAllCategories() {
    return this.http.get(`${baseURL}/api/category/`);
  }

  public addCategory(category : any) {
    return this.http.post(`${baseURL}/api/category/`, category);
  }
}
