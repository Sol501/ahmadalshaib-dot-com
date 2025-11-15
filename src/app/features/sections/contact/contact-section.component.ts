import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [SectionHeadingComponent, ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'contact',
    class: 'page-section contact-section'
  }
})
export class ContactSectionComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly contactForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  readonly formInvalid = computed(() => this.contactForm.invalid && this.contactForm.touched);

  get fullName() {
    return this.contactForm.get('fullName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  isFieldInvalid(field: 'fullName' | 'email' | 'message'): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Placeholder: integration with backend or external service can be added later.
    // eslint-disable-next-line no-alert
    alert('Thanks for reaching out! I will get back to you shortly.');
    this.contactForm.reset();
  }
}
