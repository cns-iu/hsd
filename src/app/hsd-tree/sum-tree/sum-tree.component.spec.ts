import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTreeComponent } from './sum-tree-.component';

describe('SumTreeComponent', () => {
  let component: SumTreeComponent;
  let fixture: ComponentFixture<SumTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
