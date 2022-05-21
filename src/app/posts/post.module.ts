import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MatModuleModule } from "../mat-module/mat-module.module";
import { PostListComponent } from '../posts/post-list/post-list.component';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { RouterModule } from "@angular/router";





@NgModule({
  declarations:[
    PostListComponent,
    PostCreateComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatModuleModule,
    RouterModule

  ]
})
export class PostsModule {}
