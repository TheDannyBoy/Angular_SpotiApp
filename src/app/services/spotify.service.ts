import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas:any[] = [];
  urlSpotify:string = 'https://api.spotify.com/v1/';
  token:string = 'BQAsrE1PwGFyUZXPMwbzT-W7ml8zeprpzafUdrsOFKvgFvh7PLuYhbLCoxqGzRPoWlNKuYC8S79y6M6EBQw';

  constructor(public http:HttpClient) {
    console.log("Spotify Service Ready!!")
  }

  private getHeaders(): HttpHeaders{
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    });

    return headers;
  }

  getArtistTopTracks( id:string ){
    let url = `${ this.urlSpotify }artists/${ id }/top-tracks?country=ES`;
    let headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  getartista( id: string ){
    let url = `${ this.urlSpotify }artists/${ id }`;
    let headers = this.getHeaders();
    return this.http.get(url, { headers });
      // .map( (resp: any) => {
      //   this.artistas = resp.artists.items;
      //   return this.artistas;
      // });
  }

  getArtistas(termino: string){
    let url = `${ this.urlSpotify }search?query=${ termino }&type=artist&limit=20`;
    let headers = this.getHeaders();

    return this.http.get(url, { headers })
      .map( (resp: any) => {
        this.artistas = resp.artists.items;
        return this.artistas;
      });
  }


}
