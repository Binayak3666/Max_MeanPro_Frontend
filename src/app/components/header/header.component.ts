import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthonticated = false
  private authListenerSub: Subscription;

  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
    this.userIsAuthonticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(authonticatedStatus =>{
      this.userIsAuthonticated = authonticatedStatus;
    });
  }
  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}
