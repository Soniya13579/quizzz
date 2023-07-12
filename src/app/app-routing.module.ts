import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

const routes: Routes = [
  { path: '', component: CreateQuizComponent },
  { path: 'submitQuiz', component: QuizResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
