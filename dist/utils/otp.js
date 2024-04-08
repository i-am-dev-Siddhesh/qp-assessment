"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.saveOrUpdateOTP = void 0;
const prisma_1 = require("../clients/prisma");
function generateNewOTP() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
}
function saveOrUpdateOTP(phone_number) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingOTP = yield prisma_1.prisma.oTP.findFirst({
            where: {
                phone_number
            },
        });
        if (existingOTP) {
            // Case 2: An OTP entry exists
            const updatedOTP = yield prisma_1.prisma.oTP.update({
                where: { id: existingOTP.id },
                data: {
                    otp: generateNewOTP(),
                    expirationTime: new Date(Date.now() + 100 * 60 * 1000), // 5 minutes from now
                },
            });
            return updatedOTP.otp;
        }
        else {
            // Case 1: No OTP entry exists, create a new one
            const newOTP = yield prisma_1.prisma.oTP.create({
                data: {
                    phone_number,
                    otp: generateNewOTP(),
                    expirationTime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
                },
            });
            return newOTP.otp;
        }
    });
}
exports.saveOrUpdateOTP = saveOrUpdateOTP;
// Function to verify OTP
function verifyOTP(phone_number, userOTP) {
    return __awaiter(this, void 0, void 0, function* () {
        const storedOTP = yield prisma_1.prisma.oTP.findFirst({
            where: {
                phone_number,
                otp: userOTP,
                expirationTime: { gte: new Date() },
            },
        });
        return storedOTP !== null;
    });
}
exports.verifyOTP = verifyOTP;
