import { useState } from "react";
import { createWalletClient, custom, Hex } from "viem";
import { recoverTypedDataAddress } from "viem";
import { sepolia } from "viem/chains"
const Data = () => {

    const [addr, setAddr] = useState("")
    const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum as any),
    });

    const handleGetAccount = async () => {

        await (window.ethereum as any).request({ method: 'eth_requestAccounts' });

        const [addr_] = await walletClient.getAddresses()
        setAddr(addr_)

    }


    const domain = {
        name: "Ether Mail",
        version: "1",
        chainId: 11155111n,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC" as Hex,
    };

    const types = {
        Person: [
            { name: "name", type: "string" },
            { name: "wallet", type: "address" },
        ],
        Mail: [
            { name: "from", type: "Person" },
            { name: "to", type: "Person" },
            { name: "contents", type: "string" },
        ],
    };

    const message = {
        from: { name: "Cow", wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826" },
        to: { name: "Bob", wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" },
        contents: "Hello, Bob!",
    }

    const signAndVerify = async () => {
        // 签名
        const signature = await walletClient.signTypedData({
            account: addr as Hex,
            domain: domain,
            types: types,
            primaryType: "Mail",
            message: message,
        });
        console.log("Signature:", signature);

        // 验证
        const recoveredAddress = await recoverTypedDataAddress({
            domain: domain,
            types: types,
            primaryType: "Mail",
            message: message,
            signature: signature,
        });
        console.log("Recovered Address:", recoveredAddress);
        const isValid = recoveredAddress.toLowerCase() === addr.toLowerCase();
        console.log("Signature Valid:", isValid);
    }

    return (
        <div>
            <p>
                这是wallet
                <button onClick={handleGetAccount}>登录</button>
                <button onClick={signAndVerify}>签名</button>
            </p>
        </div>
    )
}

export default Data