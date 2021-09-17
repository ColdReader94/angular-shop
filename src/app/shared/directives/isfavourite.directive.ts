import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { UserDataSelectors } from 'src/app/redux/selectors/user-data.selectors';
import { AppState } from 'src/app/redux/state.models';

@Directive({
  selector: '[appIsfavourite]',
})
export class IsfavouriteDirective {
  private favouriteItemsSubscribe!: Subscription;

  constructor(private element: ElementRef<HTMLElement>, private render: Renderer2,
    private store: Store<AppState>, private favouriteItemsSelectors: UserDataSelectors) {

  }

  @Input() set item(value: IGoodsBaseItem) {
    this.favouriteItemsSubscribe = this.store.select(this.favouriteItemsSelectors.selectItemsInFavourites).subscribe(
      items => {
        if (items.find(item => item === value.id)) {
          this.render.addClass(this.element.nativeElement, 'add-to-favourite-btn__active');
        }
      }
      );
  }

  ngOnDestroy(): void {
    this.favouriteItemsSubscribe.unsubscribe();
  }

}
