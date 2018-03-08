import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { InstructorService } from '../../instructor.service';
import { InstructorHttpService } from '../../instructorHTTP.service';
import { UtilsService } from '../../../shared/utils/utils.service';

import { Instructor } from '../../models/instructor.model';

@Component({
  selector: 'app-instructor-profile-edit',
  templateUrl: './instructor-profile-edit.component.html',
  styleUrls: ['./instructor-profile-edit.component.css']
})
export class InstructorProfileEditComponent implements OnInit {

  public myProfile: Instructor;
  public editingMode = false;
  public displayResult = '';
  public resultMessage = '';
  public daysOfWeek = this.utilsService.daysOfWeek;

  selectedfile : File = null;
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private instructorService: InstructorService,
    private instructorHttpService: InstructorHttpService,
    public utilsService: UtilsService
  ) {
    this.createForm();
  }

  ngOnInit() {
    // this.instructorHttpService.getMyProfile().subscribe(
    //   (res) => {
    //     this.myProfile = res;
    //   },
    //   (err) => console.log(err)
    // )
    this.instructorService.myProfile.subscribe(
      (res) => {
        this.myProfile = res;
        console.log(res);
      },
      err => console.log(err)
    );
    this.myProfile = this.instructorService.instructorProfile;
  }

  onEditing(profile){
    this.editingMode = true;
  }

  goBack(){
    this.editingMode = false;
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
      this.loading = true;
      this.instructorHttpService.editInstructorProfile(formDetails)
        .subscribe(
          (res) => {
            this.loading = false;
            this.displayResult = 'success';
            this.resultMessage = 'Modificarile au fost salvate cu success.';
            setTimeout(()=> {
              this.displayResult = '';
              this.resultMessage = '';
            } ,2000);
            this.myProfile = res;
            this.editingMode = false;
          },
          (err) => {
            this.editingMode = false;
            this.loading = false;
            this.displayResult = 'error';
            this.resultMessage = 'Modificarile nu au putut fi salvate.';
            setTimeout(()=> {
              this.displayResult = '';
              this.resultMessage = '';
            } ,3000);
          }
        );

    }
    // this.onSubmit();
  }

  // onFileChange(event) {
  //   let reader = new FileReader();
  //   if(event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     // console.log(reader.readAsDataURL(file));
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.form.get('profileImage').setValue({
  //         filename: file.name,
  //         filetype: file.type,
  //         value: reader.result.split(',')[1]
  //       });
  //     };
  //   }
  //   console.log(event);
  // }
onFileChange(event){

  this.selectedfile = <File>event.target.files[0];
  console.log(this.selectedfile);
}

//   onSubmit() {
//   const formModel = this.form.value;
//   formModel.name = 'file';
//   console.log(formModel);
//   this.loading = true;
//   this.instructorHttpService.uploadProfileImage(formModel.profileImage).subscribe(
//     (res) => {
//       this.createImageFromBlob(res);
//     }
//   );
// }

// createImageFromBlob(image) {
//       let reader = new FileReader();
//        if (image) {
//           reader.readAsDataURL(image.value);
//        }
//        console.log(reader);
// }

onSubmit() {
  const fd = new FormData();
  fd.append('image', this.selectedfile, this.selectedfile.name);
  this.instructorHttpService.uploadProfileImage(this.selectedfile).subscribe(
    (res) => console.log(res)
  );
}

  clearFile() {
    this.form.get('profileImage').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
