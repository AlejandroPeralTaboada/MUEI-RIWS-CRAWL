export interface Gift {
    idGame: number;
    idGift: number;
    name: string;
}
export interface GiftCard {
    name: String;
    idGame: Number;
    numberOfGifts: Number;
}

export function GiftToGiftCard(gift: Gift): GiftCard {
    return { name: gift.name, idGame: gift.idGame, numberOfGifts: 0 }
}