import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkiPageComponent } from './wycieczki-page.component';

describe('WycieczkiPageComponent', () => {
  let component: WycieczkiPageComponent;
  let fixture: ComponentFixture<WycieczkiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WycieczkiPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
