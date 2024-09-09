
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsersDto} from './dto/create-user.dto';
import  * as bcrypt from 'bcrypt';
// import { Users } from './schemas/users.schema';
import { Users } from './schemas/users.schema';
const saltOrRounds = 10;
@Injectable()
export class UsersService {

    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

    async create(createUserDto: CreateUsersDto): Promise<Users> {
        const createdUser = new this.usersModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }

    async findOne(id:string): Promise<Users> {
        // return this.usersModel.findOne(id).exec();
        return this.usersModel.findById(id).exec();
    }
    async findByEmail(email: string): Promise<Users> {
        return this.usersModel.findOne({ email }).exec();
    }

    async update(id: string, updateUserDto: CreateUsersDto): Promise<Users> {
        return this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async remove(id: string): Promise<Users> {
        return this.usersModel.findByIdAndDelete(id).exec();
    }

    async updatePassword(id: string, updatePasswordDto: any): Promise<Users> {
        const hashedPassword = await bcrypt.hash(updatePasswordDto.password, saltOrRounds);
        updatePasswordDto.password = hashedPassword;

        return this.usersModel.findByIdAndUpdate(id, updatePasswordDto, { new: true });
    }

}
