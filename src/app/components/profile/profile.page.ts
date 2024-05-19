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
  editingMode: boolean = false;
  constructor(private userService: UserService, private router: Router) {
  }

  ionViewWillEnter() {
    this.editingMode = false;
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
  toggleEditMode() {
    if (this.editingMode) {

      this.userService.updateUsername(this.user.id, this.user.username)
        .then(() => {
          console.log('Nombre de usuario actualizado correctamente');
        })
        .catch(error => {
          console.error('Error al actualizar el nombre de usuario:', error);
        });

      this.editingMode = false;
    } else {
      this.editingMode = true;
    }
  }

}
