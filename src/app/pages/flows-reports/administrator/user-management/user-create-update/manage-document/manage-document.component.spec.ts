import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentComponent } from './manage-document.component';

describe('ManageDocumentComponent', () => {
  let component: ManageDocumentComponent;
  let fixture: ComponentFixture<ManageDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDocumentComponent]
    });
    fixture = TestBed.createComponent(ManageDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
