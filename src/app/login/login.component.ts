import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { GlobalConstant } from '../global-const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  loginForm: FormGroup;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json' })
  };

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(){
    console.log(this.loginForm);

    if(this.loginForm.invalid){
      alert("Please fill out the required fields");
    }
    else if(this.loginForm.get('email').value != 'test@test.at' && this.loginForm.get('password').value != "12345678"){
      console.log("Login failed");

      //post request
    }else {
      this.http.post<{message: string, user: any, login: boolean, username: string, token: string}>('http://localhost:3000/login', this.loginForm.value, this.httpOptions)
        .subscribe((responseData) => {
          console.log(responseData.message);
          
          GlobalConstant.token = responseData.token;
          GlobalConstant.username = responseData.username;

          if(responseData.login){
            location.href = 'http://localhost:4200/homepage';
          }
    })
    }
  }

  /* //folie seite 27
  onSubmit(form: NgForm)
{
  this.http.post<{message: string}>('http://localhost:3000/login', form.value, this.httpOptions)
    .subscribe((responseData) => {
      console.log(responseData.message);
    })
}  */ 

  //email validation
  getErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  //password hide/show
  hide = true;

 
}
