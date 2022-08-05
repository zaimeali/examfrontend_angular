import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

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
    console.log(this.user)

    if(this.user.username == '' || this.user.username == null) {
      alert('Username is required')
      return
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data)
        alert("Success")
      }, 
      (error) => {
        console.error(error)
        alert('Something went wrong')
      }
    )
  }
}
