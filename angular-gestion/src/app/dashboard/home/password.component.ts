import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-password',
  template: `    
    <h5>Password generator</h5>
    <form>
      <div class="form-group col">
        <div class="col-sm-6 mb-3">
          <input id="passwordOutput" class="mb-3" #passwordOutput value="{{newPassword}}" />
          <input type="range" (change)="updatePasswordLength($event)" min="4" max="32" step="1" value="{{passwordLenght}}" />
          <input type="text" value="{{passwordLenght}}" />
          <div class="flex">
        <span *ngFor="let checkbox of checkboxes">
          <input type="checkbox" class="ml-2" (change)="updateCheckboxValue($event)" id="{{checkbox.id}}" [checked]="checkbox.checked" />
          <label for="{{checkbox.id}}">{{checkbox.label}}</label>
        </span>
          </div>
        </div>
        <div class="col-sm-4">
          <button type="button" class="btn btn-outline-success" (click)="generatePassword()">{{buttonLabel}}</button>
        </div>
      </div>
    </form>
    `,
})
export class PasswordComponent {
  // Alternative for checkboxes
  checkboxes = [
    {
      "id": "lowercase",
      "label": "a-z",
      "library": "abcdefghijklmnopqrstuvwxyz",
      "checked": true
    }, {
      "id": "uppercase",
      "label": "A-Z",
      "library": "ABCDEFGHIJKLMNOPWRSTUVWXYZ",
      "checked": true
    }, {
      "id": "numbers",
      "label": "0-9",
      "library": "0123456789",
      "checked": true
    }, {
      "id": "symbols",
      "label": "!-?",
      "library": "!@#$%^&*-_=+\\|:;',.\<>/?~",
      "checked": false
    }
  ];
  dictionary: Array<String>;

  lowercase: Boolean = this.checkboxes[0].checked;
  uppercase: Boolean = this.checkboxes[1].checked;
  numbers: Boolean = this.checkboxes[2].checked;
  symbols: Boolean = this.checkboxes[3].checked;

  passwordLenght: Number = 4;
  buttonLabel: String = "Generate";
  newPassword: String;

  // Password length
  private updatePasswordLength(event) {
    this.passwordLenght = event.target.value;
  }

  // Checkbox value
  private updateCheckboxValue(event) {
    if (event.target.id == "lowercase")
      this.lowercase = event.target.checked;

    if (event.target.id == "uppercase")
      this.uppercase = event.target.checked;

    if (event.target.id == "numbers")
      this.numbers = event.target.checked;

    if (event.target.id == "symbols")
      this.symbols = event.target.checked;
  }

  // Copy password to clipboard
  @ViewChild('passwordOutput',{static:true}) password: ElementRef;
  private copyPassword() {
    const inputElement = <HTMLInputElement>this.password.nativeElement;
    inputElement.select();
    document.execCommand("copy");
  }

  // Generate password
  private generatePassword() {
    if (this.lowercase === false && this.uppercase === false && this.numbers === false && this.symbols === false) {
      return this.newPassword = "...";
    }

    // Create array from chosen checkboxes
    this.dictionary = [].concat(
      this.lowercase ? this.checkboxes[0].library.split("") : [],
      this.uppercase ? this.checkboxes[1].library.split("") : [],
      this.numbers ? this.checkboxes[2].library.split("") : [],
      this.symbols ? this.checkboxes[3].library.split("") : []
    );

    // Generate random password from array
    var newPassword = "";
    for (var i = 0; i < this.passwordLenght; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }
    this.newPassword = newPassword;

    // Call copy function
    setTimeout(() => this.copyPassword());
    console.log(this.newPassword);

    // Change text on button when clicked
    this.buttonLabel = "Copied!";
    setTimeout(() => { this.buttonLabel = "Generate" }, 1500);
  }
}
