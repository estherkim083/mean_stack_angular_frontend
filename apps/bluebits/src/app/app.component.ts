import { Component, OnInit } from '@angular/core';
import { UsersService } from '@bluebits/users';
@Component({
  selector: 'bluebits-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'bluebits';
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.initAppSession();
  }
}
