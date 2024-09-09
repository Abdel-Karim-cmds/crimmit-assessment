import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/role.decorator';
import { Role } from './enums/role.enum';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
    });
    request['user'] = payload;

    // console.log("***************")
    // console.log(payload)


    const { user } = context.switchToHttp().getRequest();
    // console.log(user)
    return requiredRoles.some((role) => user.role?.includes(role));
  }
  
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // console.log(type, token)
    return type === 'Bearer' ? token : undefined;
}
}
