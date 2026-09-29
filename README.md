Mon Bridge DEX

A DEX frontend I'm building for Monad.

Built with React + Vite, with Privy for wallet connection and the usual Web3 stuff around it.

What it has
Wallet connection
Swap UI
Liquidity UI
Portfolio
Token selection
Wallet balances
Responsive layout
Monad integration
Privy wallet integration

Some parts are still being worked on and tested. The UI is mostly there; I'm currently going through the actual network/config/transaction side to make sure everything is using the right contracts and addresses.

Stack
React
Vite
JavaScript
Privy
Monad
Git / GitHub
Run it locally

Clone the repo:

git clone https://github.com/MakkyHive/statc-frontend-new.git
cd statc-frontend-new

Install:

npm install

Start:

npm run dev

Build:

npm run build
Environment

Create a .env file in the root of the project and add the environment variables used by the app.

Don't put private keys, seed phrases or other sensitive credentials in the repo.

Current status

The frontend is up and the main DEX screens are in place.

Still checking/fixing:

Monad network configuration
Token addresses
Contract addresses
Swap transactions
Liquidity transactions
Wallet transaction flow
Error handling
Build size / performance

Basically, the next step is making sure everything that looks like it works actually works on-chain.

Project

GitHub:

https://github.com/MakkyHive/statc-frontend-new

Built while learning and building on Monad.