import { Component } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    public isPopupShow = false;

    public popupShow(): void {
        this.isPopupShow = true;
    }

    public popupClose(): void {
        this.isPopupShow = false;
    }
}