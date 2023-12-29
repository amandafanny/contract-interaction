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
        deployments: {
          IERC7527Factory: {
            5: "0xCB3fE2C38c978288F009c52aB443885A402A829E",
          },
        },
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
        deployments: {
          Deployer: {
            5: "0xc02081a5f80C7FdaA28cF26a40f5aBAe21f20763",
          },
        },
      }),
      react({
        // useContractItemEvent: false,
        // useContractEvent: false,
      }),
    ],
  },
]);
