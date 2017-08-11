import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Section} from './section';
import {SectionService} from './section.service';

@Component({
    selector: 'my-sections',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.css']
})
export class SectionsComponent implements OnInit {
    sections: Section[];
    selectedSection: Section;

    constructor(private sectionService: SectionService,
                private router: Router) {
    }

    getSections(): void {
        this.sectionService
            .getSections()
            .then(sections => this.sections = sections);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.sectionService.create(name)
            .then(section => {
                this.sections.push(section);
                this.selectedSection = null;
            });
    }

    delete(section: Section): void {
        this.sectionService
            .delete(section.id)
            .then(() => {
                this.sections = this.sections.filter(h => h !== section);
                if (this.selectedSection === section) {
                    this.selectedSection = null;
                }
            });
    }

    ngOnInit(): void {
        this.getSections();
    }

    onSelect(section: Section): void {
        this.selectedSection = section;
    }

    gotoDetail(): void {
        this.router.navigate(['/sectionDetail', this.selectedSection.id]);
    }
}