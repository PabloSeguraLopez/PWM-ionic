import {Component, OnInit, Renderer2} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    IonicModule
  ],
  styleUrls: ['./header.page.scss']
})
export class HeaderPage implements OnInit{
  islogged: boolean = false;
  constructor(private router: Router, private renderer: Renderer2, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.isLoggedIn().subscribe(isLogged => {
      this.islogged = isLogged;
    });
  }

  logOut(){
    this.userService.logout();
    this.islogged = false;
  }
}