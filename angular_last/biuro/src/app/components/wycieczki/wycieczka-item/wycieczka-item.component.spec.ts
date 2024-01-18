import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaItemComponent } from './wycieczka-item.component';

describe('WycieczkaItemComponent', () => {
  let component: WycieczkaItemComponent;
  let fixture: ComponentFixture<WycieczkaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WycieczkaItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
