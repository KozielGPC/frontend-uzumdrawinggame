export interface CreateRound {
    match_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    type: string;
}

export const EnumRoundType = {
    PHRASE: 'phrase',
    DRAW: 'draw',
};

export interface Round {
    id: string;
    match_id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    type: string;
    created_at: Date;
    updated_at?: Date;
}

export interface Receiver {
    id: string;
    username: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface Sender {
    id: string;
    username: string;
    active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export interface ReceivingRound {
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

export interface Content {
    content: string;
    match_id: string;
}
