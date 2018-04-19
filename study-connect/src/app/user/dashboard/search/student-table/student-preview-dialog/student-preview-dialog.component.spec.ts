import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPreviewDialogComponent } from './student-preview-dialog.component';

describe('StudentPreviewDialogComponent', () => {
  let component: StudentPreviewDialogComponent;
  let fixture: ComponentFixture<StudentPreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
