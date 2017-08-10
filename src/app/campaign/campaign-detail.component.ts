import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import {CampaignService} from './campaign.service';
import {Campaign} from './';

@Component({
    selector: 'product-detail',
    templateUrl: './campaign-detail.component.html',
    styleUrls: [ './campaign-detail.component.css' ]
})
export class CampaignDetailComponent implements OnInit {
    campaign: Campaign;

    constructor(
        private campaignService: CampaignService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.campaignService.getCampaign(+params.get('id')))
            .subscribe(campaign => this.campaign = campaign);
    }

    save(): void {
        this.campaignService.update(this.campaign)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
