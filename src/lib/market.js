import {
  CNFT,
  CNFTStore,
  CryptographyConfiguration,
  CNFTCrypto,
  TokenFieldValue,
  TokenDescription,
} from "./wallet-lib.js";

const GATE_URL = "http://37.18.107.81:8981";

export async function putOffer(supplier, objc, amount, sbc_type) {
  try {
    const objc_description = [
      new TokenFieldValue(0, objc.tokenBody.content[0].toString()),
      new TokenFieldValue(1, objc.tokenBody.content[1].toString()),
      new TokenFieldValue(2, objc.tokenBody.content[2].toString()),
      new TokenFieldValue(3, objc.tokenBody.content[3].toString()),
      new TokenFieldValue(4, objc.tokenBody.content[4].toString()),
    ];
    const objc_type = objc.tokenBody.tokenType;
    const sbc_description = [new TokenFieldValue(0, amount.toString())];
    let supplyTokenDescription = new TokenDescription(
      objc_type,
      objc_description
    );
    let demandTokenDescription = new TokenDescription(
      sbc_type,
      sbc_description
    );
    const offer = await supplier.wallet.sbw.putOffer(
      supplyTokenDescription,
      demandTokenDescription
    );
    console.log("MARKET: Put offer success", offer);
    return offer;
  } catch (error) {
    console.error("MARKET: Put offer error", error);
  }
}

export async function listOffers(supplier) {
  try {
    const offers = await supplier.wallet.sbw.listOffers;
    let lOffers = [];
    offers.map((offer, i) => {
      if (offer.offer.supply.tokenType == supplier.wallet.objc_type) {
        let oOffer = {
          id: offer.offer.id,
          objc_content: [],
          sbc: offer.offer.demand.content[0].value,
        };
        offer.offer.supply.content.map((content) => {
          oOffer["objc_content"].push(content.value);
        });
        lOffers.push(oOffer);
      }
    });
    // console.log("MARKET: List offers success", lOffers);
    return lOffers;
  } catch (error) {
    console.error("MARKET: List offers error", error);
  }
}


export async function applyOffer(supplier, offer, token) {
  try {
    await supplier.wallet.sbw.applyForOffer(offer, token);
    console.log("MARKET: Apply offer success", offer);
    return offer;
  } catch (error) {
    console.error("MARKET: Apply offer error", error);
  }
}

export async function getBankOffers(bank, offer) {
    await bank.wallet.sbw.getOffer(offer)
}