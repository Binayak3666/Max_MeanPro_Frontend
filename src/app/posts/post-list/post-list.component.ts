import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from './../model/post.model';
import { PostService } from '../service/post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;
  userIsAuthonticated = false
  userId: string;
  private authListenerSub: Subscription;

  constructor(public postsService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getData(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthonticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(authonticatedStatus => {
    this.userIsAuthonticated = authonticatedStatus;
    this.userId = this.authService.getUserId();
    })
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe()
    this.authListenerSub.unsubscribe()
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getData(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletPost(postId).subscribe({next:() => {
      this.postsService.getData(this.postsPerPage, this.currentPage);
    },error:()=>{
      this.isLoading = false
    }});
  }

}
