import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private matSnackBar: MatSnackBar, private loginService: LoginService) { }

  public user = {
    username: '',
    password: ''
  }

  ngOnInit(): void {
  }


  formSubmit = () => {

    // Validation
    if(this.user.username.trim() == '' || this.user.username == null) {
      this.matSnackBar.open("Username is required", "", {
        duration: 3000
      })

      return;
    }

    if(this.user.password.trim() == '' || this.user.password == null) {
      this.matSnackBar.open("Password is required", "", {
        duration: 3000
      })

      return;
    }

    // Generate Token
    this.loginService.generateToken(this.user).subscribe(
      (data: any) => {
        console.log(data)
        
      }, 
      (error) => {
        console.error("Error")
        console.error(error)
      }
    )
  }
}
