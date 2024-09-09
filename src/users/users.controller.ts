import { Controller, Get, Put, Delete, Post, Bind, Body, Param, UseGuards, Req, HttpCode,HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/role.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    
    // Getr all users
    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)

    async findAll() {
        const allUsers = await this.usersService.findAll();
        // allUsers.forEach(element => {
        //     delete element.password;
        // });
        console.log(allUsers)
        // remove  passwords

        const users = allUsers.map(user => {
            const { password, ...rest } = user;
            return rest;
        })
        console.log(users)
        return allUsers
    }

    // Get a specific user
    @Get(':id')
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)

    findOne(@Param() params: any) {
        console.log(params.id);
        return this.usersService.findOne(params.id);
    }

    // Delete a user
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }


    // Update user password
    @Put(':id')
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    updatePassword(@Param('id') id: string, @Body() body: any) {
        return this.usersService.updatePassword(id, body);
    }





}
