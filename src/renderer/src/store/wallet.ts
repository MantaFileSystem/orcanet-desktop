import { ITransaction } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const loadTransactions = async () => {
  const tansactions = await window.context.getTransactions();
  return tansactions;
  //   return peers.sort((a, b) => b.Location.localeCompare(a.Location));
};

const TransactionsAtomAsync = atom<ITransaction[] | Promise<ITransaction[]>>(
  loadTransactions,
);

export const TransactionsAtom = unwrap(TransactionsAtomAsync, (prev) => prev);
