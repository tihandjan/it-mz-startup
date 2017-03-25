import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
@Component({
    moduleId: module.id,
    selector: 'app-admin',
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.router.navigate(['/admin/dashboard'])
    }
}