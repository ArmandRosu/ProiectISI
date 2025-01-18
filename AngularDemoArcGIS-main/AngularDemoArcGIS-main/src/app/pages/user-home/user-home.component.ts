import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  authenticatedUser: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authenticatedUser = localStorage.getItem('email');
  }
}
