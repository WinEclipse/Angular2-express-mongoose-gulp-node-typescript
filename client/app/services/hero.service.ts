/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */

import {Injectable} from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Hero} from "../models/hero";

@Injectable()
export class HeroService {

    private heroesUrl = 'http://localhost:8080/api/heroes/aaaaa';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        console.log("http options:    " + this.http.options);
        console.log("http:  " + this.http);
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getHero(id: string) {
        console.log("http options:    " + this.http.options);
        console.log("http:  " + this.http);
        return this.http.get(this.heroesUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero>  {
        console.log("http options:    " + this.http.options);
        console.log("http:  " + this.http);
        if (hero._id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers:headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero._id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero._id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}