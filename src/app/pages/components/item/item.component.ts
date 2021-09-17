import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { tryToAddToFavourite } from 'src/app/redux/actions/user-data.actions';
import { AppState } from 'src/app/redux/state.models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() value!: IGoodsBaseItem;

  constructor(private store: Store<AppState>) {}

  public workWithFavourite(id: string): void {
    this.store.dispatch(tryToAddToFavourite({ itemId: id }));
  }
}
