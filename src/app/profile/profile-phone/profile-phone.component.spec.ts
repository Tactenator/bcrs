import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhoneComponent } from './profile-phone.component';

describe('ProfilePhoneComponent', () => {
  let component: ProfilePhoneComponent;
  let fixture: ComponentFixture<ProfilePhoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePhoneComponent]
    });
    fixture = TestBed.createComponent(ProfilePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
