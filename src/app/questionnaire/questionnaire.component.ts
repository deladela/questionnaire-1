import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IOptionModel} from '../shared/model/option.model';
import {IQuestionModel, QuestionModel} from '../shared/model/question.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  score = 0;
  answeredQuestions: IQuestionModel[] = [];
  @Input() questions: IQuestionModel[];
  @Output() scoreCalculated: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onQuestionAnswered(option: IOptionModel) {
    this.answeredQuestions = this.questions.map((question) => {
      if (question.questionId === option.questionId) {
        return question;
      }
    });
  }

  calculateScore() {
    this.answeredQuestions.filter((question) => {
      return question.correctOptionId === question.answeredOptionId;
    });
    this.score = this.answeredQuestions.length / this.questions.length;
  }

  showMyScore() {
    this.calculateScore();
    this.scoreCalculated.emit(this.score);
  }

}