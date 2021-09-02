import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { changeCity } from 'src/app/redux/actions/settings.actions';
import { SettingsSelectors } from 'src/app/redux/selectors/settings.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public currentCity$ = of('');
    public error$: Observable<Error | null> = of(null);

    constructor(private store: Store<AppState>, public selectors: SettingsSelectors) {}

    ngOnInit(): void {
        this.currentCity$ = this.store.select(this.selectors.selectCurrentCity);
        this.error$ = this.store.select(this.selectors.selectSettingsError);
        this.getGeolocation();
    }

    private getGeolocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => this.store.dispatch(changeCity(position.coords)));
        } else {
            this.currentCity$ = of('Please turn on geolocation');
        }
    }
}
