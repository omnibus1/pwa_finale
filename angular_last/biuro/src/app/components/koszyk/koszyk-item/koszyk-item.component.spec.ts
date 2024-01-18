import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoszykItemComponent } from './koszyk-item.component';

describe('KoszykItemComponent', () => {
  let component: KoszykItemComponent;
  let fixture: ComponentFixture<KoszykItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KoszykItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KoszykItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
