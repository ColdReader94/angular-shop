import { ElementRef } from '@angular/core';
import { DropdownComponent } from './dropdown.component';


describe('DropdownComponent', () => {
  let component: DropdownComponent;

  beforeEach((() => {
    component = new DropdownComponent(new MockElementRef);
  }));

  it('dropdown element should exist', () => {
    expect(component).toBeTruthy();
  });

  it('dropdown element should be hidden after creating', () => {
    expect(component.dropDown).toBeFalsy();
  });

  it('dropdown element should hide if click was on any other element than itself', () => {
    component.dropDown = true;
    component.onClick(new Event('click'));
    expect(component.dropDown).toBeFalsy();
  });
});

export class MockElementRef extends ElementRef {
  constructor() { super(document.createElement('div')); }
}
