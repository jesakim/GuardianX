import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {

  user: UserDto
  = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    authorities: []
  };

  constructor(
    private authService:AuthService,
    private route: ActivatedRoute,
  ){}

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user'].result;
      console.log(this.user);
    })
  }

  logout(){
    this.authService.logout()
  }

}
