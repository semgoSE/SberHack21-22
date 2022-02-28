import { Bank } from "../lib/bank";
import { User } from "../lib/user";
import { listOffers, putOffer } from "../lib/market";
import { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";

export const Test = () => {
  const [user, setUser] = useState(new User());
  const [bank, setBank] = useState(new Bank());
  const [userSbcTokens, setUserSbcTokens] = useState({ all: 0, tokens: [] });
  const [bankSbcTokens, setBankSbcTokens] = useState({ all: 0, tokens: [] });
  const [bankObjTokens, setBankObjTokens] = useState([]);
  const [userObjTokens, setUserObjTokens] = useState([]);
  const [sberCoinType, setSberCoinType] = useState("0");
  const [objectCoinType, setObjectCoinType] = useState("0");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [offers, setOffers] = useState([]);

  const [requestSBC, setRequestSBC] = useState(0);
  const [requestObjStreet, setRequestObjStreet] = useState("");
  const [requestObjArea, setRequestObjArea] = useState(0);
  const [requestObjKNumber, setRequestObjKNumber] = useState("");
  const [requestObjCount, setRequestObjCount] = useState(0);

  useEffect(() => {
    const update = async () => {
      if (bank.wallet) {
        const obtokens = await bank.wallet.get_objc_list();
        if (obtokens) setBankObjTokens(obtokens);
        const sbtokens = await bank.wallet.get_sbc_list();
        if (sbtokens) setBankSbcTokens(sbtokens);
      }
      if (user.wallet) {
        const outokens = await user.wallet.get_objc_list();
        if (outokens) setUserObjTokens(outokens);
        const sutokens = await user.wallet.get_sbc_list();
        if (sutokens) setUserSbcTokens(sutokens);
      }
    }
    setInterval(update, 5000);
  }, [])

  const handleUpdateBank = async () => {
    await bank.init();
    setSberCoinType(bank.wallet.sbc_type);
    setObjectCoinType(bank.wallet.objc_type);
    console.log("TEST: Update Bank success", bank);
  };

  const handleGetObject = async () => {
    let req = await bank.create_object_tokens(
      requestObjStreet,
      requestObjArea,
      requestObjKNumber,
      requestObjCount
    );
    console.log("TEST: Request for ObjC send");
  };

  const handleRegisterUser = async () => {
    await user.register("test@sbrf.ru", "12345678");
    console.log("TEST: User Registration");
  };

  const handleLoginUser = async () => {
    await user.login("test@sbrf.ru", "12345678");
    console.log("TEST: User login", user,);
  };

  const handleGetSBC = async () => {
    let req = await user.send_request_for_sbercoin(requestSBC);
    console.log("TEST: Request for SBC send");
  };
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const handlePutOffer = async (obj) => {
    const token = obj;
    setTimeout(async () => await putOffer(bank, token, currentAmount, bank.wallet.sbc_type), 1000);
  };

  const handleUpdateOffers = async () => {
    const ofs = await listOffers(user);
    setOffers(ofs);
    console.log(offers);
  };

  const handleBuy = async (offer, amount) => {
    const req = await user.send_request_for_sbercoin(amount);
    let sbc = [];
    while (sbc.length == 0) {
      const sbc = await user.wallet.sbw.listTokenDemandCandidates(offer);
      console.log(sbc);
    }
    await user.wallet.sbw.applyOffer(user, offer, sbc[0]);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
      <div>
        <h1>Bank</h1>
        Bank ID Wallet <div>{bank.wallet && bank.wallet.id}</div>
        <br />
        <br />
        SberCoin Type {sberCoinType} <br />
        <br />
        ObjectCoin Wallet {objectCoinType} <br />
        <br />
        <Button onClick={handleUpdateBank}>update Bank</Button> <br />
        <br />
        <h3>Tokenize object</h3>
        Object Street:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjStreet(e.target.value);
          }}
        />
        <br />
        <br />
        Object Area:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjArea(e.target.value);
          }}
        />
        <br />
        <br />
        Object KNumber:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjKNumber(e.target.value);
          }}
        />
        <br />
        <br />
        Object Count:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjCount(e.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={handleGetObject}>tokenize object</Button>
        <br />
        <br />
        Bank tokens SBC: ({bankSbcTokens["all"]}): <br />
        <ul>
          {bankSbcTokens["tokens"].map((token, i) => (
            <li key={i}>
              ID: {token.tokenBody.tokenId}, content: {token.tokenBody.content}
            </li>
          ))}
        </ul>
        <br />
        <br />
        Bank tokens ObjC: <br />
        {bankObjTokens.map((address, i) => {
          const content = address.tokenBody.content;
          return (
            <div>
              <li key={i}>
                Street : {content[1]} <br />
                Area : {content[2]} <br />
                KNumber : {content[3]} <br />
                {address.tokenBody.tokenId}<br />
                <Button onClick={() => handlePutOffer(address)}>
                  putOffer
                </Button>
              </li>
            </div>
          );
        })}

      </div>
      <div style={{ marginLeft: 24 }}>
        <h1>User</h1>
        User ID Wallet {user.wallet && user.wallet.id}
        <br />
        <br />
        <Button onClick={handleRegisterUser}>register User</Button> <br />
        <br />
        <Button onClick={handleLoginUser}>login User</Button> <br />
        <br />
        SberCoin:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestSBC(e.target.value);
          }}
        />
        <br />
        <br />
        <Button onClick={handleGetSBC}>get SberCoin</Button>
        <br />
        <br />
        <br />
        <br />
        User tokens SBC: ({userSbcTokens["all"]}): <br />
        <ul>
          {userSbcTokens["tokens"].map((token, i) => (
            <li key={i}>
              ID: {token.tokenBody.tokenId}, content: {token.tokenBody.content}
            </li>
          ))}
        </ul>
        <br />
        <br />
        User tokens ObjC: <br />
        {userObjTokens.map((address, i) => {
          const content = address.tokenBody.content;
          return (
            <div>
              <li key={i}>
                Street : {content[1]} <br />
                Area : {content[2]} <br />
                KNumber : {content[3]} <br />
                {address.tokenBody.tokenId}<br />
                <Button onClick={() => handlePutOffer(address)}>
                  putOffer
                </Button>
              </li>
            </div>
          );
        })}
        <Button onClick={handleUpdateOffers}>Update offers</Button> <br />
        Offers:
        <ul>
          {offers.map((offer, i) => {
            return (
              <li key={i}>
                {offer.id} <br />
                Street : {offer.objc_content[1]} <br />
                Area : {offer.objc_content[2]} <br />
                KNumber : {offer.objc_content[3]} <br />
                Price: {offer.sbc} SBC
                <br />
                <Button onClick={() => handleGetSBC(offer.sbc)}>
                  Get {offer.sbc} SBC
                </Button>
                <Button onClick={() => handleBuy(offer.id, offer.sbc)}>
                  Buy
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
