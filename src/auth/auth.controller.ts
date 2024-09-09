import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //Login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    // Register
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signUp(@Body() signUpDto: Record<string, any>) {
        // console.log(signUpDto)
        return this.authService.signUp(signUpDto);
    }

    //Logout
    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout() {
        return this.authService.logout();
    }

}

