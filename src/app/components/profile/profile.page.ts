import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ProfilePage {
  user: User = {id:'', username:'', email:'', profilePicture:''};
  picture = '/assets/images/profile.png';
  constructor(private userService: UserService, private router: Router) {
  }

  ionViewWillEnter() {
    this.userService.getCurrentUser().then(user => {
      if (user) {
        this.user = user;
        this.getProfilePicture();
      }
    }).catch(error => {
      console.error('Error al obtener el usuario:', error);
    });
  }
  getProfilePicture(){
    if (this.user.profilePicture){
      this.userService.referenceToFileInCloudStorage(this.user.profilePicture).then((picture)=>{this.picture = picture})
    }
  }

  logOut(){
    this.userService.logout().then(() => this.router.navigate(['/tabs/home']));
  }

}
