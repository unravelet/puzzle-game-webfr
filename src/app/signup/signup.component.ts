import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(private http: HttpClient) { }

  signupForm: FormGroup;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json' })
  };

  ngOnInit(): void {
    this.signupForm= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]), //at least 8 characters
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
      company: new FormControl('FH Technikum Wien'),
      address: new FormControl(),
      city: new FormControl(),
      postalcode: new FormControl('', [Validators.pattern(/^(0|[1-9]\d*)?$/)]),
    })
  }

  onSubmit(){
    console.log(this.signupForm);
    if(this.signupForm.invalid){
      alert("Please fill out the required fields");
    }
    else if(this.signupForm.get('password').invalid || this.signupForm.get('password2').invalid ){
      alert("Password needs to have at least 8 characters");
    }
    else if(this.signupForm.get('password').value != this.signupForm.get('password2').value){
      alert("Passwords need to match");
      
    }
    else if(this.signupForm.get('postalcode').invalid){
      alert("postal code must be a number")
    }
    else{
      //console.log("Signup successful");
      
      this.http.post<{message: string, signup: boolean}>('http://localhost:3000/signup', this.signupForm.value, this.httpOptions)
        .subscribe((responseData) => {
          console.log(responseData.message);
          if(responseData.signup){
            alert("Signup successful. Please log in.");
          }else{
            alert("Username already exists")
          }
      })
    }
  }


//email validation

  getErrorMessage() {
    if (this.signupForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.signupForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
//password hide/show
  hide = true;
}
