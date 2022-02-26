import { TokenFieldType, TokenFieldMeta } from "../wallet-lib/wallet-lib.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebase_store } from "./firebase";
import { Wallet } from "./wallet.js";

const GATE_URL = "http://37.18.107.81:8981";

export class Bank {
  firebase_user = null;
  wallet = null;

  async init() {
    const auth = getAuth();
    // Попытка авторизации и загрузка данных о банке и типе токенов
    try {
      const sign = await signInWithEmailAndPassword(
        auth,
        "bank@sbrf.ru",
        "12345678"
      );
      this.firebase_user = sign.user;
      await this.get();
      console.log("FB_AUTH_BANK: bank login ", this);
      return this;
    } catch (error) {
      try {
        console.error("FB_AUTH_BANK: bank login error", error);
        const reg = await createUserWithEmailAndPassword(
          auth,
          "bank@sbrf.ru",
          "12345678"
        );
        this.firebase_user = reg.user;
        this.wallet = new Wallet();
        await this.wallet.init();
        this.wallet.sbc_type = await this.create_sbercoin_type();
        this.wallet.objc_type = await this.create_object_type();
        await this.set();
        console.log("FB_AUTH_BANK: bank registered ", this);
        return this;
      } catch (error) {
        console.error("FB_AUTH_BANK: bank register error", error);
      }
    }
  }

  async set() {
    // сохраняем данные о банке и типе токенов
    try {
      const exportData = await this.wallet.export();
      await setDoc(doc(firebase_store, "bank", "userData"), exportData);
      await setDoc(doc(firebase_store, "bank", "types"), {
        sbc: this.wallet.sbc_type,
        objc: this.wallet.objc_type,
      });
      console.log("FB_STORE_BANK: Document is set");
      return true;
    } catch (error) {
      console.error("FB_STORE_BANK: Document set error", error);
      return false;
    }
  }

  async get() {
    // загружаем данные о банке и типе токенов
    try {
      const docSnap = await getDoc(doc(firebase_store, "bank", "userData"));
      const types = await getDoc(doc(firebase_store, "bank", "types"));
      if (docSnap.exists()) {
        this.wallet = new Wallet();
        const sData = JSON.stringify(docSnap.data());
        const t = types.data();
        this.wallet.sbc_type = t["sbc"];
        this.wallet.objc_type = t["objc"];
        await this.wallet.init(sData);
        console.log("FB_STORE_BANK: Document loaded");
      } else {
        console.error("FB_STORE_BANK: Documents load error (no data)");
      }
    } catch (error) {
      console.error("FB_STORE_BANK: Documents load error", error);
    }
  }

  async create_sbercoin_type() {
    // создаем тип токенов SBC
    try {
      const typeMeta = [new TokenFieldMeta("amount", TokenFieldType.Numeric)];
      let sbercoin = await this.wallet.sbw.registerTokenType(typeMeta);
      console.log("WALLET: SBC type created:", sbercoin);
      return sbercoin;
    } catch (error) {
      console.error("WALLET: Create SBC type errro", error);
      return false;
    }
  }

  async create_object_type() {
    // создаем тип токенов ObjC
    try {
      const typeMeta = [
        new TokenFieldMeta("number", TokenFieldType.Numeric),
        new TokenFieldMeta("address", TokenFieldType.Text),
        new TokenFieldMeta("area", TokenFieldType.Numeric),
        new TokenFieldMeta("knumber", TokenFieldType.Text),
        new TokenFieldMeta("count", TokenFieldType.Numeric),
      ];
      let object = await this.wallet.sbw.registerTokenType(typeMeta);
      console.log("WALLET: ObjC type created:", object);
      return object;
    } catch (error) {
      console.error("WALLET: Create ObjC type errro", error);
      return false;
    }
  }

  async create_object_token(num, address, area, knumber, count) {
    // создаем токен ObjC
    try {
      let content = [
        num.toString(),
        address,
        area.toString(),
        knumber,
        count.toString(),
      ];
      let req = await this.wallet.sbw.issue(this.wallet.objc_type, content);
      console.log("WALLET: Issue token succes", req);
      return req;
    } catch (error) {
      console.error("WALLET: Issue token error", error);
      return false;
    }
  }

  async create_object_tokens(address, area, knumber, count) {
    // потоковое создание токенов
    for (let i = 0; i < count; i++) {
      await this.create_object_token(i + 1, address, area, knumber, count);
    }
    return null;
  }
}
