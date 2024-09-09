import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  [x: string]: any;

  @Prop()
  userID: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  documentID: string;

  @Prop()
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);