import { QUESTION_TYPES } from './../../../../helpers/consts/config.helpers';
import { ShareDataService } from 'src/app/services';
import { AnamnesisService } from 'src/app/services/entities/anamnesis.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anamnesis-edit',
  templateUrl: './anamnesis-edit.component.html',
  styleUrls: ['./anamnesis-edit.component.css']
})
export class AnamnesisEditComponent implements OnInit {

  public questionsForm: FormGroup;

  public anamnesisData: any;

  public newQuestion = false;

  public creatingQuestion: boolean;

  public anamnesisName: string;

  public questionTypes = QUESTION_TYPES;

  public showOptions: boolean;


  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private anamnesisService: AnamnesisService,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.shareDataService.activateLoadingScreen(true);

    this.activatedRoute.params.subscribe(res => {

      this.anamnesisService.get(res.id).subscribe(
        (res) => {
          this.shareDataService.activateLoadingScreen(false);
          this.anamnesisData = res;

        },
        () => {
          this.shareDataService.activateLoadingScreen(false);

        });

    });

    this.questionsForm = this.fb.group({
      question: ['', [Validators.required]],
      type: [1, [Validators.required]],
      line_number: ['', [Validators.required]],
      options: [''],
    });

  }

  public getQuestionOptions(question) {
    const options = question.options.map((option) => option.title);
    return options.join(', ');
  }


  public submitQuestionData() {
    if (this.questionsForm.valid) {

      this.creatingQuestion = true;


      const formControls = this.questionsForm.controls;

      const optionsArray = [];
      if (formControls.options.value) {
        formControls.options.value.split(',').forEach(option => {
          optionsArray.push({ title: option });
        });
      }

      const questionData = {
        id: this.anamnesisData.id,
        question: formControls.question.value,
        type: formControls.type.value,
        line_number: formControls.line_number.value,
        options: optionsArray
      };


      this.anamnesisService.createAnamnesisQuestion(questionData)
        .subscribe(
          (res) => {
            this.anamnesisData.questions.push(res);
            this.creatingQuestion = false;
            this.questionsForm.reset();
            this.questionsForm.controls.type.setValue(1);
            this.newQuestion = false;

          },
          () => {
            this.creatingQuestion = false;

          }
        );
    }
  }


  public deleteAnamnesis() {
    this.anamnesisService.delete(this.anamnesisData.id).subscribe(
      () => {
        this.router.navigate(['../..'], { relativeTo: this.route });
      }
    );
  }

  public deleteQuestion(question: any) {

    this.anamnesisService.deleteAnamnesisQuestion(question.id).subscribe(
      () => {
        const questions = this.anamnesisData.questions;
        questions.splice(questions.indexOf(question), 1);
      }
    );

  }

  public showOptionsInput() {
    if (this.questionsForm.controls.type.value === 0 || this.questionsForm.controls.type.value === '0') {
      this.showOptions = true;
    } else {
      this.showOptions = false;
    }

  }
}
