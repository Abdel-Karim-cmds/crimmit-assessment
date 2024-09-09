import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    UseFilters
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, response } from 'express';
import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';

@Injectable()
// @UseFilters(UnauthorizedExceptionFilter) // Apply the custom filter
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        // console.log("*-*-*-*-")
        // console.log(request)
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            // console.log('There is no token')
            // redirect to login
            throw new UnauthorizedException();
        }
        // console.log('There is a token')
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request['user'] = payload;
        } catch(error) {
            console.log('Throwing an error')
            console.log(error)
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // console.log(request)
        // console.log("***********")
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        // console.log(type, token)
        return type === 'Bearer' ? token : undefined;
    }
}