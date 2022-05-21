import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule} from '@angular/forms';
import { RouterModule } from "@angular/router";
import { MatModuleModule } from "../mat-module/mat-module.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent,
  ],
  imports:[
    CommonModule,
    FormsModule,
    MatModuleModule,
    RouterModule,
    FontAwesomeModule,
    AuthRoutingModule
  ]
})

export class AuthModule {}
