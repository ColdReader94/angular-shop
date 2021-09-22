import { TestBed } from '@angular/core/testing';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { NestedSwiperComponent } from './nested-swiper.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Swiper', () => {
  const mockedData = ['test', '1', 'item'] as unknown as IGoodsBaseItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
      declarations: [
        NestedSwiperComponent,
      ],
    }).compileComponents();
  });

  it('slides images array should be empty', () => {
    const fixture = TestBed.createComponent(NestedSwiperComponent);
    const nestedSwiper = fixture.componentInstance;
    expect(nestedSwiper.slidesData).toHaveSize(0);
  });

  it('slides images array shoud be load to slider', () => {
    const fixture = TestBed.createComponent(NestedSwiperComponent);
    const nestedSwiper = fixture.componentInstance;
    nestedSwiper.slidesData = mockedData;
    expect(nestedSwiper.slidesData).toHaveSize(3);
  });
});
