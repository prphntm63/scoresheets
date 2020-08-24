export enum BJCP_RANK {
    RECOGNIZED = "RECOGNIZED",
    CERTIFIED = "CERTIFIED",
    NATIONAL = "NATIONAL",
    MASTER = "MASTER",
    GRAND_MASTER = "GRAND_MASTER",
    APPRENTICE = "APPRENTICE"
}

export enum CICERONE_RANK {
    SERVER = "SERVER",
    CICERONE = "CICERONE",
    ADVANCED = "ADVANCED",
    MASTER = "MASTER"
}

export enum USER_ROLES {
    USER = "USER",
    CLUB_ADMIN = "CLUB_ADMIN",
    COMPETITION_ADMIN = "COMPETITION_ADMIN",
    MODERATOR = "MODERATOR",
    SUPERADMIN = "SUPERADMIN"
}

export interface User {
    ctime: string;
    mtime: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
    photo_url: string;
    phone?: number;
    bjcp_id?: string;
    bjcp_rank?: BJCP_RANK;
    cicerone_rank: CICERONE_RANK;
    brewery?: string;
    industry?: string;
    judging_years?: number;
    role?: USER_ROLES
}