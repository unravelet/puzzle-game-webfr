import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstant } from '../global-const';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json' })
  };

  ngOnInit(): void {
  }

  
  logout(){
      this.http.post<{message: string, logout: boolean}>('http://localhost:3000/logout', this.httpOptions)
      .subscribe((responseData) => {
        console.log(responseData.message);
        alert("Logout successful")
    })
  }
  

  retrieveHs(){

  }

  sendHs(){

  }
}
