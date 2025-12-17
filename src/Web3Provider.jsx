import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'AniVerse 3D',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect Project ID from https://cloud.walletconnect.com
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export default function Web3Provider({ children }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

