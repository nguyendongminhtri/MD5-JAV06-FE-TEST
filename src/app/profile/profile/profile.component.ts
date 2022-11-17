import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {

  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']).then(()=>{
      location.reload();
    })
  }
}
