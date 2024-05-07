import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    console.log("hola")
  }

  onSubmit() {
    this.userService.login(this.email, this.password).then(
      () => {
        alert('Logged in!');
        this.router.navigate(['/home']);
      }
    );
  }
}
