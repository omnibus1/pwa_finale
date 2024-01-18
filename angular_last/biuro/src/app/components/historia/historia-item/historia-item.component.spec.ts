import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaItemComponent } from './historia-item.component';

describe('HistoriaItemComponent', () => {
  let component: HistoriaItemComponent;
  let fixture: ComponentFixture<HistoriaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoriaItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoriaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
