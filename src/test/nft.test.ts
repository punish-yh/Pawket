import { convertToOriginCoin } from "@/models/wallet";
import { getTestAccount } from "./utility";
import { SymbolCoins } from "@/services/transfer/transfer";
import { analyzeNftCoin, generateMintNftBundle, generateTransferNftBundle } from "@/services/coin/nft";
import puzzle from "@/services/crypto/puzzle";
import { GetParentPuzzleResponse } from "@/models/api";
import { Instance } from "@/services/util/instance";
import { getAccountAddressDetails } from "@/services/util/account";
import { analyzeDidCoin, DidCoinAnalysisResult, generateMintDidBundle } from "@/services/coin/did";

import nftcoin0 from "./cases/nftcoin0.json"
import nftcoin1 from "./cases/nftcoin1.json"
import nftcoin2 from "./cases/nftcoin2.json"
import nftcoin3 from "./cases/nftcoin3.json"
import nftcoin4 from "./cases/nftcoin4.json"
import nftcoin5 from "./cases/nftcoin5.json"

import didcoin1 from "./cases/didcoin1.json"

function xchPrefix() { return "txch"; }
function xchSymbol() { return "TXCH"; }
function chainId() { return "ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2"; }
function tokenInfo() { return {}; }

const nftMetadata = {
  "imageUri": "https://aws1.discourse-cdn.com/business4/uploads/chia/original/1X/682754dfb596e0b4ec08dc23442cc5a9192418e3.png",
  "imageHash": "76a1900b6931f7bf5f07ab310733270838b040385f285423f49e2f5518867335",
  "licenseUri": "https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf",
  "licenseHash": "2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50",
  "metadataUri": "https://ufzyuv55yicm3ev56cstqbmaayrkudmmjueyrd3nkolafxbe.arweave.net/oX--OKV73CBM2-SvfClOAWABiKqDYxNCYiPbVOWAtwk",
  "metadataHash": "44475cb971933e4545efad1337f3d68bc53523d987412df233f3b905ed1c5b3f",
  "serialNumber": "21",
  "serialTotal": "63"
};
const didAnalysis: DidCoinAnalysisResult = {
  "singletonModHash": "0x7faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9f",
  "launcherId": "0x1c84a60040668152a11424c4629b7ea4e73a7ea055b78a3a88a7899f737ca150",
  "launcherPuzzleHash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
  "recovery_did_list_hash": "()",
  "num_verifications_requried": "()",
  "metadata": {},
  "rawMetadata": "()",
  "didInnerPuzzleHash": "a65fff47ef7b4cd349cfee218dc8a09a52735d2834766f1cf363955ee69c5f9a",
  "p2InnerPuzzle": "(a (q 2 (q 2 (i 11 (q 2 (i (= 5 (point_add 11 (pubkey_for_exp (sha256 11 (a 6 (c 2 (c 23 ()))))))) (q 2 23 47) (q 8)) 1) (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 23 ()))) ()))) (a 23 47))) 1) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xa0ea9df64dd859d6d7e648fec94b35ee0512670e68c0a83c520948dc164d817d39c402002db1cf716caa1335022c8338) 1))",
  "hintPuzzle": "0x0eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155",
  "rawPuzzle": "(a (q 2 (q 2 (i (logand 47 52) (q 4 (c 32 (c 47 ())) (c (a 62 (c 2 (c 5 (c (a 42 (c 2 (c 39 (c (a (i 119 (q 2 54 (c 2 (c 9 (c 87 (c (a 46 (c 2 (c 5 ()))) ()))))) (q . 29)) 1) (c (a (i 119 (q . -73) (q . 87)) 1) ()))))) (c 119 ()))))) (a 58 (c 2 (c 5 (c (a 11 95) (q ()))))))) (q 8)) 1) (c (q (((73 . 71) 2 . 51) (c . 1) 1 . 2) ((not 2 (i 5 (q 2 50 (c 2 (c 13 (c (sha256 60 (sha256 52 36) (sha256 60 (sha256 60 (sha256 52 44) 9) (sha256 60 11 (sha256 52 ())))) ())))) (q . 11)) 1) (a (i (all (= (strlen 5) 34) (= (strlen 11) 34) (> 23 (q . -1))) (q 11 5 11 23) (q 8)) 1) 2 (i 11 (q 2 (i (a 38 (c 2 (c 19 ()))) (q 2 (i (not 23) (q 2 (i (= -77 (q . -113)) (q 2 58 (c 2 (c 5 (c 27 (c 52 ()))))) (q 4 (c 35 (c (a 54 (c 2 (c 9 (c 83 (c (a 46 (c 2 (c 5 ()))) ()))))) 115)) (a 58 (c 2 (c 5 (c 27 (c 52 ()))))))) 1) (q 8)) 1) (q 4 19 (a 58 (c 2 (c 5 (c 27 (c 23 ()))))))) 1) (q 2 (i 23 () (q 8)) 1)) 1) ((a (i (= 9 56) (q 2 (i (logand 45 (q . 1)) (q 1 . 1) ()) 1) ()) 1) 11 60 (sha256 52 40) (sha256 60 (sha256 60 (sha256 52 44) 5) (sha256 60 (a 50 (c 2 (c 7 (c (sha256 52 52) ())))) (sha256 52 ())))) (a (i (l 5) (q 11 (q . 2) (a 46 (c 2 (c 9 ()))) (a 46 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 2 (i (any 23 (= 11 21)) (q 4 48 (c 11 ())) (q 8)) 1) 1)) (c (q 0x7faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9f 0x1c84a60040668152a11424c4629b7ea4e73a7ea055b78a3a88a7899f737ca150 . 0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9) (c (q 2 (q 2 (q 2 (i -65 (q 2 5 383) (q 2 (i (all (= (a 126 (c 2 (c 6143 ()))) 11) (> 23 ())) (q 4 (c 40 (c 383 ())) (c (c 52 (c 767 (c 383 (c (c 767 ()) ())))) (c (c 56 (c 12287 ())) (a 38 (c 2 (c 47 (c 23 (c 6143 (c 12287 (c 767 (c 1535 (c 3071 (q ()))))))))))))) (q 8)) 1)) 1) (c (q (((49 . 61) 73 . 70) (a . 51) 60 . 4) ((q . 1) 2 2 (i 5 (q 2 58 (c 2 (c 13 (c (sha256 42 (sha256 34 60) (sha256 42 (sha256 42 (sha256 34 50) 9) (sha256 42 11 (sha256 34 ())))) ())))) (q . 11)) 1) ((a (i 23 (q 2 (i 319 (q 4 (c 48 (c (sha256 (sha256 (a 54 (c 2 (c 5 (c 39 (c 575 (c 1343 (c 2879 ()))))))) (a 126 (c 2 (c (a 46 (c 2 (c 47 (c 95 (c 383 ()))))) ())))) 47) ())) (a 38 (c 2 (c 5 (c 11 (c 55 (c 47 (c 95 (c 447 (c 383 (c (+ 767 (q . 1)) ()))))))))))) (q 2 38 (c 2 (c 5 (c 55 (c 47 (c 95 (c 447 (c 383 (c 767 ())))))))))) 1) (q 2 (i (> 767 (- 11 (q . 1))) (q 4 (c 32 (c 383 (c 95 ()))) ()) (q 8)) 1)) 1) 11 23 (a 94 (c 2 (c 9 (c 47 (c (a 126 (c 2 (c (c 9 (c 11 29)) ()))) ()))))) 95) (c (q . 1) (c (c 44 (c 5 ())) (c (c 32 (c 23 (c 11 ()))) ()))) (sha256 42 (sha256 34 36) (sha256 42 (sha256 42 (sha256 34 50) 5) (sha256 42 (a 58 (c 2 (c 7 (c (sha256 34 34) ())))) (sha256 34 ())))) 2 (i (l 5) (q 11 (q . 2) (a 126 (c 2 (c 9 ()))) (a 126 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q 2 (q 2 (q 2 (i 11 (q 2 (i (= 5 (point_add 11 (pubkey_for_exp (sha256 11 (a 6 (c 2 (c 23 ()))))))) (q 2 23 47) (q 8)) 1) (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 23 ()))) ()))) (a 23 47))) 1) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xa0ea9df64dd859d6d7e648fec94b35ee0512670e68c0a83c520948dc164d817d39c402002db1cf716caa1335022c8338) 1)) (c (q) (c (q) (c (q 0x7faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9f 0x1c84a60040668152a11424c4629b7ea4e73a7ea055b78a3a88a7899f737ca150 . 0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9) (c (q) 1)))))) 1)))",
  "coin": {
    "amount": 1n,
    "parent_coin_info": "0xbef07b4b7c05e8154e49f75d1146f849eaaba44c3795defb4b9545a6ccc1f39f",
    "puzzle_hash": "0x420d19cc56c2e037d37e9cc99dc85b8c7f6ad871371f0dc837829f91be5c17af"
  }
};

