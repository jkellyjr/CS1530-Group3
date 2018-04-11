import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPreviewDialogComponent } from './group-preview-dialog.component';

describe('GroupPreviewDialogComponent', () => {
  let component: GroupPreviewDialogComponent;
  let fixture: ComponentFixture<GroupPreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
