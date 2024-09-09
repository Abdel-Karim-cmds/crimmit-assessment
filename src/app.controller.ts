import { Controller, Get,Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/role.guard';
import { Roles } from './auth/decorators/role.decorator';
import { Role } from './auth/enums/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('login')
  root() {
  }
  // @UseGuards(AuthGuard)
  
  // @UseGuards(AuthGuard)
  // @Roles(Role.User)
  // @UseGuards(RolesGuard)
  @Get('/users-dashboard')
  @Render('users/dashboard')
  quotes() {
  }
  // @UseGuards(AuthGuard)
  @Get('/my-quotes')
  @Render('users/users quotes')
  myQuotes() {
    
  }

  @Get('/admin-dashboard')
  @Render('admin/admin-dashboard')
  adminDashboard() {
  }

  @Get('/admin-dashboard/:id')
  @Render('admin/view user')
  adminDashboardById() {
  }
}
