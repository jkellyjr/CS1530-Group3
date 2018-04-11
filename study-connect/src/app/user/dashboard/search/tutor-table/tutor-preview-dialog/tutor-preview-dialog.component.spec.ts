import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPreviewDialogComponent } from './tutor-preview-dialog.component';

describe('TutorPreviewDialogComponent', () => {
  let component: TutorPreviewDialogComponent;
  let fixture: ComponentFixture<TutorPreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
