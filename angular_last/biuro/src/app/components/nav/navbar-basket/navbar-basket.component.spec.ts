import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBasketComponent } from './navbar-basket.component';

describe('NavbarBasketComponent', () => {
  let component: NavbarBasketComponent;
  let fixture: ComponentFixture<NavbarBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarBasketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
