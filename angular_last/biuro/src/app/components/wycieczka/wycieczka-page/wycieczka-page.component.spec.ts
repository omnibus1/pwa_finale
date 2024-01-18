import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaPageComponent } from './wycieczka-page.component';

describe('WycieczkaPageComponent', () => {
  let component: WycieczkaPageComponent;
  let fixture: ComponentFixture<WycieczkaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WycieczkaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
