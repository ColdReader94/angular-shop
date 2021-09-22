import { TestBed } from '@angular/core/testing';
import { IGoodsBaseItem } from 'src/app/core/models/goods.model';
import { SortService } from './sort.service';

describe('SortService', () => {
    let service: SortService;
    const mockedData = [{ name: 'phone', price: 2, rating: 3 }, { name: 'notebook', price: 1, rating: 5 },
    { name: 'notebook', price: 4, rating: 2 }] as IGoodsBaseItem[];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = new SortService();
    });

    it('service should exist', () => {
        expect(service).toBeTruthy();
    });

    it('sorting should be turned off untill user choose it type', (() => {
        expect(service.filterType).toEqual('');
    }));

    it('direction of sorting by default is should decrease', (() => {
        expect(service.sortDirection).toBeFalsy();
    }));

    it('sort by field function should be called and return same length', (() => {
        const result = service.sort(mockedData, 'price', true);
        expect(result).toHaveSize(3);
    }));

    it('sort should be by price when user click on it', (() => {
        service.sort(mockedData, 'price', true);
        expect(service.filterType).toMatch('price');
    }));

    it('sort direction should increase', (() => {
        service.sort(mockedData, 'price', true);
        expect(service.sortDirection).toBeTruthy();
    }));

});
