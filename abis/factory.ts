import {
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from "wagmi";
import { WriteContractMode, PrepareWriteContractResult } from "wagmi/actions";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC7527Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc7527FactoryABI = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "agencySettings",
        internalType: "struct AgencySettings",
        type: "tuple",
        components: [
          {
            name: "implementation",
            internalType: "address payable",
            type: "address",
          },
          {
            name: "asset",
            internalType: "struct Asset",
            type: "tuple",
            components: [
              { name: "currency", internalType: "address", type: "address" },
              { name: "basePremium", internalType: "uint256", type: "uint256" },
              {
                name: "feeRecipient",
                internalType: "address",
                type: "address",
              },
              {
                name: "mintFeePercent",
                internalType: "uint16",
                type: "uint16",
              },
              {
                name: "burnFeePercent",
                internalType: "uint16",
                type: "uint16",
              },
            ],
          },
          { name: "immutableData", internalType: "bytes", type: "bytes" },
          { name: "initData", internalType: "bytes", type: "bytes" },
        ],
      },
      {
        name: "appSettings",
        internalType: "struct AppSettings",
        type: "tuple",
        components: [
          { name: "implementation", internalType: "address", type: "address" },
          { name: "immutableData", internalType: "bytes", type: "bytes" },
          { name: "initData", internalType: "bytes", type: "bytes" },
        ],
      },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "deployWrap",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__.
 */
export function useIerc7527FactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc7527FactoryABI,
          string
        >["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc7527FactoryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never;
      } = {} as any
) {
  return useContractWrite<typeof ierc7527FactoryABI, TFunctionName, TMode>({
    abi: ierc7527FactoryABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__ and `functionName` set to `"deployWrap"`.
 */
export function useIerc7527FactoryDeployWrap<
  TMode extends WriteContractMode = undefined
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc7527FactoryABI,
          "deployWrap"
        >["request"]["abi"],
        "deployWrap",
        TMode
      > & { functionName?: "deployWrap" }
    : UseContractWriteConfig<typeof ierc7527FactoryABI, "deployWrap", TMode> & {
        abi?: never;
        functionName?: "deployWrap";
      } = {} as any
) {
  return useContractWrite<typeof ierc7527FactoryABI, "deployWrap", TMode>({
    abi: ierc7527FactoryABI,
    functionName: "deployWrap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__.
 */
export function usePrepareIerc7527FactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, TFunctionName>,
    "abi"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: ierc7527FactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__ and `functionName` set to `"deployWrap"`.
 */
export function usePrepareIerc7527FactoryDeployWrap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, "deployWrap">,
    "abi" | "functionName"
  > = {} as any
) {
  return usePrepareContractWrite({
    abi: ierc7527FactoryABI,
    functionName: "deployWrap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, "deployWrap">);
}
