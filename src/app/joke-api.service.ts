import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class JokeAPIService {

  constructor(private http: HttpClient) {}

  fetchJoke(){
    return this.http.get('https://icanhazdadjoke.com/', {
      headers: new HttpHeaders({"Accept": "application/json"})
    })
  }
}
