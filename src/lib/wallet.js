import {
  CNFT,
  CNFTStore,
  CryptographyConfiguration,
  CNFTCrypto,
  TokenFieldValue,
} from "./wallet-lib.js";

const GATE_URL = "http://37.18.107.81:8981";
const LISTENER_METHODS = {
  onTokenTypeRegistered(_wallet, tokenTypes) {
    // console.log('Got event: onTokenTypeRegistered\n', tokenTypes)
    return Promise.resolve(undefined);
  },

  onTokenListChanged(_wallet, tokensAdded, tokensIdsRemoved) {
    console.log("Got event: onTokenListChanged");
    return Promise.resolve(undefined);
  },

  onOffersChanged(_wallet, newOffers, closedOffers) {
    console.log("Got event: onOffersChanged");
    return Promise.resolve(undefined);
  },

  onApplyForOffer(_wallet, requests) {
    console.log("Got event: onApplyForOffer");
    return Promise.resolve(undefined);
  },

  onApproveOffer(_wallet, request) {
    console.log("Got event: onApproveOffer");
    return Promise.resolve(undefined);
  },

  onTransferProposed(_wallet, request) {
    console.log("Got event: onTransferProposed");
    return Promise.resolve(undefined);
  },

  async onTokenRequested(_wallet, requests) {
    console.log("Got token requests. request:", requests);
    let memberId = await requests[0].from.name;
    let tokenType = requests[0].message.tokenType;
    let tokenContent = requests[0].message.content;
    let tokenBody = await _wallet.issue(tokenType, tokenContent);
    let to = requests[0].message.address.keys[0];
    await _wallet.sendToken(memberId, "test", tokenBody.tokenId, to);
    return Promise.resolve(undefined);
  },

  async onIssueRequested(_wallet, request) {
    console.log("Got event: onIssueRequested", request);
    let memberId = await request[0].from.name;
    let tokenId = await request[0].message.token.tokenId;
    let idAccess = await request[0].message.idAccess;
    let tokenTypeRequested = await request[0].message.token.tokenType;
    let content = await request[0].message.token.content;
    await _wallet.issueFor(
      memberId,
      tokenId,
      idAccess,
      tokenTypeRequested,
      content
    );
    return Promise.resolve(undefined);
  },

  onChangeRequested(_wallet, requests) {
    console.log("Got event: onChange");
    return Promise.resolve(undefined);
  },

  onIssuedTokensUpdated(_wallet, addedSeq, swappedSeq, burnedSeq) {
    console.log("Got event: onIssuedTokenUpdates");

    return Promise.resolve(undefined);
  },
};

export class Wallet {
  id = 0;
  sbw = null;
  sbc_type = null;
  objc_type = null;

  async init(json) {
    if (json) {
      await this.import(json);
    } else {
      await this.new();
    }
  }

  async _get_wallet_id() {
    try {
      let wallet_id = 0;
      if (this.sbw) {
        wallet_id = await this.sbw.getIdentity;
      }
      return wallet_id;
    } catch (error) {
      console.error("WALLET: Get wallet id error", error);
    }
  }

  async new() {
    try {
      const crypto = new CryptographyConfiguration(
        CNFTCrypto.webCryptoSign(), // Issuer operations
        CNFTCrypto.webCryptoSign(), // Token operations
        CNFTCrypto.webCryptoSign(), // Identity operations
        CNFTCrypto.webCryptoEncryption() // Encryption operations
      );
      const gate = CNFT.newGateApi(GATE_URL);
      const store = CNFTStore.localStorage();
      this.sbw = await CNFT.newWallet({
        gate: gate,
        store: store,
        crypto: crypto,
        listener: LISTENER_METHODS,
      });
      this.id = await this._get_wallet_id();
      console.log("WALLET: new wallet: ", this.id);
      return true;
    } catch (error) {
      console.error("WALLET: New wallet create error", error);
      return false;
    }
  }

  async load(id) {
    try {
      const crypto = new CryptographyConfiguration(
        CNFTCrypto.webCryptoSign(), // Issuer operations
        CNFTCrypto.webCryptoSign(), // Token operations
        CNFTCrypto.webCryptoSign(), // Identity operations
        CNFTCrypto.webCryptoEncryption() // Encryption operations
      );
      const gate = CNFT.newGateApi(GATE_URL);
      const store = CNFTStore.localStorage();
      this.sbw = await CNFT.newWallet({
        gate: gate,
        store: store,
        crypto: crypto,
        identityId: id,
        listener: LISTENER_METHODS,
      });
      this.id = id;
      console.log("WALLET: Load wallet: ", this.id);
      return true;
    } catch (error) {
      console.error("WALLET: Load wallet create error", error);
      return false;
    }
  }

  async export() {
    // this.sbw.stopListenBlocks();
    try {
      const walletExportData = await this.sbw.exportData;
      const walletExportObj = JSON.parse(walletExportData);
      console.log("WALLET: Export finish");
      return walletExportObj;
    } catch (error) {
      console.error("WALLET: Export wallet error", error);
      return false;
    }
  }

  async import(json_wallet) {
    try {
      const crypto = new CryptographyConfiguration(
        CNFTCrypto.webCryptoSign(), // Issuer operations
        CNFTCrypto.webCryptoSign(), // Token operations
        CNFTCrypto.webCryptoSign(), // Identity operations
        CNFTCrypto.webCryptoEncryption() // Encryption operations
      );
      const gate = CNFT.newGateApi(GATE_URL);
      const store = CNFTStore.localStorage();
      const obj_wallet_ident = JSON.parse(json_wallet)['identity'];
      const lStorage_ident =  window.localStorage.getItem('Identity_'+obj_wallet_ident)
      if (lStorage_ident) {
        this.id = obj_wallet_ident
      } else {
        this.id = await store.importData(json_wallet);
      }
      await this.load(this.id);
      console.log("WALLET: Import finish");
      return true;
    } catch (error) {
      console.error("WALLET: Import wallet error", error);
      return false;
    }
  }

  async get_tokens_list() {
    try {
      const listTokens = await this.sbw.listTokens;
      return listTokens;
    } catch (error) {
      console.error("WALLET: error get token list", error);
      return [];
    }
  }

  async get_objc_list() {
    const all_tokens = await this.get_tokens_list()
    let objc_list = []
    all_tokens.forEach((token) => {
        const content = token.tokenBody.content
        if (content.length == 5) {
          if (!objc_list[content[1]]) {
            objc_list[content[1]] = []
          }
          objc_list[content[1]].push(token)
        }
    })
    return objc_list
  }

  async get_sbc_list() {
    const all_tokens = await this.get_tokens_list()
    let sbc_list = {"all":0, "tokens":[]}
    all_tokens.forEach((token) => {
        const content = token.tokenBody.content
        if (content.length == 1) {
          sbc_list["all"] += parseInt(content[0])
          sbc_list["tokens"].push(token)
        }
    })
    return sbc_list
  }

}