beforeAll(async () => {
  await Instance.init();
})


async function testAnalyzeNftCoin(coin: any, hintPuzzle: string): Promise<void> {
  const puzzle_reveal = coin.puzzle_reveal;
  const solution = coin.solution;
  const ret = await analyzeNftCoin(puzzle_reveal, hintPuzzle, coin.coin, solution);
  expect(ret).toMatchSnapshot("nft analysis result");
}

// coin: 0x7daa37d920abd727414982a6e62cf79826f3973553dc4f1859fbdf25f4c425e6
test('Analyze Nft 1', async () => await testAnalyzeNftCoin(nftcoin1, "db308b6dcd4cd92a905934bc50d1e66f8788e876abe772c4c2b6bbe71e3b5f6f"));
// coin: 0x51a79ce606902e3b62074bcf43446bae24e3247d74bf1b993c70b78c2d1394c9
test('Analyze Nft 2', async () => await testAnalyzeNftCoin(nftcoin2, "7ed1a136bdb4016e62922e690b897e85ee1970f1caf63c1cbe27e4e32f776d10"));
// mainnet coin: 0x206fd290475e6c54eabc1216eec3f1ef4f8f66c0339fdf9275dd0e31a2ff8c75
test('Analyze Nft 3', async () => await testAnalyzeNftCoin(nftcoin3, "4c61cafe5965913de3655cc6a5015ec196a1cf8fe1652e2951245f4dac9e01c6"));

