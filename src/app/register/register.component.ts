import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../shared/Register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[RegisterService]
})
export class RegisterComponent implements OnInit {
  registered = false;
	submitted = false;
	userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private registerService:RegisterService)
  {

  }

  invalidFirstName()
  {
  	return (this.submitted && this.userForm.controls.name.errors != null);
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
  		name: ['', Validators.required],
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
      this.registerService.postUser(this.userForm.value).subscribe((res)=>{
        console.log(res);
      
      }
      );
  }
  }
};