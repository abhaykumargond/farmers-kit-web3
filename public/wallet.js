// Phantom Wallet connection logic
const connectWallet = async () => {
    try {
        const provider = window.solana;
        if (provider && provider.isPhantom) {
            const response = await provider.connect();
            console.log("Connected to wallet: ", response.publicKey.toString());
            document.getElementById('wallet-publickey').textContent = "Wallet Public Key: " + response.publicKey.toString();

            // Fetch and display the wallet balance
            const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
            const balance = await connection.getBalance(new solanaWeb3.PublicKey(response.publicKey.toString()));
            document.getElementById('wallet-balance').textContent = "Wallet Balance: " + (balance / solanaWeb3.LAMPORTS_PER_SOL) + " SOL";
        } else {
            alert("Phantom Wallet not found! Please install it.");
        }
    } catch (err) {
        console.error("Error connecting to Phantom Wallet", err);
    }
};

// Disconnect Wallet logic
const disconnectWallet = () => {
    const provider = window.solana;
    if (provider && provider.isPhantom) {
        provider.disconnect();
        document.getElementById('wallet-publickey').textContent = "Disconnected";
        document.getElementById('wallet-balance').textContent = "";
    }
};

// Ensure the DOM is fully loaded before adding the event listeners
document.addEventListener('DOMContentLoaded', () => {
    const phantomProvider = window.solana;

    if (phantomProvider && phantomProvider.isPhantom) {
        console.log("Phantom wallet detected!");

        // Event listener for the connect button
        document.getElementById("connect-wallet").addEventListener("click", connectWallet);

        // Event listener for the disconnect button
        document.getElementById("disconnect-wallet").addEventListener("click", disconnectWallet);
    } else {
        alert("Phantom Wallet not detected! Install it from https://phantom.app");
    }
});