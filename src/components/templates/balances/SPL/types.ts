type SPLValue = {
  associatedTokenAddress: string;
  mint: string;
  amount: string;
};
export interface ISPLBalances {
  balances?: SPLValue[];
  error?: string;
}
