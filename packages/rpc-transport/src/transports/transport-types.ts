import { ClusterUrl, DevnetUrl, MainnetUrl, TestnetUrl } from '@solana/rpc-types';

import { RpcWebSocketConnection } from './websocket/websocket-connection';

// HTTP transport

type RpcTransportConfig = Readonly<{
    payload: unknown;
    signal?: AbortSignal;
}>;

export interface IRpcTransport {
    <TResponse>(config: RpcTransportConfig): Promise<TResponse>;
}
export type IRpcTransportDevnet = IRpcTransport & { '~cluster': 'devnet' };
export type IRpcTransportTestnet = IRpcTransport & { '~cluster': 'testnet' };
export type IRpcTransportMainnet = IRpcTransport & { '~cluster': 'mainnet' };
export type IRpcTransportWithCluster = IRpcTransportDevnet | IRpcTransportTestnet | IRpcTransportMainnet;
export type IRpcTransportFromClusterUrl<TClusterUrl extends ClusterUrl> = TClusterUrl extends DevnetUrl
    ? IRpcTransportDevnet
    : TClusterUrl extends TestnetUrl
      ? IRpcTransportTestnet
      : TClusterUrl extends MainnetUrl
        ? IRpcTransportMainnet
        : IRpcTransport;

type RpcWebSocketTransportConfig = Readonly<{
    payload: unknown;
    signal: AbortSignal;
}>;

// WebSocket transport

export interface IRpcWebSocketTransport {
    (config: RpcWebSocketTransportConfig): Promise<
        Readonly<
            Omit<RpcWebSocketConnection, 'send'> & {
                send_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: RpcWebSocketConnection['send'];
            }
        >
    >;
}

export type IRpcWebSocketTransportDevnet = IRpcWebSocketTransport & { '~cluster': 'devnet' };
export type IRpcWebSocketTransportTestnet = IRpcWebSocketTransport & { '~cluster': 'testnet' };
export type IRpcWebSocketTransportMainnet = IRpcWebSocketTransport & { '~cluster': 'mainnet' };
export type IRpcWebSocketTransportWithCluster =
    | IRpcWebSocketTransportDevnet
    | IRpcWebSocketTransportTestnet
    | IRpcWebSocketTransportMainnet;
export type IRpcWebSocketTransportFromClusterUrl<TClusterUrl extends ClusterUrl> = TClusterUrl extends DevnetUrl
    ? IRpcWebSocketTransportDevnet
    : TClusterUrl extends TestnetUrl
      ? IRpcWebSocketTransportTestnet
      : TClusterUrl extends MainnetUrl
        ? IRpcWebSocketTransportMainnet
        : IRpcWebSocketTransport;
