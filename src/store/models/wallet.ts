import { createModel } from '@rematch/core';

import { broadcast, spend } from 'util/nspvlib';
import { TICKER } from 'vars/defines';

import type { RootModel } from './models';

export type Asset = {
  name: string;
  ticker?: string;
  balance?: number;
  usd_value?: number;
};
export interface WalletState {
  chosenAsset?: string;
  assets: Array<Asset>;
  currentTx: {
    id: string;
    status: number;
    error: string;
  };
}

interface SpendArgs {
  address: string;
  amount: string;
}

const updateCurrTx = (state, key, value) => {
  return {
    ...state,
    currentTx: {
      ...state.currentTx,
      [key]: value,
    },
  };
};

export default createModel<RootModel>()({
  state: {
    chosenAsset: null,
    assets: [],
    currentTx: {
      id: '',
      status: 0,
    },
  } as WalletState,
  reducers: {
    SET_CHOSEN_ASSET: (state, chosenAsset: string) => ({
      ...state,
      chosenAsset,
    }),
    SET_CURRENT_TX_ID: (state, txid: string) => updateCurrTx(state, 'id', txid),
    SET_CURRENT_TX_STATUS: (state, txstatus: number) => updateCurrTx(state, 'status', txstatus),
    SET_CURRENT_TX_ERROR: (state, error: string) => updateCurrTx(state, 'error', error),
    SET_ASSETS: (state, assets: Array<Asset>) => ({
      ...state,
      assets,
    }),
    UPDATE_ASSET_BALANCE: (state, asset: Asset) => ({
      ...state,
      ...state.assets.map(a => {
        if (a.name === asset.name) {
          a.balance += asset.balance;
        }
        return a;
      }),
    }),
  },
  effects: dispatch => ({
    async spend({ address, amount }: SpendArgs) {
      let newTx = null;
      return spend(address, amount)
        .then(res => {
          if (res.result === 'success' && res.hex) {
            this.SET_CURRENT_TX_ID(res.txid);
            newTx = res;
            return broadcast(res.hex);
          }
          return null;
        })
        .then(broadcasted => {
          if (broadcasted) {
            // retcode < 0 .. error, === 1 success
            const success = Number(broadcasted.retcode === 1);
            this.SET_CURRENT_TX_STATUS(success);
            if (success) {
              const value = Number(amount);
              dispatch.account.ADD_NEW_TX({ newTx, recepient: address, value });
              // update the balance after the transaction
              const updatedAsset = {
                name: TICKER,
                balance: -value,
              };
              dispatch.wallet.UPDATE_ASSET_BALANCE(updatedAsset);
            }
          }

          return null;
        })
        .catch(e => {
          this.SET_CURRENT_TX_STATUS(-1);
          this.SET_CURRENT_TX_ERROR(e.message);
          console.log(e.message);
        });
    },
  }),
});
