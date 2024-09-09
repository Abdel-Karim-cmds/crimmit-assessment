import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
// import {}
import * as bcrypt from 'bcrypt'

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () =>{
    it('should return a user', async () => {
      const user = {
        email: 's8mLs@example.com',
        password: '123456',
        role: 'user'
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
      user.password = hashedPassword;
      const result = await service.signUp(user);
      expect(result).toEqual(user);
    })

    it('should return an error', async () => {
      const user = {
        email: 's8mLs@example.com',
        password: '123456',
        role: 'user'
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
      user.password = hashedPassword;
      const result = await service.signUp(user);
      expect(result).toEqual(null);

    })

  })
});
