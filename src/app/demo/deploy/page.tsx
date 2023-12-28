"use client";
import { useAccount, useNetwork } from "wagmi";
import {
  ierc7527FactoryABI,
  useIerc7527FactoryDeployWrap,
  usePrepareIerc7527FactoryDeployWrap,
} from "../../../../abis/factory";
import {
  getAddress,
  getFunctionSelector,
  getFunctionSignature,
  toHex,
} from "viem";

const Demo = () => {
  // const { address } = useAccount();
  // const { chain, chains } = useNetwork();

  const signature = getFunctionSignature(ierc7527FactoryABI[0]);
  console.log("signature", signature);
  const { config, error } = usePrepareIerc7527FactoryDeployWrap({
    address: "0xCB3fE2C38c978288F009c52aB443885A402A829E",
    args: [
      {
        implementation: "0xb4972cc5D57cDE9fE905Fa2CEA9e8DbC1749d8E8",
        asset: {
          currency: "0x0C4ecDB7f7A7e2eA658E8B33cdC41f2cbECdF50f",
          basePremium: BigInt(1000000000000000000),
          feeRecipient: getAddress(
            "0x0000000000000000000000000000000000000000"
          ),
          mintFeePercent: 1000,
          burnFeePercent: 1000,
        },
        immutableData: "0x",
        initData: "0x",
      },
      {
        implementation: "0x10317e0D2652D6095C7D68c313B7E126aA5cC6cD",
        // abi.encode(uint256(12))
        immutableData: toHex(12, { size: 32 }),
        // init() ==> calldata
        // abi.encodeWithSelector(0xe1c7392a)
        initData: getFunctionSelector("init()"),
      },
      toHex(6, { size: 32 }),
    ],
  });
  const { write } = useIerc7527FactoryDeployWrap(config);
  console.log("init()", getFunctionSelector("init()"));
  console.log("signature", getFunctionSelector(signature));
  console.log("===>", config, error);
  return <div>deploy</div>;
};

export default Demo;
