import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MovieDetails } from '../models/movieDetails.model';
import { Result } from '../models/moviePopular.model';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  moviesPopulars: Result;
  data: any;
  posterPath: string;
  imgPath =  'https://image.tmdb.org/t/p/w220_and_h330_face';

  constructor(private apiService: ApiService,
              private loadingController: LoadingController,
              private navController: NavController,
              private route: ActivatedRoute, ) {
  }

  options = {
    centeredSlides: true,
    loop: true,
    spaceBetween: -100,
  };

  public ngOnInit() {
    this.presentLoading();
    this.readPopular();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando filmes...',
      duration: 2000
    });
    await loading.present();
    await loading.onDidDismiss();
  }

  private async readPopular() {
    this.apiService.getMoviePopular().subscribe(data => {
      this.data = data;
      this.moviesPopulars = this.data.results;
      console.log(this.moviesPopulars);
    });
  }

  public irPara(movieDetais: MovieDetails) {
    this.navController.navigateForward(movieDetais.id, {
      relativeTo: this.route,
    });
  }
}
