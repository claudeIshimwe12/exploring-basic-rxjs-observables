import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, retry, tap } from 'rxjs';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  // Simulate an HTTP request with random success or failure
  getPrivatePosts(): Observable<Post> {
    const randomSuccess = Math.random() > 0.5; // Randomly succeed or fail

    return of({
      id: 1,
      title: 'NBA Championships leader of all time',
      description:
        ' The Celtics compete in the National Basketball Association (NBA) as a member of the Atlantic Division of the Eastern Conference. Founded in 1946 as one of the leagues original eight teams, the Celtics play their home games at TD Garden, a shared arena with the NHL s Boston Bruins. The Celtics are commonly regarded as the most successful team in NBA history and hold the records for most NBA championships won, with 18, and most recorded wins of any NBA franchise',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Sandra_Bullock_in_July_2013.jpg',
    }).pipe(
      delay(2000),
      tap(() => console.log('HTTP request initiated')),
      tap(() => {
        if (!randomSuccess) {
          throw new Error('Request failed!');
        }
      }),
      retry(3), // Retry 3 times before failing
      catchError((error) => {
        console.error('Error encountered:', error.message);
        return of({ id: 0, title: '', description: '', image: '' }); // The fallback value
      }),
      tap((response) => console.log('Final response:', response))
    );
  }
}
