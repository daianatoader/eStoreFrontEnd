import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Campaign } from './campaign';

@Injectable()
export class CampaignService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private campaignsUrl = 'http://localhost:8080/campaigns';  // URL to web api

    constructor(private http: Http) { }

    getCampaigns(): Promise<Campaign[]> {
        return this.http.get(this.campaignsUrl)
            .toPromise()
            .then(response => response.json() as Campaign[])
            .catch(this.handleError);
    }


    getCampaign(id: number): Promise<Campaign> {
        const url = `${this.campaignsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Campaign)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.campaignsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(details: string): Promise<Campaign> {
        return this.http
            .post(this.campaignsUrl, JSON.stringify({details: details}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Campaign)
            .catch(this.handleError);
    }

    update(campaign: Campaign): Promise<Campaign> {
        const url = `${this.campaignsUrl}/${campaign.id}`;
        const obj = {id: campaign.id, details: campaign.details, period: campaign.period, discount: campaign.discount};
        return this.http
            .put(url, JSON.stringify(obj), {headers: this.headers})
            .toPromise()
            .then(() => campaign)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

