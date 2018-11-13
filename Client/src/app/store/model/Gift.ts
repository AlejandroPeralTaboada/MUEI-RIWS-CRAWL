export interface Gift {
  idGame: number;
  idGift: string;
  name: string;
  requiredPoints: number;
  numberOfCopies: number;
  level: number;
  entryNumber: number;
  _created: number;
  remainingTime: number;
  url: string;
  genres: string[];
}
export interface GiftCard {
  name: string;
  idGame: number;
  numberOfGifts: number;
}

export function GiftToGiftCard(gift: Gift): GiftCard {
  return { name: gift.name, idGame: gift.idGame, numberOfGifts: gift.numberOfCopies };
}
