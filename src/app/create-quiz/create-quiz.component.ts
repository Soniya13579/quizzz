import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizDataService } from '../quiz-data.service';
import { Categories, TriviaCategory } from '../categories';
import { Quiz, Result } from '../quiz';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit, OnDestroy {
  category: Array<string> = []
  categories: Array<TriviaCategory> = []
  difficulty: Array<string> = ["Easy", "Medium", "Hard"]
  selectedCategory: string = ""
  selectedDifficulty: string = ""
  quizForm!: FormGroup;
  questions: Array<Result> = [];
  subs: Subscription[] = [];

  constructor(private quizData: QuizDataService, public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const sub1 = this.quizData.getCategories().subscribe((resp: Categories) => {
      this.categories = resp.trivia_categories
      this.category = resp.trivia_categories.map(a => { return a.name })
    }, (error) => {
      alert('Error Found!');
    })
    this.quizForm = new FormGroup({})    
    this.subs.push(sub1)
  }

  getQuiz(cat: string, diff: string) {
    let id = this.categories.find(a => a.name === cat)?.id

    const sub2 = this.quizData.getQuizz(id, diff.toLowerCase()).subscribe((resp: Quiz) => {
      this.questions = resp.results
      this.questions.map((a, index) => {
        a.incorrect_answers.push(a.correct_answer)
        this.quizForm.addControl('test_' + index, new FormControl([Validators.required]))
      })
    }, (error) => {
      alert('Error Found!');
    })
    this.subs.push(sub2)
  }

  onSubmit(quizForm: Array<string>) {
    this.questions.forEach((a, i) => {
      a.selected_answer = this.quizForm.controls['test_' + i].value
    })
    this.quizData.quizData = this.questions
    this.router.navigate(['results'])
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
