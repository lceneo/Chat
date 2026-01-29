import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  userGuid = signal('');
  
  authForm = new FormGroup({
    userGuid: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)]
    })
  });

  // Computed properties for validation
  isFormValid = computed(() => this.authForm.valid);
  isUserGuidInvalid = computed(() => {
    const control = this.authForm.get('userGuid');
    return control?.invalid && control?.touched;
  });

  onSubmit() {
    if (this.authForm.valid) {
      const userGuid = this.authForm.get('userGuid')?.value;
      console.log('User GUID submitted:', userGuid);
      // Here you would typically authenticate the user
      // For example, emit the GUID to a service or send to backend
    }
  }
}