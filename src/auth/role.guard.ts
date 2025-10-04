import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('role guard executed');
    throw new BadRequestException('role not valid');
  }
}
