import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTreeV3Component } from './sum-tree-v3.component';

describe('SumTreeV3Component', () => {
  let component: SumTreeV3Component;
  let fixture: ComponentFixture<SumTreeV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumTreeV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumTreeV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
