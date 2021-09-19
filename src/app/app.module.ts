import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { INTERCEPTOR_PROVIDERS } from './orders/interceptors/providers';
import { PagesModule } from './pages/pages.module';
import { CategoriesEffects } from './redux/effects/categories.effects';
import { ItemsForSaleEffects } from './redux/effects/items-for-sale.effects';
import { PopularItemsEffects } from './redux/effects/popular-items.effects';
import { userDataEffects } from './redux/effects/user-data.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        PagesModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot(
            {},
            {
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                    strictStateSerializability: true,
                    strictActionWithinNgZone: true,
                    strictActionTypeUniqueness: true,
                },
            }
        ),
        EffectsModule.forRoot([
            userDataEffects,
            CategoriesEffects,
            ItemsForSaleEffects,
            PopularItemsEffects,
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
        }),
    ],
    providers: [INTERCEPTOR_PROVIDERS],
    bootstrap: [AppComponent],
})
export class AppModule {}
