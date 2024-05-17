import {Component, OnInit, Renderer2} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import {IonIcon, IonTabBar, IonTabButton, IonTabs} from "@ionic/angular/standalone";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    IonTabButton,
    IonIcon,
    IonTabs,
    IonTabBar
  ],
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage implements OnInit{
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
