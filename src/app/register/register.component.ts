import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registered = false;
	submitted = false;
	userForm: FormGroup;

  constructor(private formBuilder: FormBuilder)
  {

  }

  invalidFirstName()
  {
  	return (this.submitted && this.userForm.controls.first_name.errors != null);
  }

  invalidLastName()
  {
  	return (this.submitted && this.userForm.controls.last_name.errors != null);
  }

  invalidEmail()
  {
  	return (this.submitted && this.userForm.controls.email.errors != null);
  }

  

  invalidPassword()
  {
  	return (this.submitted && this.userForm.controls.password.errors != null);
  }

  ngOnInit()
  {
  	this.userForm = this.formBuilder.group({
  		first_name: ['', Validators.required],
  		last_name: ['', Validators.required],
  		email: ['', [Validators.required, Validators.email]],
  		password: ['', [Validators.required, Validators.minLength(5)]],
  	});
  }

  onSubmit()
  {
  	this.submitted = true;
  	if(this.userForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
  		this.registered = true;
  	}
  }

};