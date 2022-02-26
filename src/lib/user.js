import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebase_store } from "./firebase";
import { Wallet } from "./wallet.js";

const GATE_URL = "http://37.18.107.81:8981";

export class User {
  firebase_user = null;
  wallet = null;

  async set() {
    try {
      const exportData = await this.wallet.export();
      await setDoc(
        doc(firebase_store, "wallets", this.firebase_user.uid),
        exportData
      );
      console.log("FB_STORE: Document is set");
      return true;
    } catch (error) {
      console.error("FB_STORE: Document set error");
      return false;
    }
  }

  async get() {
    const docSnap = await getDoc(
      doc(firebase_store, "wallets", this.firebase_user.uid)
    );
    const types = await getDoc(doc(firebase_store, "bank", "types"));
    if (docSnap.exists()) {
      this.wallet = new Wallet();
      const sData = JSON.stringify(docSnap.data());
      const t = types.data();
      this.wallet.sbc_type = t["sbc"];
      this.wallet.objc_type = t["objc"];
      await this.wallet.init(sData);
      console.log("FB_STORE: Document loaded");
      return true;
    } else {
      console.error("FB_STORE: Documents load error (no data)");
      return false;
    }
  }

  async login(email, password) {
    const auth = getAuth();
    try {
      const sign = await signInWithEmailAndPassword(auth, email, password);
      this.firebase_user = sign.user;
      await this.get();
      console.log("FB_AUTH: user login ", this);
      return true;
    } catch (error) {
      console.error("FB_AUTH: user login error", error);
      return error;
    }
  }

  async register(email, password) {
    const auth = getAuth();
    try {
      const reg = await createUserWithEmailAndPassword(auth, email, password);
      this.firebase_user = reg.user;
      this.wallet = new Wallet();
      await this.wallet.init();
      await this.set();
      console.log("FB_AUTH: user registered ", reg.user);
      return true;
    } catch (error) {
      console.error("FB_AUTH: user register error", error);
      return false;
    }
  }

  async send_request_for_sbercoin(amount) {
    try {
      console.log(amount);
      const content = new Array(amount.toString());
      const buffer = new Array();
      let request = await this.wallet.sbw.requestIssue(
        this.wallet.sbc_type.toString(),
        content,
        buffer
      );
      console.log("WALLET: Send request SBC", request);
      return request;
    } catch (error) {
      console.error("WALLET: Error send request SBC", error, amount);
      return false;
    }
  }
}
