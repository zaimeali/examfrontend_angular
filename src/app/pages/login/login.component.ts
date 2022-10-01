import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private matSnackBar: MatSnackBar, private loginService: LoginService, private router: Router) { }

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

        // Save token
        this.loginService.saveToken(data.token);

        this.loginService.getCurrentUser().subscribe(
          (data: any) => {
            this.loginService.setUser(data)
            
            if(this.loginService.getUserRole() == 'ADMIN') {
              // window.location.href = "/admin"
              this.router.navigate(['admin'])
              this.loginService.loginStatusSubject.next(true)
            } 
            else if(this.loginService.getUserRole() == 'USER') {
              // window.location.href = "/user"
              this.router.navigate(['user/0'])
              this.loginService.loginStatusSubject.next(true)
            }
            else {
              this.loginService.logout();
              // location.reload()
            }

          },
          (error) => {
            console.error("Error in getting user")
            console.error(error)
          }
        )
      }, 
      (error) => {
        console.error("Error")
        console.error(error)
        this.matSnackBar.open("Invalid Details!! try again", '', {
          duration: 3000
        })
      }
    )
  }
}