test('Analyze Nft 4', async () => await testAnalyzeNftCoin(nftcoin4, "0000000000000000000000000000000000000000000000000000000000000000"));
// mainnet coin: 0x092addccb83469b626b4a462e2b8671bb33085032486e9cf6861c43db188516b
test('Analyze Nft 5', async () => await testAnalyzeNftCoin(nftcoin5, "bae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79"));

test('Mint Nft', async () => {
  const targetAddress = "txch1p6mjpkgetll9j6ztv2cj64rer0n66wakypl4awfwpcd5pm9uz92s0xl0jd";
  const changeAddress = "txch1p6mjpkgetll9j6ztv2cj64rer0n66wakypl4awfwpcd5pm9uz92s0xl0jd";
  const fee = 0n;
  const royaltyAddressHex = "7ed1a136bdb4016e62922e690b897e85ee1970f1caf63c1cbe27e4e32f776d10";
  const tradePricePercentage = 500;

  const account = getTestAccount("55c335b84240f5a8c93b963e7ca5b868e0308974e09f751c7e5668964478008f");

  const tokenPuzzles = await getAccountAddressDetails(account, [], tokenInfo(), xchPrefix(), xchSymbol(), undefined, "cat_v1");
  const availcoins: SymbolCoins = {
    [xchSymbol()]: [
      {
        "amount": 4998999984n,
        "parent_coin_info": "0xf3b7d6d4bdd80b99c539f7ca900288f5dc2ac8fb23559656e981761e90b2fe71",
        "puzzle_hash": "0x0eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155"
      },
    ]
  };
  const { spendBundle } = await generateMintNftBundle(
    targetAddress, changeAddress, fee, nftMetadata, availcoins, tokenPuzzles, xchSymbol(), chainId(), royaltyAddressHex, tradePricePercentage, didAnalysis, localPuzzleApiCall);
  expect(spendBundle).toMatchSnapshot("spendbundle");
});

