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
