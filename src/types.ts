export type SectionId = 'home' | 'about' | 'features' | 'pricing';

export interface BotCommand {
  command: string;
  description: string;
  response: string;
  category: 'tracking' | 'risk' | 'market' | 'ai' | 'security';
  details?: string[];
}

export interface FeatureItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  techTag: string;
  metrics: string;
  details: string[];
  wireColor: string;
}

export interface TrackedToken {
  symbol: string;
  name: string;
  contractAddress: string;
  chain: string;
  priceUsd: number;
  priceChange24h: number;
  fdv: number;
  marketCap: number;
  liquidityUsd: number;
  volume24h: number;
  buys24h: number;
  sells24h: number;
  deployerAddress: string;
  isFactoryTraced: boolean;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidenceRating: number;
  explanation: string;
}

export interface DeveloperWallet {
  address: string;
  role: string;
  balanceToken: string;
  balanceEth: string;
  realizedGainsUsd: number;
  txCount: number;
  isFactoryTraced: boolean;
  factoryAddress?: string;
  lastActive: string;
}

export interface WalletTransaction {
  id: string;
  txHash: string;
  type: 'TRANSFER' | 'SELL' | 'LIQUIDITY_REMOVE' | 'MINT' | 'BUY';
  amount: string;
  valueUsd: number;
  timestamp: string;
  riskScore: number;
  confidence: number;
  explanation: string;
}

export interface ArchitectureLayerItem {
  name: string;
  description: string;
  schedule: string;
  icon: string;
  color: string;
}

export interface DataSourceItem {
  name: string;
  type: string;
  description: string;
  endpoints: string[];
  badge: string;
}
