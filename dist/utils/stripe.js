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
exports.createCheckoutSession = exports.getCustomerByIDFromStripe = exports.getStripeCheckoutSession = exports.addNewCustomerToStripe = void 0;
const stripe_1 = require("../clients/stripe");
const addNewCustomerToStripe = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield stripe_1.stripeClient.customers.create({
        email,
        description: "New Customer",
    });
    return customer;
});
exports.addNewCustomerToStripe = addNewCustomerToStripe;
const getStripeCheckoutSession = (sessionID) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield stripe_1.stripeClient.checkout.sessions.retrieve(sessionID);
    return session;
});
exports.getStripeCheckoutSession = getStripeCheckoutSession;
const getCustomerByIDFromStripe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield stripe_1.stripeClient.customers.retrieve(id);
    return customer;
});
exports.getCustomerByIDFromStripe = getCustomerByIDFromStripe;
const createCheckoutSession = (customer, price) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield stripe_1.stripeClient.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer,
        line_items: [
            {
                price,
                quantity: 1,
            },
        ],
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment-failed?session_id={CHECKOUT_SESSION_ID}`,
    });
    return session;
});
exports.createCheckoutSession = createCheckoutSession;
