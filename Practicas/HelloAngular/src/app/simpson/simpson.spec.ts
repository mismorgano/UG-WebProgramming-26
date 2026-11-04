import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Simpson } from './simpson';

describe('Simpson', () => {
  let component: Simpson;
  let fixture: ComponentFixture<Simpson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simpson],
    }).compileComponents();

    fixture = TestBed.createComponent(Simpson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
