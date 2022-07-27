import { AccountEntity, CustomCat, TokenInfo } from "@/models/account";
import receive, { TokenPuzzleDetail } from "../crypto/receive";

export const DEFAULT_ADDRESS_RETRIEVAL_COUNT = 4;

export async function getAccountAddressDetails(
  account: AccountEntity,
  cats: CustomCat[],
  tokenInfo: TokenInfo,
  prefix: string,
  symbol: string,
  maxId: number | undefined = undefined
): Promise<TokenPuzzleDetail[]> {
  if (typeof maxId !== "number" || maxId <= 0) maxId = account.addressRetrievalCount;
  if (typeof maxId !== "number" || maxId <= 0) DEFAULT_ADDRESS_RETRIEVAL_COUNT;

  if (account.addressGenerated == maxId) {
    return account.addressPuzzles;
  }

  account.addressPuzzles = await receive.getAssetsRequestDetail(account.key.privateKey, maxId, cats, tokenInfo, prefix, symbol);
  account.addressGenerated = maxId;
  return account.addressPuzzles;
}