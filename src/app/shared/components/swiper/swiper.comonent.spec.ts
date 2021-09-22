import { TestBed } from '@angular/core/testing';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { SwiperComponent } from './swiper.component';

describe('Swiper', () => {
  const mockedData = ['test', '1', 'item'] as unknown as IGoodsBaseItem[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SwiperComponent,
      ],
    }).compileComponents();
  });

  it('slides images array should be empty', () => {
    const fixture = TestBed.createComponent(SwiperComponent);
    const swiper = fixture.componentInstance;
    expect(swiper.slidesData).toHaveSize(0);
  });

  it('slides images array shoud be load to slider', () => {
    const fixture = TestBed.createComponent(SwiperComponent);
    const swiper = fixture.componentInstance;
    swiper.slidesData = mockedData;
    expect(swiper.slidesData).toHaveSize(3);
  });
});
