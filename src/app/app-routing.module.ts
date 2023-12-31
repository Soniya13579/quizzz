import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';

const routes: Routes = [
  { path: '', component: CreateQuizComponent },
  { path: 'results', component: QuizResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
