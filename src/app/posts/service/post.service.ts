import { Post } from '../model/post.model';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private updatedPost = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(public http: HttpClient, public router: Router) {}

  getData( postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&currentPage=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.updatedPost.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getPostUpdateListener() {
    return this.updatedPost.asObservable();
  }
  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string,imagePath: string,creator:string }>(
      BACKEND_URL + id
    );
  }
  setPost(title: string, content: string, image: File) {
    // const post = { id: null, title: title, content: content };json can't be taken file upload data so we have to change the process
    const postData = new FormData(); //it is allow us to include text data and blob
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post(BACKEND_URL, postData)
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }
  updatePost(id: string, title: string, content: string, image: File | string) {

    // const post = { id: id, title: title, content: content ,imagePath:null};
    let postData: Post | FormData ;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('id',id)
      postData.append('title',title)
      postData.append('content',content);
      postData.append('image',image,title)
    }else{
       postData = { id: id, title: title, content: content ,imagePath:image,creator:null };
    }
     this.http.put(BACKEND_URL + id, postData).subscribe(response => {
      this.router.navigate(["/"]);
    })
  }

  deletPost(id) {
    return this.http
      .delete(BACKEND_URL + id);
  }
}
