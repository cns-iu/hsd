import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinoSumTreeComponent } from './dino-sum-tree.component';

describe('DinoSumTreeComponent', () => {
  let component: DinoSumTreeComponent;
  let fixture: ComponentFixture<DinoSumTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinoSumTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinoSumTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
