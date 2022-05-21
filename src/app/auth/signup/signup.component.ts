import { Component, OnDestroy, OnInit } from '@angular/core';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false
  faLock = faLock;
  private authStatusSub : Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe()
  }
  onSignUp(formData: NgForm){
    if(formData.invalid){
      return
    }
    this.isLoading = true
    this.authService.createUser(formData.value.email, formData.value.password);
  }

}
