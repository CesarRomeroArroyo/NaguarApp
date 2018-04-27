import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBackComponent } from './menu-back.component';

describe('MenuBackComponent', () => {
  let component: MenuBackComponent;
  let fixture: ComponentFixture<MenuBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
