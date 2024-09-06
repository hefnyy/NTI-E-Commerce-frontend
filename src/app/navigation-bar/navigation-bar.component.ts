import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent implements OnInit {
  logo: string = "logo/favicon.jpg";
  isLogin: boolean = false;
  constructor(private _authenaticationService: AuthenaticationsService, private _Router: Router){}


  logout(){
    this._authenaticationService.logout();
    this._Router.navigate(['/login'])
  }
  ngOnInit() {
    // if(this._authenaticationService.loggedInUser!==null)
    //   this.isLogin=true;
    // else
    //   this.isLogin=false;
    this._authenaticationService.loggedInUser.subscribe(() => {
      if (this._authenaticationService.loggedInUser.getValue() !== null)
        this.isLogin = true;
      else
        this.isLogin = false;
    })
    console.log(this.isLogin);
  }
}
