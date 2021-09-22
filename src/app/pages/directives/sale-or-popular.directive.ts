import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { ItemsForSaleSelectors } from 'src/app/redux/selectors/items-for-sale.selectors';
import { PopularItemsSelectors } from 'src/app/redux/selectors/popular-items.selectors';
import { AppState } from 'src/app/redux/state.models';

@Directive({
    selector: '[appOnSaleOrPopular]',
})
export class SaleOrPopularDirective {
    private salesSubscribe!: Subscription;
    private popularSubscribe!: Subscription;

    constructor(
        private element: ElementRef<HTMLElement>,
        private render: Renderer2,
        private store: Store<AppState>,
        private poularSelectors: PopularItemsSelectors,
        private saleSelectors: ItemsForSaleSelectors
    ) {}

    @Input() set item(value: IGoodsBaseItem) {
        this.popularSubscribe = this.store
            .select(this.poularSelectors.selectPopularItems)
            .subscribe((items) => {
                if (items.find((item) => item.id === value.id)) {
                    const elem = this.render.createElement('div') as Node;
                    this.render.addClass(elem, 'popular');
                    this.render.appendChild(this.element.nativeElement, elem);
                }
            });
        this.salesSubscribe = this.store
            .select(this.saleSelectors.selectItemsForSale)
            .subscribe((items) => {
                if (items.find((item) => item.id === value.id)) {
                    const elem = this.render.createElement('div') as Node;
                    this.render.addClass(elem, 'on-sale');
                    this.render.appendChild(this.element.nativeElement, elem);
                }
            });
    }

    ngOnDestroy(): void {
        this.salesSubscribe.unsubscribe();
        this.popularSubscribe.unsubscribe();
    }
}
