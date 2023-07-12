import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../quiz-data.service';
import { Result } from '../quiz';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit{

  resultData: Array<Result> = []
  count: number = 0

  constructor(private quizData: QuizDataService) {}

  ngOnInit(): void {
    this.resultData = this.quizData.quizData

    this.resultData.forEach(a => {
      if(a.correct_answer == a.selected_answer) this.count++
    })
  }

}
