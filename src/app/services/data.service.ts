import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class Service {
  // An alternitive way of creating the users$ using (of) operator

  // users$: Observable<User[]> = of([
  //   { id: 1, name: 'John', email: 'johndoe@gmail.com' },
  //   { id: 2, name: 'Jason', email: 'jasont@hotmail.com' },
  //   { id: 3, name: 'Brown', email: 'jb@comcast.com' },
  // ]);

  users$: Observable<User[]> = new Observable((observer) => {
    observer.next([
      { id: 1, name: 'John', email: 'johndoe@gmail.com' },
      { id: 2, name: 'Jason', email: 'jasont@hotmail.com' },
      { id: 3, name: 'Brown', email: 'jb@comcast.com' },
    ]);
  });
  posts$: Observable<Post[]> = of([
    {
      id: 1,
      title: 'NBA Championships leader of all time',
      description:
        ' The Celtics compete in the National Basketball Association (NBA) as a member of the Atlantic Division of the Eastern Conference. Founded in 1946 as one of the leagues original eight teams, the Celtics play their home games at TD Garden, a shared arena with the NHL s Boston Bruins. The Celtics are commonly regarded as the most successful team in NBA history and hold the records for most NBA championships won, with 18, and most recorded wins of any NBA franchise',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/190px-Boston_Celtics.svg.png',
    },
    {
      id: 2,
      title: 'Real Madrid: European Glory',
      description:
        "Real Madrid has been a dominant force in European football, winning the UEFA Champions League a record 14 times. The team's rich history is filled with legendary players and unforgettable moments that have cemented their place in football lore.",
      image:
        'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    },
    {
      id: 3,
      title: 'Formula 1: A Legacy of Speed',
      description:
        "Formula 1 is the highest class of international single-seater auto racing sanctioned by the Fédération Internationale de l'Automobile (FIA). The series has been one of the premier forms of racing around the world since its inaugural season in 1950.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ferrari_Formula_1_lineup_at_the_N%C3%BCrburgring.jpg/260px-Ferrari_Formula_1_lineup_at_the_N%C3%BCrburgring.jpg',
    },

    {
      id: 4,
      title: 'The Rise of Esports',
      description:
        'Esports has rapidly grown into a multi-billion dollar industry, with professional players, teams, and leagues forming around popular video games. Tournaments fill stadiums and attract millions of online viewers globally.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/LGD_Gaming_at_the_2015_LPL_Summer_Finals.jpg/220px-LGD_Gaming_at_the_2015_LPL_Summer_Finals.jpg',
    },
    {
      id: 5,
      title: 'Tokyo 2020 Olympics: A Historic Event',
      description:
        'The Tokyo 2020 Olympics, held in 2021 due to the COVID-19 pandemic, was a unique and historic event. Despite the challenges, athletes from around the world delivered stunning performances, breaking numerous records.',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/2020_Summer_Olympics_logo_new.svg/800px-2020_Summer_Olympics_logo_new.svg.png',
    },
    {
      id: 6,
      title: 'Wimbledon: The Pinnacle of Tennis',
      description:
        'Wimbledon is the oldest tennis tournament in the world and is widely regarded as the most prestigious. Held in London, it is one of the four Grand Slam tennis tournaments, and the only one still played on grass courts.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Elena_Rybakina_%26_Venus_Rosewater_Dish_2022.jpg/220px-Elena_Rybakina_%26_Venus_Rosewater_Dish_2022.jpg',
    },
    {
      id: 7,
      title: 'Super Bowl: The Ultimate Showdown',
      description:
        'The Super Bowl is the annual championship game of the National Football League (NFL). It is one of the most-watched television events in the United States, featuring elaborate halftime shows and performances by top artists.',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Super_Bowl_logo.svg/800px-Super_Bowl_logo.svg.png',
    },
    {
      id: 8,
      title: 'Tour de France: Cycling at its Best',
      description:
        "The Tour de France is an annual men's multiple stage bicycle race primarily held in France. It is one of the most well-known and prestigious cycling events in the world, attracting top cyclists from around the globe.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Tour_de_France_logo_%28black_background%29.svg/800px-Tour_de_France_logo_%28black_background%29.svg.png',
    },
    {
      id: 9,
      title: 'FIFA World Cup: A Global Spectacle',
      description:
        'The FIFA World Cup is the most prestigious football tournament in the world, with billions of fans tuning in to watch. It is held every four years, with national teams from around the globe competing for the coveted trophy.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/2023FWWC_Final_%28celebration%29.jpg/225px-2023FWWC_Final_%28celebration%29.jpg',
    },
    {
      id: 10,
      title: "The Masters: Golf's Green Jacket",
      description:
        'The Masters Tournament, one of the four major championships in professional golf, is held annually at Augusta National Golf Club. The winner receives the coveted Green Jacket, symbolizing one of the highest honors in the sport.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/AugustaNationalMastersLogoFlowers.jpg/250px-AugustaNationalMastersLogoFlowers.jpg',
    },
  ]);

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getPosts(): Observable<Post[]> {
    return this.posts$.pipe(delay(750));
  }
  getFilteredPosts(term: string): Observable<Post[]> {
    return this.posts$.pipe(
      map((posts) =>
        posts.filter((post) =>
          post.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )
      )
    );
  }
}
