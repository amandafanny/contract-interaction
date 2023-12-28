import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Deployer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deployerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      {
        name: 'alchemistVault_',
        internalType: 'address payable',
        type: 'address',
      },
      { name: 'swapVault_', internalType: 'address payable', type: 'address' },
      { name: 'lendingVault_', internalType: 'address', type: 'address' },
      { name: 'stakingVault_', internalType: 'address', type: 'address' },
      { name: 'accessManage', internalType: 'address', type: 'address' },
      { name: 'tokenURIEngine', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'authority', internalType: 'address', type: 'address' }],
    name: 'AccessManagedInvalidAuthority',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'delay', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'AccessManagedRequiredDelay',
  },
  {
    type: 'error',
    inputs: [{ name: 'caller', internalType: 'address', type: 'address' }],
    name: 'AccessManagedUnauthorized',
  },
  { type: 'error', inputs: [], name: 'AccountCreationFailed' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'required', internalType: 'uint256', type: 'uint256' },
      { name: 'available', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'DeployerExceededSlippagePrice',
  },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [
      { name: 'tokenURIEngine', internalType: 'address', type: 'address' },
    ],
    name: 'InvalidDefaultTokenURIEngine',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tokenURIEngine', internalType: 'address', type: 'address' },
    ],
    name: 'InvalidDefinedTokenURIEngine',
  },
  {
    type: 'error',
    inputs: [{ name: 'name', internalType: 'bytes', type: 'bytes' }],
    name: 'NNSNameMinted',
  },
  { type: 'error', inputs: [], name: 'NNSNotAuthorised' },
  { type: 'error', inputs: [], name: 'NameContainsInvalidCharacters' },
  { type: 'error', inputs: [], name: 'NameLengthInvalid' },
  { type: 'error', inputs: [], name: 'NotOwnerOrApproved' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'SignatureExpired' },
  { type: 'error', inputs: [], name: 'SignatureInvalid' },
  { type: 'error', inputs: [], name: 'ZeroSpender' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authority',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AuthorityUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'salt',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ERC6551AccountCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: true },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'resolver',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NewResolver',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'parentNode',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'subnode',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      { name: 'name', internalType: 'bytes', type: 'bytes', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'NewSubNode',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenURIEngine',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SetDefaultTokenURIEngine',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenURIEngine',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'count',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SetTokenURI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ACCOUNT_SALT',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'account',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'alchemistDAOVault',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc6551AccountImp',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getDefaultTokenURIEngine',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getDomainSeparator',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getName',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getNode',
    outputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getPrice',
    outputs: [
      { name: 'currentPrice', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getResolver',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenURIEngine',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isApprovedOrOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isConsumingScheduledOp',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isRecordExists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lendingVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'name_', internalType: 'string', type: 'string' }],
    name: 'mint',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nextTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'sig',
        internalType: 'struct IBaseERC721.EIP712Signature',
        type: 'tuple',
        components: [
          { name: 'v', internalType: 'uint8', type: 'uint8' },
          { name: 'r', internalType: 'bytes32', type: 'bytes32' },
          { name: 's', internalType: 'bytes32', type: 'bytes32' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'permit',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
      {
        name: 'sig',
        internalType: 'struct IBaseERC721.EIP712Signature',
        type: 'tuple',
        components: [
          { name: 'v', internalType: 'uint8', type: 'uint8' },
          { name: 'r', internalType: 'bytes32', type: 'bytes32' },
          { name: 's', internalType: 'bytes32', type: 'bytes32' },
          { name: 'deadline', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'permitForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newAuthority', internalType: 'address', type: 'address' },
    ],
    name: 'setAuthority',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'defalutTokenURIengine',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setDefaultTokenURIEngine',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'setResolver',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'parentNode', internalType: 'bytes32', type: 'bytes32' },
      { name: 'name', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setSubnode',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'parentNode', internalType: 'bytes32', type: 'bytes32' },
      { name: 'name', internalType: 'bytes', type: 'bytes' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'setSubnodeRecord',
    outputs: [{ name: 'subnode', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenURIEngine', internalType: 'address', type: 'address' },
    ],
    name: 'setTokenURIEngine',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'sigNonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'stakingVault',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'startTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'swapVault',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: 'output', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'wrapCoin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'totalSupply_', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'wrapCoinGrowthOracle',
    outputs: [{ name: 'hubGrowth', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__.
 */
export function useDeployerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"DEFAULT_ACCOUNT_SALT"`.
 */
export function useDeployerDefaultAccountSalt<
  TFunctionName extends 'DEFAULT_ACCOUNT_SALT',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'DEFAULT_ACCOUNT_SALT',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"account"`.
 */
export function useDeployerAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"alchemistDAOVault"`.
 */
export function useDeployerAlchemistDaoVault<
  TFunctionName extends 'alchemistDAOVault',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'alchemistDAOVault',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"authority"`.
 */
export function useDeployerAuthority<
  TFunctionName extends 'authority',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'authority',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useDeployerBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"erc6551AccountImp"`.
 */
export function useDeployerErc6551AccountImp<
  TFunctionName extends 'erc6551AccountImp',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'erc6551AccountImp',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getApproved"`.
 */
export function useDeployerGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getDefaultTokenURIEngine"`.
 */
export function useDeployerGetDefaultTokenUriEngine<
  TFunctionName extends 'getDefaultTokenURIEngine',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getDefaultTokenURIEngine',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getDomainSeparator"`.
 */
export function useDeployerGetDomainSeparator<
  TFunctionName extends 'getDomainSeparator',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getDomainSeparator',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getName"`.
 */
export function useDeployerGetName<
  TFunctionName extends 'getName',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getName',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getNode"`.
 */
export function useDeployerGetNode<
  TFunctionName extends 'getNode',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getNode',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getPrice"`.
 */
export function useDeployerGetPrice<
  TFunctionName extends 'getPrice',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getPrice',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getResolver"`.
 */
export function useDeployerGetResolver<
  TFunctionName extends 'getResolver',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getResolver',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getTokenId"`.
 */
export function useDeployerGetTokenId<
  TFunctionName extends 'getTokenId',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getTokenId',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"getTokenURIEngine"`.
 */
export function useDeployerGetTokenUriEngine<
  TFunctionName extends 'getTokenURIEngine',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'getTokenURIEngine',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useDeployerIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"isApprovedOrOwner"`.
 */
export function useDeployerIsApprovedOrOwner<
  TFunctionName extends 'isApprovedOrOwner',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'isApprovedOrOwner',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"isConsumingScheduledOp"`.
 */
export function useDeployerIsConsumingScheduledOp<
  TFunctionName extends 'isConsumingScheduledOp',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'isConsumingScheduledOp',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"isRecordExists"`.
 */
export function useDeployerIsRecordExists<
  TFunctionName extends 'isRecordExists',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'isRecordExists',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"lendingVault"`.
 */
export function useDeployerLendingVault<
  TFunctionName extends 'lendingVault',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'lendingVault',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"name"`.
 */
export function useDeployerName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"nextTokenId"`.
 */
export function useDeployerNextTokenId<
  TFunctionName extends 'nextTokenId',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'nextTokenId',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useDeployerOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"sigNonces"`.
 */
export function useDeployerSigNonces<
  TFunctionName extends 'sigNonces',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'sigNonces',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"stakingVault"`.
 */
export function useDeployerStakingVault<
  TFunctionName extends 'stakingVault',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'stakingVault',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"startTime"`.
 */
export function useDeployerStartTime<
  TFunctionName extends 'startTime',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'startTime',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useDeployerSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"swapVault"`.
 */
export function useDeployerSwapVault<
  TFunctionName extends 'swapVault',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'swapVault',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"symbol"`.
 */
export function useDeployerSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useDeployerTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useDeployerTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useDeployerTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useDeployerTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"wrapCoin"`.
 */
export function useDeployerWrapCoin<
  TFunctionName extends 'wrapCoin',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'wrapCoin',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"wrapCoinGrowthOracle"`.
 */
export function useDeployerWrapCoinGrowthOracle<
  TFunctionName extends 'wrapCoinGrowthOracle',
  TSelectData = ReadContractResult<typeof deployerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: deployerABI,
    functionName: 'wrapCoinGrowthOracle',
    ...config,
  } as UseContractReadConfig<typeof deployerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__.
 */
export function useDeployerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof deployerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, TFunctionName, TMode>({
    abi: deployerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"approve"`.
 */
export function useDeployerApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof deployerABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'approve', TMode>({
    abi: deployerABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"createAccount"`.
 */
export function useDeployerCreateAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & { functionName?: 'createAccount' }
    : UseContractWriteConfig<typeof deployerABI, 'createAccount', TMode> & {
        abi?: never
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'createAccount', TMode>({
    abi: deployerABI,
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"mint"`.
 */
export function useDeployerMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof deployerABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'mint', TMode>({
    abi: deployerABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useDeployerOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<typeof deployerABI, 'onERC721Received', TMode> & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'onERC721Received', TMode>({
    abi: deployerABI,
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"permit"`.
 */
export function useDeployerPermit<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof deployerABI, 'permit', TMode> & {
        abi?: never
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'permit', TMode>({
    abi: deployerABI,
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"permitForAll"`.
 */
export function useDeployerPermitForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'permitForAll'
        >['request']['abi'],
        'permitForAll',
        TMode
      > & { functionName?: 'permitForAll' }
    : UseContractWriteConfig<typeof deployerABI, 'permitForAll', TMode> & {
        abi?: never
        functionName?: 'permitForAll'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'permitForAll', TMode>({
    abi: deployerABI,
    functionName: 'permitForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useDeployerSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof deployerABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'safeTransferFrom', TMode>({
    abi: deployerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useDeployerSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof deployerABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'setApprovalForAll', TMode>({
    abi: deployerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setAuthority"`.
 */
export function useDeployerSetAuthority<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'setAuthority'
        >['request']['abi'],
        'setAuthority',
        TMode
      > & { functionName?: 'setAuthority' }
    : UseContractWriteConfig<typeof deployerABI, 'setAuthority', TMode> & {
        abi?: never
        functionName?: 'setAuthority'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'setAuthority', TMode>({
    abi: deployerABI,
    functionName: 'setAuthority',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setDefaultTokenURIEngine"`.
 */
export function useDeployerSetDefaultTokenUriEngine<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'setDefaultTokenURIEngine'
        >['request']['abi'],
        'setDefaultTokenURIEngine',
        TMode
      > & { functionName?: 'setDefaultTokenURIEngine' }
    : UseContractWriteConfig<
        typeof deployerABI,
        'setDefaultTokenURIEngine',
        TMode
      > & {
        abi?: never
        functionName?: 'setDefaultTokenURIEngine'
      } = {} as any,
) {
  return useContractWrite<
    typeof deployerABI,
    'setDefaultTokenURIEngine',
    TMode
  >({
    abi: deployerABI,
    functionName: 'setDefaultTokenURIEngine',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setResolver"`.
 */
export function useDeployerSetResolver<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'setResolver'
        >['request']['abi'],
        'setResolver',
        TMode
      > & { functionName?: 'setResolver' }
    : UseContractWriteConfig<typeof deployerABI, 'setResolver', TMode> & {
        abi?: never
        functionName?: 'setResolver'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'setResolver', TMode>({
    abi: deployerABI,
    functionName: 'setResolver',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setSubnode"`.
 */
export function useDeployerSetSubnode<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'setSubnode'
        >['request']['abi'],
        'setSubnode',
        TMode
      > & { functionName?: 'setSubnode' }
    : UseContractWriteConfig<typeof deployerABI, 'setSubnode', TMode> & {
        abi?: never
        functionName?: 'setSubnode'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'setSubnode', TMode>({
    abi: deployerABI,
    functionName: 'setSubnode',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setSubnodeRecord"`.
 */
export function useDeployerSetSubnodeRecord<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'setSubnodeRecord'
        >['request']['abi'],
        'setSubnodeRecord',
        TMode
      > & { functionName?: 'setSubnodeRecord' }
    : UseContractWriteConfig<typeof deployerABI, 'setSubnodeRecord', TMode> & {
        abi?: never
        functionName?: 'setSubnodeRecord'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'setSubnodeRecord', TMode>({
    abi: deployerABI,
    functionName: 'setSubnodeRecord',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setTokenURIEngine"`.
 */
export function useDeployerSetTokenUriEngine<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'setTokenURIEngine'
        >['request']['abi'],
        'setTokenURIEngine',
        TMode
      > & { functionName?: 'setTokenURIEngine' }
    : UseContractWriteConfig<typeof deployerABI, 'setTokenURIEngine', TMode> & {
        abi?: never
        functionName?: 'setTokenURIEngine'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'setTokenURIEngine', TMode>({
    abi: deployerABI,
    functionName: 'setTokenURIEngine',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useDeployerTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof deployerABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof deployerABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof deployerABI, 'transferFrom', TMode>({
    abi: deployerABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__.
 */
export function usePrepareDeployerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareDeployerApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePrepareDeployerCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'createAccount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'createAccount'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareDeployerMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareDeployerOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'onERC721Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'onERC721Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareDeployerPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'permit'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'permit'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"permitForAll"`.
 */
export function usePrepareDeployerPermitForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'permitForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'permitForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'permitForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareDeployerSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareDeployerSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setAuthority"`.
 */
export function usePrepareDeployerSetAuthority(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'setAuthority'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'setAuthority',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'setAuthority'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setDefaultTokenURIEngine"`.
 */
export function usePrepareDeployerSetDefaultTokenUriEngine(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof deployerABI,
      'setDefaultTokenURIEngine'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'setDefaultTokenURIEngine',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof deployerABI,
    'setDefaultTokenURIEngine'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setResolver"`.
 */
export function usePrepareDeployerSetResolver(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'setResolver'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'setResolver',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'setResolver'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setSubnode"`.
 */
export function usePrepareDeployerSetSubnode(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'setSubnode'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'setSubnode',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'setSubnode'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setSubnodeRecord"`.
 */
export function usePrepareDeployerSetSubnodeRecord(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'setSubnodeRecord'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'setSubnodeRecord',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'setSubnodeRecord'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"setTokenURIEngine"`.
 */
export function usePrepareDeployerSetTokenUriEngine(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'setTokenURIEngine'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'setTokenURIEngine',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'setTokenURIEngine'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link deployerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareDeployerTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof deployerABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: deployerABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof deployerABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__.
 */
export function useDeployerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    ...config,
  } as UseContractEventConfig<typeof deployerABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"Approval"`.
 */
export function useDeployerApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useDeployerApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"AuthorityUpdated"`.
 */
export function useDeployerAuthorityUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'AuthorityUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'AuthorityUpdated',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'AuthorityUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"ERC6551AccountCreated"`.
 */
export function useDeployerErc6551AccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'ERC6551AccountCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'ERC6551AccountCreated',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'ERC6551AccountCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"Mint"`.
 */
export function useDeployerMintEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'Mint'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'Mint',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'Mint'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"NewResolver"`.
 */
export function useDeployerNewResolverEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'NewResolver'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'NewResolver',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'NewResolver'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"NewSubNode"`.
 */
export function useDeployerNewSubNodeEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'NewSubNode'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'NewSubNode',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'NewSubNode'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"SetDefaultTokenURIEngine"`.
 */
export function useDeployerSetDefaultTokenUriEngineEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'SetDefaultTokenURIEngine'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'SetDefaultTokenURIEngine',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'SetDefaultTokenURIEngine'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"SetTokenURI"`.
 */
export function useDeployerSetTokenUriEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'SetTokenURI'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'SetTokenURI',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'SetTokenURI'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link deployerABI}__ and `eventName` set to `"Transfer"`.
 */
export function useDeployerTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof deployerABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: deployerABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof deployerABI, 'Transfer'>)
}
