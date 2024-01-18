import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkaManageItemComponent } from './wycieczka-manage-item.component';

describe('WycieczkaManageItemComponent', () => {
  let component: WycieczkaManageItemComponent;
  let fixture: ComponentFixture<WycieczkaManageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WycieczkaManageItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WycieczkaManageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
