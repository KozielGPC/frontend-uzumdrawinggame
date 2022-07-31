export interface CreateMatch {
    room_id: string;
    match_adm_id: string;
    match_id: string;
}

export interface User {
    id: string;
    username: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface Player {
    match_id: string;
    user_id: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
    user: User;
}

export interface Match {
    id: string;
    match_adm_id: string;
    room_id: string;
    sort: string;
    created_at: Date;
    updated_at?: Date;
    users: Player[];
}
