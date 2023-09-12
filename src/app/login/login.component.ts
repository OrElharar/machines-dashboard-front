import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Output() closeLoginForm = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
              private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.accountService.login(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.closeLoginForm.emit(false);
      },
      error: error => {
        this.validationErrors = error;
      }
    });
  }

  cancel() {
    this.closeLoginForm.emit(false);
  }
}
