import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

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

  invalidZipcode()
  {
  	return (this.submitted && this.userForm.controls.zipcode.errors != null);
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
  		zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
  		password: ['', [Validators.required, Validators.minLength(5)]],
  	});
  }

  onSubmit()
  {
  	this.submitted = true;
console.log(this.submitted)
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
