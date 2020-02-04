import { Component, OnInit } from '@angular/core';
import { RequestApiService } from 'src/app/services/request-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  public Courses:any;
  public Students:any;
  studentsForm: FormGroup;
  public btnLoader:boolean = false;
  public loaderItems:boolean = true;
  idCourseActive = 1;
  btnUpdate = false;
  editElemento:any;


  constructor(private router: Router,private RequestApp: RequestApiService, private route: ActivatedRoute, private fb: FormBuilder, private sf: FormBuilder) { }

  ngOnInit() {
    this.studentsForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      course_id: ['', Validators.required]
    })

    this.RequestApp.get('courses').subscribe((data)=>{
      this.Courses = data['data'];
    }, null, () => {
      for(let key in this.Courses['data']){
        if (this.Courses['data'][key].id == this.route.snapshot.params.id) {
          this.getStudents(this.Courses['data'][key]);
        }
      }
    });
  }

  getStudents(course){
    this.loaderItems = true;
    this.Students  = [];
    this.router.navigateByUrl('/cursos/'+course.id)
    this.idCourseActive = course.id;
    this.RequestApp.get('students', {'course_id': course.id}).subscribe((data)=>{
      this.Students = data['data'];
    }, null, () => {
      this.loaderItems = false;
    });
  }
  onSubmit(f){
    this.btnLoader = true;
    this.RequestApp.save('students', f.value).subscribe((data)=>{
      if (data['status'] == 'success') {
          f.reset();
      }
    }, null, () => {
      setTimeout(() => {
        this.btnLoader = false;
      }, 1000);
      for(let key in this.Courses['data']){
        if (this.Courses['data'][key].id == this.route.snapshot.params.id) {
          this.getStudents(this.Courses['data'][key]);
        }
      }
    });
  }

  Delete(student){
    this.btnLoader = true;
    this.RequestApp.delete('students/'+student.id).subscribe((data)=>{
      if (data['status'] == 'success') {
        this.getStudents({'id': this.route.snapshot.params.id});
      }
    }, null, () => {
      setTimeout(() => {
        this.btnLoader = false;
      }, 1000);
    });
  }
  setStudents(student){
    this.editElemento = student;
    this.btnUpdate = true;
    this.studentsForm.setValue({
      name: student.name,
      phone: student.phone,
      email: student.email,
      course_id: student.course_id
    });
  }

  Edit(student){
    this.btnLoader = true;
    this.RequestApp.update('students/'+this.editElemento.id, student.value).subscribe((data)=>{
      if (data['status'] == 'success') {
        this.getStudents({'id': this.route.snapshot.params.id});
        this.resetForm()
      }
    }, null, () => {
      setTimeout(() => {
        this.btnLoader = false;
      }, 1000);
    });
  }

  resetForm(){
    this.studentsForm.reset();
    this.btnUpdate = false;

  }
}
