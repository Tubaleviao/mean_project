import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'login',
    templateUrl: '../templates/login.html'
})
export class LoginComponent {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) {
        this.form = formBuilder.group({
            'userData': formBuilder.group({
                'username': ['Asaad', 
                    Validators.required],
                'email': ['', Validators.required,
                (fc)=>this.asyncExampleValidator(fc,http)]
            }),
            'password': ['', Validators.required]
        });
        this.form.valueChanges.subscribe(console.log);
    }

    onSubmit() {
        console.log(this.form)
        this.http.get('http://localhost:3000/jwt')
        .subscribe(r => console.log(r))
    }

    asyncExampleValidator(control: FormControl, http: HttpClient): Promise<any> | Observable<any> {
        // { 'invalid': true } for not ok
        // null for ok
        return http.get('http://localhost:3000/unique?email='+control.value);
    }

}
