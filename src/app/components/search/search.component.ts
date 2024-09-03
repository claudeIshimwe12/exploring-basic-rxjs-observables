import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/data.service';
import { debounceTime, Observable } from 'rxjs';
import { Post } from '../../models/post.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  posts$!: Observable<Post[]>;
  searchForm: FormGroup;
  constructor(private service: Service, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: '',
    });
  }
  ngOnInit(): void {
    this.posts$ = this.service.getPosts();
    this.searchForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((saerchTerm) => {
        this.posts$ = this.service.getFilteredPosts(saerchTerm.search);
      });
  }
}
