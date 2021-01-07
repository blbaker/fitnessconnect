import Stripe from 'stripe';
import { GeneralApiProblem } from './api';

export interface CreateSubscriptionResponse {
  code: string;
  customer: string;
  id: string;
  priceID: string;
}

export interface AwaitingActivationSubscription {
  code: string;
  customer: string;
  id: string;
  price_id: string;
  stripe_subscription_id: string;
  cancelled?: boolean;
  price: Stripe.Price;
  add_trial_on_activate?: boolean;
}

export interface Subscription extends Stripe.Subscription {
  cycle_subscription_id: string;
  stripe_subscription_id: string;
  cancelled?: boolean;
  price?: Stripe.Price;
  add_trial_on_activate?: boolean;
}

export type ResumeSubscriptionResponse = Subscription | null;
export type ResumeSubscriptionResult =
  | { kind: 'ok'; data: ResumeSubscriptionResponse }
  | GeneralApiProblem;

export type CancelSubscriptionResponse = Subscription | null;
export type CancelSubscriptionResult =
  | { kind: 'ok'; data: CancelSubscriptionResponse }
  | GeneralApiProblem;

export type GetSubscriptionsResponse = {
  active: Subscription[];
  inactive: Subscription[];
  awaitingActivation: Subscription[];
} | null;
export type GetSubscriptionsResult =
  | { kind: 'ok'; data: GetSubscriptionsResponse }
  | GeneralApiProblem;

export type CreateSubscriptionResult =
  | { kind: 'ok'; data: CreateSubscriptionResponse }
  | GeneralApiProblem;

export type CheckFingerprintExistsResponse = boolean;
export type CheckFingerprintExistsResult =
  | { kind: 'ok'; data: CheckFingerprintExistsResponse }
  | GeneralApiProblem;

export type GetPaymentMethodsResponse = Stripe.PaymentMethod[];
export type GetPaymentMethodsResult =
  | { kind: 'ok'; data: GetPaymentMethodsResponse }
  | GeneralApiProblem;

export type UpdatePaymentMethodResponse = Stripe.PaymentMethod;
export type UpdatePaymentMethodResult =
  | { kind: 'ok'; data: UpdatePaymentMethodResponse }
  | GeneralApiProblem;

export type CreatePaymentMethodResponse = Stripe.PaymentMethod;
export type CreatePaymentMethodResult =
  | { kind: 'ok'; data: UpdatePaymentMethodResponse }
  | GeneralApiProblem;

export type DeletePaymentMethodResponse = Stripe.PaymentMethod | null;
export type DeletePaymentMethodResult =
  | { kind: 'ok'; data: DeletePaymentMethodResponse }
  | GeneralApiProblem;

export type GetCustomerResponse = Stripe.Customer | null;
export type GetCustomerResult = { kind: 'ok'; data: CreateCustomerResponse } | GeneralApiProblem;

export type CreateCustomerResponse = Stripe.Customer | null;
export type CreateCustomerResult = { kind: 'ok'; data: CreateCustomerResponse } | GeneralApiProblem;

export type GetProductsResponse = Stripe.Product[] | null;
export type GetProductsResult = { kind: 'ok'; data: GetProductsResponse } | GeneralApiProblem;

export type GetPricesResponse = Stripe.Price[] | null;
export type GetPricesResult = { kind: 'ok'; data: GetPricesResponse } | GeneralApiProblem;
