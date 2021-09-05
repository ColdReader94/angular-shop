import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public contactsDropDown = false;

    public contactsDropDownToggle(): void {
        this.contactsDropDown = !this.contactsDropDown;
    }
}
