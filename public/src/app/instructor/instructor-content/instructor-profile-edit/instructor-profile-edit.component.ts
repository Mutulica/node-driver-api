import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { InstructorHttpService } from '../../instructorHTTP.service';

@Component({
  selector: 'app-instructor-profile-edit',
  templateUrl: './instructor-profile-edit.component.html',
  styleUrls: ['./instructor-profile-edit.component.css']
})
export class InstructorProfileEditComponent implements OnInit {

  public myProfile = {};

  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private instructorHttpService: InstructorHttpService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.instructorHttpService.getMyProfile().subscribe(
      (res) => {
        this.myProfile = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      profileImage: null
    });
  }

  onEditProfile(form){
    var formDetails = {
      phone: String,
      email: String,
      address: String,
      profileDescription: String
    };

    if(form.value.phone !== ''){
      formDetails.phone = form.value.phone;
    }

    if(form.value.email !== ''){
      formDetails.email = form.value.email;
    }
    if(form.value.address !== ''){
      formDetails.address = form.value.address;
    }
    if(form.value.description !== ''){
      formDetails.profileDescription = form.value.description;
    }

    if(form.dirty && !form.untouched){

      this.instructorHttpService.editInstructorProfile(formDetails)
        .subscribe(
          (res) => {
           this.myProfile = res;
          },
          (err) => {
            console.log(err);
          }
        );

    }

  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('profileImage').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
    console.log(this.form);
  }

  clearFile() {
    this.form.get('profileImage').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
