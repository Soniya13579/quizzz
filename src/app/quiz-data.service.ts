import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from './categories';
import { Quiz } from './quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizDataService {

  constructor(private http: HttpClient) { }

  getCategories():Observable<Categories> {
    return this.http.get<Categories>("https://opentdb.com/api_category.php")
  }

  getQuizz(id: number | undefined, selectedDifficulty: string): Observable<Quiz> {
    return this.http.get<Quiz>("https://opentdb.com/api.php?amount=5&category="+id+"&difficulty="+selectedDifficulty+"&type=multiple")
  }
}
