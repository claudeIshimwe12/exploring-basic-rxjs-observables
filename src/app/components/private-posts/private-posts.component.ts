import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'private-posts',
  templateUrl: './private-posts.component.html',
  styleUrl: './private-posts.component.css',
})
export class PrivatePostsComponent implements OnInit {
  post!: Post;
  loading: boolean = false;

  constructor(private requests: RequestsService) {}

  ngOnInit() {
    this.loading = true;
    this.requests.getPrivatePosts().subscribe({
      next: (response) => {
        this.post = response;
        this.loading = false;
        console.log('Successful response received:', response);
      },
      error: (error) => {
        this.loading = false;
        console.log('Error after retries:', error.message);
      },
    });
  }
}
