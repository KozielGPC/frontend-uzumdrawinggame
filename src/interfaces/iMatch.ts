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

export interface EndMatch {
    match_id: string;
    rounds: MatchRounds;
}

export interface Receiver {
    id: string;
    username: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Sender {
    id: string;
    username: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface Round {
    id: string;
    match_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    type: string;
    created_at: Date;
    updated_at?: Date;
    receiver: Receiver;
    sender: Sender;
}

export interface MatchRounds {
    id: string;
    match_adm_id: string;
    room_id: string;
    sort: string;
    created_at: Date;
    updated_at?: Date;
    rounds: Round[];
}
