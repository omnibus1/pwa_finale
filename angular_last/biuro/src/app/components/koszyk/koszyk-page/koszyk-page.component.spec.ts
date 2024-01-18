import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoszykPageComponent } from './koszyk-page.component';

describe('KoszykPageComponent', () => {
  let component: KoszykPageComponent;
  let fixture: ComponentFixture<KoszykPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KoszykPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KoszykPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