test('Mint Multiple Nfts', async () => {
  const targetAddress = "txch1p6mjpkgetll9j6ztv2cj64rer0n66wakypl4awfwpcd5pm9uz92s0xl0jd";
  const changeAddress = "txch1p6mjpkgetll9j6ztv2cj64rer0n66wakypl4awfwpcd5pm9uz92s0xl0jd";
  const fee = 0n;
  const royaltyAddressHex = "7ed1a136bdb4016e62922e690b897e85ee1970f1caf63c1cbe27e4e32f776d10";
  const tradePricePercentage = 500;

  const account = getTestAccount("55c335b84240f5a8c93b963e7ca5b868e0308974e09f751c7e5668964478008f");

  const tokenPuzzles = await getAccountAddressDetails(account, [], tokenInfo(), xchPrefix(), xchSymbol(), undefined, "cat_v1");
  const availcoins: SymbolCoins = {
    [xchSymbol()]: [
      {
        "amount": 4998999984n,
        "parent_coin_info": "0xf3b7d6d4bdd80b99c539f7ca900288f5dc2ac8fb23559656e981761e90b2fe71",
        "puzzle_hash": "0x0eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155"
      },
    ]
  };
  const metadatas = [
    Object.assign({}, nftMetadata, { serialNumber: 1 }),
    Object.assign({}, nftMetadata, { serialNumber: 2 }),
    Object.assign({}, nftMetadata, { serialNumber: 3 }),
  ];
  const { spendBundle } = await generateMintNftBundle(
    targetAddress, changeAddress, fee, metadatas, availcoins, tokenPuzzles, xchSymbol(), chainId(), royaltyAddressHex,
    tradePricePercentage, didAnalysis, localPuzzleApiCall, "00186eae4cd4a3ec609ca1a8c1cda8467e3cb7cbbbf91a523d12d31129d5f8d7");
  expect(spendBundle).toMatchSnapshot("spendbundle");
});

test('Transfer Nft', async () => {
  const hintPuzzle = "8f972e809806a42ec005beb3019665bea4b3478c9582bf43708bb1c261916a51";
  const target_hex = "0xd26c36cfd99da03a18a7d47dddd7beb968ff63bd7d3ccc45205fadb6958a571d";
  const change_hex = "0x0eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155";
  const nftCoin = convertToOriginCoin(nftcoin0.coin);

  const analysis = await analyzeNftCoin(nftcoin0.puzzle_reveal, hintPuzzle, nftCoin, nftcoin0.solution);
  if (analysis == null) fail("null analysis");
  expect(analysis).toMatchSnapshot("analysis");

  const account = getTestAccount("55c335b84240f5a8c93b963e7ca5b868e0308974e09f751c7e5668964478008f");

  const changeAddress = puzzle.getAddressFromPuzzleHash(change_hex, xchPrefix());
  const targetAddress = puzzle.getAddressFromPuzzleHash(target_hex, xchPrefix());

  const tokenPuzzles = await getAccountAddressDetails(account, [], tokenInfo(), xchPrefix(), xchSymbol(), undefined, "cat_v1");
  const availcoins: SymbolCoins = {
    [xchSymbol()]: []
  };

  const fee = 0n;
  const spendBundle = await generateTransferNftBundle(targetAddress, changeAddress, fee, nftCoin, analysis, availcoins, tokenPuzzles, xchSymbol(), chainId(), localPuzzleApiCall);
  expect(spendBundle).toMatchSnapshot("spendbundle");
});

test('Mint Did', async () => {
  const xchSymbol = "XCH";
  const chainId = "ccd5bb71183532bff220ba46c268991a3ff07eb358e8255a65c30a2dce0e5fbb";
  const xchPrefix = "xch";
  const target_hex = "0x0eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155";
  const change_hex = "0x0eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155";

  const account = getTestAccount("55c335b84240f5a8c93b963e7ca5b868e0308974e09f751c7e5668964478008f");

  const changeAddress = puzzle.getAddressFromPuzzleHash(change_hex, xchPrefix);
  const targetAddress = puzzle.getAddressFromPuzzleHash(target_hex, xchPrefix);

  const tokenPuzzles = await getAccountAddressDetails(account, [], tokenInfo(), xchPrefix, xchSymbol, undefined, "cat_v2");
  const availcoins: SymbolCoins = {
    [xchSymbol]: [
      {
        "amount": 23n,
        "parent_coin_info": "0xc4badc175d119df8006fd8e96ad84c475e743275e70d6c16f43cf83fb75df021",
        "puzzle_hash": "0x7ed1a136bdb4016e62922e690b897e85ee1970f1caf63c1cbe27e4e32f776d10"
      }
    ]
  };

  const fee = 0n;
  const spendBundle = await generateMintDidBundle(targetAddress, changeAddress, fee, {}, availcoins, tokenPuzzles, xchSymbol, chainId);
  expect(spendBundle).toMatchSnapshot("spendbundle");
});

