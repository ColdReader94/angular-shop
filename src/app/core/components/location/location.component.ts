import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { changeCitySuccessful, changeCity } from 'src/app/redux/actions/user-data.actions';
import { SettingsSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
    public currentCity$ = of('');

    constructor(private store: Store<AppState>, public selectors: SettingsSelectors) {}

    ngOnInit(): void {
        this.currentCity$ = this.store.select(this.selectors.selectCurrentCity);
        this.getGeolocation();
    }

    public changeCity(event: Event): void {
        this.store.dispatch(changeCitySuccessful({ city: (<HTMLElement>event.target).textContent as string }));            
    }
    private getGeolocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => this.store.dispatch(changeCity({ coords: position })));
        } else {
            this.currentCity$ = of('Please turn on geolocation');
        }
    }

}
