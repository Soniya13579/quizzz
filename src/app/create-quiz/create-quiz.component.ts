import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../quiz-data.service';
import { Categories } from '../categories';
import { Quiz } from '../quiz';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  category: Array<string> = []
  categories: Array<{id: number, name: string}> = []
  options:any;
  difficulty: Array<string> = ["Easy", "Medium", "Hard"]
  selectedCategory: string = ""
  selectedDifficulty: string = ""
  quizForm!: FormGroup;
  questions: any = [];
  option: any = []
  quest: any
  valueInvalid = [Validators.required]

  constructor(private quizData: QuizDataService, public fb: FormBuilder,) { }

  ngOnInit(): void {
    this.quizData.getCategories().subscribe((resp: Categories) => {
      this.categories = [...resp.trivia_categories]
      this.category = resp.trivia_categories.map(a => { return a.name })
    })
    this.quizForm = new FormGroup({})
  }

  getQuiz(cat: string, diff: string) {
    let id = this.categories.find(a => a.name === cat)?.id
    this.quizData.getQuizz(id, diff.toLowerCase()).subscribe((resp: Quiz) => { 
      console.log(resp)
      this.questions = resp.results
      this.questions.map((a: { incorrect_answers: any[]; correct_answer: any; }) => a.incorrect_answers.push(a.correct_answer))
      resp.results.map((a, index)=>{
        this.quizForm.addControl('test_'+index, new FormControl([Validators.required]))
      })
    })
  }

  onSubmit(quizForm:any) {
    console.log("@@@@@@",quizForm);
  }
}
