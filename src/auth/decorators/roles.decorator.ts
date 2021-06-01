import { SetMetadata } from '@nestjs/common';

import { Role } from '../models/roles.model';
export const ROLES_KEY = 'roles';

//nombre que le queremos poner al decorator
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
