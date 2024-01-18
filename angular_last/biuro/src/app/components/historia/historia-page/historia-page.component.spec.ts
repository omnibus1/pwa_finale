import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaPageComponent } from './historia-page.component';

describe('HistoriaPageComponent', () => {
  let component: HistoriaPageComponent;
  let fixture: ComponentFixture<HistoriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoriaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
