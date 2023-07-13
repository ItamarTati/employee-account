import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { By } from '@angular/platform-browser';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading message', () => {
    const loadingElement = fixture.debugElement.query(
      By.css('.loading p'),
    ).nativeElement;
    expect(loadingElement.textContent).toContain('Loading...');
  });

  it('should have a mat-spinner element', () => {
    const spinnerElement = fixture.debugElement.query(
      By.css('.loading mat-spinner'),
    );
    expect(spinnerElement).toBeTruthy();
  });
});
