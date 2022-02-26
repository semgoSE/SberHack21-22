import { Bank } from "../components/sberchain/bank.js";
import { User } from "../components/sberchain/user.js";
import { useState } from "react";
import { Button } from "antd";

export const Test = () => {
  const [user, setUser] = useState(new User());
  const [bank, setBank] = useState(new Bank());
  const [userTokens, setUserTokens] = useState([]);
  const [bankTokens, setBankTokens] = useState([]);
  const [sberCoinType, setSberCoinType] = useState("");
  const [objectCoinType, setObjectCoinType] = useState("");

  const [requestSBC, setRequestSBC] = useState(0);
  const [requestObjStreet, setRequestObjStreet] = useState("");
  const [requestObjArea, setRequestObjArea] = useState(0);
  const [requestObjKNumber, setRequestObjKNumber] = useState("");
  const [requestObjCount, setRequestObjCount] = useState(0);
  const [requestObjAmount, setRequestObjAmount] = useState(0);

  async function handleUpdateBank() {
    let b = new Bank();
    await b.init();
    setBank(b);
    let sb_t = await b.get_sbercoin_type();
    setSberCoinType(sb_t);
    let o_t = await b.get_object_type();
    setObjectCoinType(o_t);
    let tokens = await b.get_tokens_list();
    setBankTokens(tokens);
    console.log("Update Bank complete");
  }

  async function handleUpdateUser() {
    let u = new User();
    await u.login("test1");
    setUser(u);
    let tokens = await u.get_tokens_list();
    setUserTokens(tokens);
    console.log("Update User complete");
  }

  async function handleGetSBC() {
    console.log(requestSBC);
    let req = await user.send_request_for_sbercoin(requestSBC);
    console.log("Request sended");
  }

  async function handleGetObject() {
    let req = await bank.create_object_tokens(
      requestObjStreet,
      requestObjArea,
      requestObjKNumber,
      requestObjCount,
      requestObjAmount
    );
    console.log("Request sended");
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24}}>
      <div>
        <h1>System Init</h1>
        User ID Wallet {user.wallet_id} <br /><br />
        Bank ID Wallet {bank.wallet_id} <br /><br />
        SberCoin Type {sberCoinType.typeId} <br /><br />
        ObjectCoin Wallet {objectCoinType.typeId} <br /><br />
        <Button onClick={handleUpdateBank}>update Bank</Button> <br /><br />
        <Button onClick={handleUpdateUser}>update User</Button> <br /><br />
        SberCoin:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestSBC(e.target.value);
          }}
        />
        <br /><br />
        <Button onClick={handleGetSBC}>get SberCoin </Button>
        <br /><br />
        Object Street:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjStreet(e.target.value);
          }}
        />
        <br /><br />
        Object Area:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjArea(e.target.value);
          }}
        />
        <br /><br />
        Object KNumber:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjKNumber(e.target.value);
          }}
        />
        <br /><br />
        Object Count:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjCount(e.target.value);
          }}
        />
        <br /><br />
        Object Amount:{" "}
        <input
          type="text"
          onChange={(e) => {
            setRequestObjAmount(e.target.value);
          }}
        />
        <br /><br />
        <Button onClick={handleGetObject}>tokenize object</Button>
        <br /><br />
        User tokens: <br />
        <ul>
          {userTokens.map((token, i) => (
            <li key={i}>
              ID: {token.tokenBody.tokenId}, content: {token.tokenBody.content}
            </li>
          ))}
        </ul>
        Bank tokens: <br />
        <ul>
          {bankTokens.map((token, i) => (
            <li key={i}>
              ID: {token.tokenBody.tokenId} <br />
              Street : {token.tokenBody.content[1]} <br />
              area: {token.tokenBody.content[2]} <br />
              K-number: {token.tokenBody.content[3]} <br />
              Amount: {token.tokenBody.content[5]} <br />
              Number/AllCount: {token.tokenBody.content[0]}/
              {token.tokenBody.content[4]} <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
