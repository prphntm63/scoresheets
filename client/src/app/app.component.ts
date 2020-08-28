import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: string,
  firstName: string,
  lastName: string,
  ctime: string,
  mtime: string,
  email: string
}

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1 *ngIf="user; else noUser">
        Welcome {{user.firstName}} {{user.lastName}}!
      </h1>
      <button (click)="updateUserData()">Update User Data</button>
      <ng-template #noUser>
        <h1>
          No User
        </h1>
      </ng-template>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent{
  title = 'client';
  private credentials = {
    username: 'test.user@gmail.com',
    password: 'password'
  }
  user: User

  constructor(
    private http: HttpClient
  ) {
    this.http.post('/login', this.credentials).subscribe((response: User) => {
      console.log('login responese:', response)
      this.user = response
    })
  }

  updateUserData() {
    const body = {
      "email": "test.user@gmail.com",
      "plaintextPassword": "password",
      "firstName": "New",
      "lastName": "User"
    }

    this.http.post('/users/update', body).subscribe((response: User) => {
      console.log('login responese:', response)
      this.user = response
    })
  }
}
