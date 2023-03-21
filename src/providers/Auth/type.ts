import { LANGUAGES } from '../../constants'

export type AuthUser = {
    id: number;
    email: string;
    slug: string;
    name?: string,
    logo?: string,
    language: LANGUAGES,

}
