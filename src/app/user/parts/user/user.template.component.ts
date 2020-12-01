import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../user.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'user-template',
  templateUrl: './user.template.component.html',
  styleUrls: ['./user.template.component.scss']
})

export class UserTemplateComponent implements OnInit {

  user!: User;
  userForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserTemplateComponent>,
              private _formBuilder: FormBuilder,
              private _userService: UserService,
              private _toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data ? data : new User();
  }

  ngOnInit(): void {
    this.userForm = this.createUserForm();
  }

  save(): void {
    if (!this.userForm.valid) {
      this.openSnackBarError('Preencha todos os campos obrigatórios!!');
      return;
    }

    const data = this.userForm.getRawValue();
    const sub = this.user.id ? this._userService.update(this.user.id, data) : this._userService.save(data);
    sub.subscribe(data => {
        this.openSnackBarSuccess('Usuário cadastrado com sucesso!!');
        this._userService.onChangeUser();
        this.dialogRef.close(data);
      },
      error => {
        this.openSnackBarError('Erro ao casdastrar Usuário!!');
      }
    );
  }

  createUserForm(): FormGroup {
    return this._formBuilder.group({
      name: [this.user ? this.user.name : '', Validators.required],
    });
  }

  openSnackBarError(message: string): void {
    this._toast.error(message);
  }

  openSnackBarSuccess(message: string): void {
    this._toast.success(message);
  }
}
