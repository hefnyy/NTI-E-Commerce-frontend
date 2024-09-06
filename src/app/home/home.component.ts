import { Component } from '@angular/core';
import { BestsellerComponent } from "../bestseller/bestseller.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BestsellerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
