import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommTestComponent } from './comm-test.component';

describe('CommTestComponent', () => {
  let component: CommTestComponent;
  let fixture: ComponentFixture<CommTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
