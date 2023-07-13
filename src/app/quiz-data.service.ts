import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from './categories';
import { Quiz, Result } from './quiz';
import { environment } from '../environment/environment'

@Injectable({
  providedIn: 'root'
})

export class QuizDataService {
  quizData: Array<Result> = []

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(environment.URL + "_category.php")
  }

  getQuizz(id: number | undefined, selectedDifficulty: string): Observable<Quiz> {
    return this.http.get<Quiz>(environment.URL + ".php?amount=5&category=" + id + "&difficulty=" + selectedDifficulty + "&type=multiple")
  }
}