test('Analyze Did', async () => {
  const hintPuzzle = "0eb720d9195ffe59684b62b12d54791be7ad3bb6207f5eb92e0e1b40ecbc1155";
  const analysis = await analyzeDidCoin(didcoin1.puzzle_reveal, hintPuzzle, convertToOriginCoin(didcoin1.coin), didcoin1.solution);
  expect(analysis).toMatchSnapshot("did analysis");
});

async function localPuzzleApiCall(parentCoinId: string): Promise<GetParentPuzzleResponse | undefined> {
  const knownCoins: GetParentPuzzleResponse[] = [
    {
      "parentCoinId": "0x7daa37d920abd727414982a6e62cf79826f3973553dc4f1859fbdf25f4c425e6",
      "amount": 1,
      "parentParentCoinId": "0xed52525bcccb48416babccd02d76f9722cc30b1b54ffab4b44bb23617ef37d21",
      "puzzleReveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0d6aae8561702bb0144752c01e2ebae7fbdeccdc0d4d6f1eda0100300dcf30bdca0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05268747470733a2f2f6775676765726f2e6769746875622e696f2f63727970746f6772617068792d746f6f6c6b69742f696d616765732f666f726b2d6d652d6f6e2d6769746875622d726962626f6e2e706e6780ffff68a0e62bcdc91903b07b7b86f1af11c5fdd9c3b545bfff90515976f9e8d67c91eb0fffff826d75ffc07068747470733a2f2f75667a79757635357969636d336576353663737471626d616179726b75646d6d6a7565797264336e6b6f6c61667862652e617277656176652e6e65742f6f582d2d4f4b56373343424d322d537666436c4f41574142694b714459784e4359695062564f574174776b80ffff826c75ffc06468747470733a2f2f62616679626569677a63617a7865753765706d6d3476746b756164727679737637346c627a7a626c3265767068746165366b3537796867796e70342e697066732e6e667473746f726167652e6c696e6b2f6c6963656e73652e70646680ffff82736e07ffff82737405ffff826d68a044475cb971933e4545efad1337f3d68bc53523d987412df233f3b905ed1c5b3fffff826c68a02267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f5080ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0d6aae8561702bb0144752c01e2ebae7fbdeccdc0d4d6f1eda0100300dcf30bdca0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a05662b49a357db4f05c2c141452b72fb91e7ec286e9b47d6c287210c63ae5cd3effff04ffff018201f4ff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b09609418cb2545f1faf0ec37359591012251f0e7e9b94bbad13ee79701307eb5b6b8d1f62646f925dcb6c24a132a71355ff018080ff018080808080ff018080808080ff01808080"
    },
    {
      "parentCoinId": "0xbef07b4b7c05e8154e49f75d1146f849eaaba44c3795defb4b9545a6ccc1f39f",
      "amount": 1,
      "parentParentCoinId": "0xee719c85a02efd698ce3e76098a81bbb956898eb5b4081368f904f7c5e059cf2",
      "puzzleReveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01c84a60040668152a11424c4629b7ea4e73a7ea055b78a3a88a7899f737ca150a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a0ea9df64dd859d6d7e648fec94b35ee0512670e68c0a83c520948dc164d817d39c402002db1cf716caa1335022c8338ff018080ffff04ffff0180ffff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01c84a60040668152a11424c4629b7ea4e73a7ea055b78a3a88a7899f737ca150a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080"
    },
  ];
  const resp = knownCoins.find(_ => _.parentCoinId == parentCoinId);
  return resp;
}
