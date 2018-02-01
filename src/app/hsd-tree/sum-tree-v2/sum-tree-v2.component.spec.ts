import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTreeV2Component } from './sum-tree-v2.component';

describe('SumTreeV2Component', () => {
  let component: SumTreeV2Component;
  let fixture: ComponentFixture<SumTreeV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumTreeV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumTreeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
