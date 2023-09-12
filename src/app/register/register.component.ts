import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
              private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: [''],
      username: ['', [Validators.required]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.areMatchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () =>  this.registerForm?.controls['confirmPassword'].updateValueAndValidity()
    })

  }

  areMatchValues(matchTo: string) {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : {matchError: true};
    }
  }

  private getDateOnly(dateString: string | undefined): string | undefined {
    if(dateString == null || dateString === '')
      return ;
    const dateHelper = new Date(dateString);
    dateHelper.setMinutes(dateHelper.getMinutes() - dateHelper.getTimezoneOffset());
    return new Date(dateHelper).toISOString().split('T')[0];

  }

  register() {
    const dateOfBirth = this.getDateOnly(this.registerForm.value.dateOfBirth);
    const values = {...this.registerForm.value, dateOfBirth};
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
      },
      error: error => {
        this.validationErrors = error;
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
