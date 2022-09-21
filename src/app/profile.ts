import { Role } from './role';

export interface Profile {
    id: string;
    name: string;
    password: string;
    bourbon_ids: string[];
    roles: Role[];
}