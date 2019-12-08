import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeysDialogComponent } from './hotkeys-dialog.component';

describe('HotkeysDialogComponent', () => {
  let component: HotkeysDialogComponent;
  let fixture: ComponentFixture<HotkeysDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotkeysDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
