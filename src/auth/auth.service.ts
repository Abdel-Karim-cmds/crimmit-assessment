import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as uuid4 from 'uuid4'
import { Role } from './enums/role.enum';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }


    async signIn(email: string, password: string): Promise<{ access_token: string,role:any }> {
        console.log(email, password)
        
        if(email === 'admin@crimmit.com' && password === 'admin123'){
            const payload = { email: email, sub: 'adminIDentifier', role: Role.Admin };
            console.log(payload)
            return {
                access_token: this.jwtService.sign(payload),
                role: Role.Admin
            };
        }
        const user = await this.usersService.findByEmail(email);
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {

            const payload = { email: user.email, sub: user.userID, role: user.role, documentID:user.documentID };

            return {
                access_token: this.jwtService.sign(payload),
                role: Role.User
            };
        }
        else{
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        // return null;
    }
    async signUp(createUserDto: any): Promise<any> {
        // check if the email is in use
        const user = await this.usersService.findByEmail(createUserDto.email);
        if (user) {
            // throw error with status code 409
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
            // throw new Error('User already exists');
        }

        // generate user ID
        createUserDto.userID = uuid4();

        // hash the password
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        createUserDto.password = hashedPassword;

        // assign role
        createUserDto.role= Role.User;

        // create a new user
        const createdUser = await this.usersService.create(createUserDto);
        return createdUser;
    }

    async logout(): Promise<any> {
        console.log('logout')
        return true
    }
}
