import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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

  readonly isSubmitting = signal(false);
  readonly submitState = signal<'idle' | 'success' | 'error'>('idle');
  readonly submitMessage = signal<string | null>(null);

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

    this.isSubmitting.set(true);
    this.submitState.set('idle');
    this.submitMessage.set(null);

    const payload = {
      fullName: this.fullName?.value,
      email: this.email?.value,
      message: this.message?.value
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        this.submitState.set('success');
        this.submitMessage.set('Thanks for reaching out. I typically reply within 1-2 business days.');
        this.contactForm.reset();
      })
      .catch(() => {
        this.submitState.set('error');
        this.submitMessage.set('Unable to send right now. Please email me directly at ahmad.alshaib@outlook.com.');
      })
      .finally(() => this.isSubmitting.set(false));
  }
}
