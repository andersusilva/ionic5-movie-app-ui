import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MovieParams } from '../models/movieDetails.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = 'https://api.themoviedb.org/3';
  private apiKey = 'ac583648495fd6fa53e1587866e842bb';
  private language = 'pt-BR';
  private options: any = { headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8' })};


  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  getMoviePopular(){
    return this.http.get(
      `${this.api}/movie/popular?api_key=${this.apiKey}&language=${this.language}`,
       this.options
    );
  }

  getMovieDetails(movieId: MovieParams){
    return this.http.get(
      `${this.api}/movie/${movieId}?api_key=${this.apiKey}&language=${this.language}`,
       this.options
    );
  }
}
