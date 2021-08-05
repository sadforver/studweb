import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudinfoComponent } from './studinfo.component';

describe('StudinfoComponent', () => {
  let component: StudinfoComponent;
  let fixture: ComponentFixture<StudinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
