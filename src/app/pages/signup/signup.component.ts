// Angular
import { Component, OnInit } from '@angular/core';

// Material UI
import { MatSnackBar } from '@angular/material/snack-bar';

// Sweet Alert
import Swal from 'sweetalert2';

// Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  ngOnInit(): void {
  }

  formSubmit = () => {

    if(this.user.username == '' || this.user.username == null) {
      this.snack.open("Username is required", "Ok", {
        duration: 3000,
      })
      return
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data)
        Swal.fire("Success", "User is registered", "success")
      }, 
      (error) => {
        console.error(error.error)
        const errorMessage: String = error.error.message
        this.snack.open(`Something went wrong - ${errorMessage}`, "Ok", {
          duration: 3000,
        })
      }
    )
  }
}
