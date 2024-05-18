import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class SignUpPage implements OnInit {

  protected length = false;
  protected uppercase = false;
  protected lowercase = false;
  protected number = false;
  protected special = false;
  protected passwords = false;
  protected requirements = false;
  protected password: string = "";
  protected confirmPassword: string = "";
  email: string = '';
  username: string = '';

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
    console.log("signup")
  }

  onSubmit() {
    try {
      this.userService.createUser(this.email, this.username, this.password).then(
        () => {
          alert('Signed up!');
          this.router.navigate(['/tabs/login']);
        }
      )
    } catch (error:any){
      alert(error.message)
    }
  }

  satisfyRequirements() {
    this.length = this.satisfyLength();
    this.uppercase = this.satisfyUppercase();
    this.lowercase = this.satisfyLowercase();
    this.number = this.satisfyNumber();
    this.special = this.satisfySpecial();
    this.passwords = this.satisfyPasswords();

    this.requirements = this.length &&
      this.uppercase &&
      this.lowercase &&
      this.number &&
      this.special &&
      this.passwords;
  }

  satisfyLength() {
    return this.password.length >= 8;
  }

  satisfyUppercase() {
    return /[A-Z]/.test(this.password);
  }

  satisfyLowercase() {
    return /[a-z]/.test(this.password);
  }

  satisfyNumber() {
    return /\d/.test(this.password);
  }

  satisfySpecial() {
    return /[^A-Za-z0-9]/.test(this.password);
  }

  satisfyPasswords() {
    return this.password === this.confirmPassword;
  }

}
