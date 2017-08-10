import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Campaign }                from './';
import { CampaignService }         from './campaign.service';

@Component({
    selector: 'my-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: [ './campaigns.component.css' ]
})
export class CampaignsComponent implements OnInit {
    campaigns: Campaign[];
    selectedCampaign: Campaign;

    constructor(
        private campaignService: CampaignService,
        private router: Router) { }

    getCampaigns(): void {
        this.campaignService
            .getCampaigns()
            .then(campaigns => this.campaigns = campaigns);
    }

    add(details: string): void {
        details = details.trim();
        if (!details) { return; }
        this.campaignService.create(details)
            .then(campaign => {
                this.campaigns.push(campaign);
                this.selectedCampaign = null;
            });
    }

    delete(campaign: Campaign): void {
        this.campaignService
            .delete(campaign.id)
            .then(() => {
                this.campaigns = this.campaigns.filter(h => h !== campaign);
                if (this.selectedCampaign === campaign) { this.selectedCampaign = null; }
            });
    }

    ngOnInit(): void {
        this.getCampaigns();
    }

    onSelect(campaign: Campaign): void {
        this.selectedCampaign = campaign;
    }

    gotoDetail(): void {
        this.router.navigate(['/campaignDetail', this.selectedCampaign.id]);
    }
}
