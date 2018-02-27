import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumTreeRewriteComponent } from './sum-tree-rewrite.component';

describe('SumTreeRewriteComponent', () => {
  let component: SumTreeRewriteComponent;
  let fixture: ComponentFixture<SumTreeRewriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumTreeRewriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumTreeRewriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
