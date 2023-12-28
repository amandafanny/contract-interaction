import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

// export default defineConfig({
//   out: 'src/generated.ts',
//   contracts: [],
//   plugins: [],
// })

export default defineConfig([
  {
    out: "abis/factory.ts",
    plugins: [
      foundry({
        project: "/Users/yuqing/ghj/code/github/wrap/wrap",
        include: ["IERC7527Factory.sol/IERC7527Factory.json"],
      }),
      react({
        // useContractItemEvent: false,
        // useContractEvent: false,
      }),
    ],
  },
  {
    out: "abis/deployer.ts",
    plugins: [
      foundry({
        project: "/Users/yuqing/ghj/code/github/wrap/deployer",
        include: ["Deployer.sol/Deployer.json"],
      }),
      react({
        // useContractItemEvent: false,
        // useContractEvent: false,
      }),
    ],
  },
]);
