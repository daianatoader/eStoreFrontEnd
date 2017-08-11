import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {Section} from './section';
import {SectionService} from './section.service';

@Component({
    selector: 'section-detail',
    templateUrl: './section-detail.component.html',
    styleUrls: ['./section-detail.component.css']
})
export class SectionDetailComponent implements OnInit {
    section: Section;

    constructor(private sectionService: SectionService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.sectionService.getSection(+params.get('id')))
            .subscribe(section => this.section = section);
    }

    save(): void {
        this.sectionService.update(this.section)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}