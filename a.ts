import { hashMessage } from "viem"
const message = "Hello, World!"

const messageHash = hashMessage(message)
console.log("messageHash", messageHash);
