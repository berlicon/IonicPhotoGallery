import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CatFact {
  length: number;
  fact: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  catFact = 'none';

  constructor(private menu: MenuController, 
    private http: HttpClient) {}

  getData() {
    this.getCatFact().subscribe(
      {
        next: (value: CatFact) => { this.catFact = value.fact; },
        error: (err: any) => { this.catFact = `Error: ${err}`; },
        complete: () => { console.log('complete'); },
      }
    );
  }

  getCatFact(): Observable<CatFact> {
    const url = 'https://catfact.ninja/fact?max_length=1000';
    return this.http.get<CatFact>(url)
      .pipe(
        tap(_ => console.log('fetched fact')),
      );
  }
}