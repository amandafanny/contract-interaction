"use client";
import { useAccount, useNetwork } from "wagmi";
import {
  useDeployerMint,
  usePrepareDeployerMint,
} from "../../../../abis/deployer";
import { parseEther } from "viem";

const Demo = () => {
  // const { address } = useAccount();
  // const { chain, chains } = useNetwork();

  const { config, error } = usePrepareDeployerMint({
    address: "0xc02081a5f80C7FdaA28cF26a40f5aBAe21f20763",
    args: ["name"],
    value: parseEther("0.5"),
  });
  const { write } = useDeployerMint(config);

  console.log("===>", config, error);
  return <div>mint</div>;
};

export default Demo;
