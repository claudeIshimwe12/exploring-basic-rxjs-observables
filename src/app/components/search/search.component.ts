import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Service } from '../../services/data.service';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  skip,
  takeWhile,
} from 'rxjs';
import { Post } from '../../models/post.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { CombinedData } from '../../models/combined-data.interface';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, AfterViewInit {
  data$!: Observable<CombinedData>;
  searchForm: FormGroup;
  constructor(private service: Service, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void {
    this.data$ = this.service.getCombinedData();
  }
  ngAfterViewInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((saerchTerm) => {
        this.data$ = this.service.getCombinedFilteredData(saerchTerm.search);
      });
  }
}
