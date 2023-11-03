export interface AdmMatch {
    id: string;
    match_adm_id: string;
    room_id: string;
    sort: string;
    created_at: Date;
    updated_at?: Date;
}

export interface Match {
    match_id: string;
    user_id: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface AdmRoom {
    id: string;
    room_code: string;
    room_adm_id: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface Room {
    room_id: string;
    user_id: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface SenderRound {
    id: string;
    match_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    type: string;
    created_at: Date;
    updated_at?: Date;
}

export interface ReceiverRound {
    id: string;
    match_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    type: string;
    created_at: Date;
    updated_at?: Date;
}

export interface User {
    id: string;
    username: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
    adm_matches: AdmMatch[];
    matches: Match[];
    adm_rooms: AdmRoom[];
    rooms: Room[];
    receiver_rounds: ReceiverRound[];
    sender_rounds: SenderRound[];
}

export interface Login {
    username: string;
}

export interface Logoff {
    user_id: string;
}
