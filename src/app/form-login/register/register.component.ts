import {Component, OnInit} from '@angular/core';
import {SignUpForm} from '../../model/SignUpForm';
import {AuthService} from '../../service/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  status = 'Please fill in the form to create account!';
  emailFormControl = new FormControl('',[
    Validators.email
  ])
  constructor(private authService: AuthService,
              private router: Router) {
  }

  signUpForm: SignUpForm;
  hide = true;

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    console.log('signUpForm === ', this.signUpForm);
    this.authService.signUp(this.signUpForm).subscribe(data => {
      console.log('data == ', data);
      if(data.message === 'nouser'){
        this.status = 'Username is existed! Please try again!';
        return
      }
      if(data.message === 'noemail'){
        this.status = 'Email is existed! Please try again!';
        return;
      }
      if(data.message === 'yes'){
        this.status = 'Create account success --> Please Login'
        this.authService.setSuccess(this.status);
        this.router.navigate(['login'])
      }

    }, error => {
      this.status = 'Email is invalid! Ex: chinhcomhut@gmail.com'
    });
  }
}
