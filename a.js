"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viem_1 = require("viem");
var message = "Hello, World!";
var messageHash = (0, viem_1.hashMessage)(message);
console.log("messageHash", messageHash);
