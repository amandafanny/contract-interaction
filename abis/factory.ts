import {
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi'
import { WriteContractMode, PrepareWriteContractResult } from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC7527Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xCB3fE2C38c978288F009c52aB443885A402A829E)
 */
export const ierc7527FactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'agencySettings',
        internalType: 'struct AgencySettings',
        type: 'tuple',
        components: [
          {
            name: 'implementation',
            internalType: 'address payable',
            type: 'address',
          },
          {
            name: 'asset',
            internalType: 'struct Asset',
            type: 'tuple',
            components: [
              { name: 'currency', internalType: 'address', type: 'address' },
              { name: 'basePremium', internalType: 'uint256', type: 'uint256' },
              {
                name: 'feeRecipient',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'mintFeePercent',
                internalType: 'uint16',
                type: 'uint16',
              },
              {
                name: 'burnFeePercent',
                internalType: 'uint16',
                type: 'uint16',
              },
            ],
          },
          { name: 'immutableData', internalType: 'bytes', type: 'bytes' },
          { name: 'initData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: 'appSettings',
        internalType: 'struct AppSettings',
        type: 'tuple',
        components: [
          { name: 'implementation', internalType: 'address', type: 'address' },
          { name: 'immutableData', internalType: 'bytes', type: 'bytes' },
          { name: 'initData', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'deployWrap',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xCB3fE2C38c978288F009c52aB443885A402A829E)
 */
export const ierc7527FactoryAddress = {
  5: '0xCB3fE2C38c978288F009c52aB443885A402A829E',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xCB3fE2C38c978288F009c52aB443885A402A829E)
 */
export const ierc7527FactoryConfig = {
  address: ierc7527FactoryAddress,
  abi: ierc7527FactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xCB3fE2C38c978288F009c52aB443885A402A829E)
 */
export function useIerc7527FactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof ierc7527FactoryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc7527FactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof ierc7527FactoryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof ierc7527FactoryABI, TFunctionName, TMode>({
    abi: ierc7527FactoryABI,
    address: ierc7527FactoryAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__ and `functionName` set to `"deployWrap"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xCB3fE2C38c978288F009c52aB443885A402A829E)
 */
export function useIerc7527FactoryDeployWrap<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof ierc7527FactoryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc7527FactoryABI,
          'deployWrap'
        >['request']['abi'],
        'deployWrap',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'deployWrap' }
    : UseContractWriteConfig<typeof ierc7527FactoryABI, 'deployWrap', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'deployWrap'
      } = {} as any,
) {
  return useContractWrite<typeof ierc7527FactoryABI, 'deployWrap', TMode>({
    abi: ierc7527FactoryABI,
    address: ierc7527FactoryAddress[5],
    functionName: 'deployWrap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xCB3fE2C38c978288F009c52aB443885A402A829E)
 */
export function usePrepareIerc7527FactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof ierc7527FactoryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc7527FactoryABI,
    address: ierc7527FactoryAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc7527FactoryABI}__ and `functionName` set to `"deployWrap"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xCB3fE2C38c978288F009c52aB443885A402A829E)
 */
export function usePrepareIerc7527FactoryDeployWrap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, 'deployWrap'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof ierc7527FactoryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc7527FactoryABI,
    address: ierc7527FactoryAddress[5],
    functionName: 'deployWrap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc7527FactoryABI, 'deployWrap'>)
}
