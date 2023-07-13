import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label and value', () => {
    const label = 'First Name';
    const value = 'John Doe';

    component.label = label;
    component.value = value;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('.field-label');
    const valueElement = fixture.nativeElement.querySelector('.field-value');

    expect(labelElement.textContent).toBe(label);
    expect(valueElement.textContent).toBe(value);
  });
});
