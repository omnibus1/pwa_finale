import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaFormComponent } from './wycieczka-form.component';

describe('WycieczkaFormComponent', () => {
  let component: WycieczkaFormComponent;
  let fixture: ComponentFixture<WycieczkaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WycieczkaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
