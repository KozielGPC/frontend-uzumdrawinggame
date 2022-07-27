export interface JoinRoom {
    user_id: string;
    room_code: string;
}

export interface Match {
    id: string;
    match_adm_id: string;
    room_id: string;
    sort: string;
    created_at: Date;
    updated_at?: Date;
}

export interface RoomAdm {
    id: string;
    username: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface User {
    room_id: string;
    user_id: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface Room {
    id: string;
    room_code: string;
    room_adm_id: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
    matches: Match[];
    room_adm: RoomAdm;
    users: User[];
}

