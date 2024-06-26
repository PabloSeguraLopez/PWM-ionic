import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {
  IonButton,
  IonCol,
  IonContent,
  IonImg,
  IonInput,
  IonInputPasswordToggle,
  IonRow,
  IonTitle
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonRow, IonCol, IonTitle, IonImg, IonInput, IonButton, IonContent, IonInputPasswordToggle, RouterLink]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  async onSubmit() {
    let loggedInSuccessfully= await this.userService.login(this.email, this.password);
    if (!loggedInSuccessfully) {
      alert('Invalid credentials');
      return;
    }
    alert('Logged in!');
    this.router.navigate(['/tabs/home']);
  }
}
