import { types, getEnv, flow, applySnapshot, getSnapshot, getRoot } from 'mobx-state-tree';

import {
  GetPricesResult,
  GetProductsResult,
  CreateCustomerResult,
  CreateSubscriptionResult,
  GetPaymentMethodsResult,
  UpdatePaymentMethodResult,
  CreatePaymentMethodResult,
  GetCustomerResult,
  DeletePaymentMethodResult,
  GetSubscriptionsResult,
  AwaitingActivationSubscription,
  CancelSubscriptionResult,
  Subscription,
  CheckFingerprintExistsResult,
  ResumeSubscriptionResult,
} from '../models';
import { RequestStatusModel, RequestStatus } from '../libs/helpers';
import { Environment } from '../core/environment';
import Stripe from 'stripe';
import { sortBy } from 'lodash';

export const StripeStoreModel = types
  .model({
    /**
     * The status of the API request
     */
    status: RequestStatusModel,
    allPrices: types.array(types.frozen()),
    allProducts: types.array(types.frozen()),
    stripeCustomer: types.map(types.frozen()),
    stripeSubscription: types.map(types.frozen()),
    allPaymentMethods: types.optional(types.array(types.frozen()), []),
    allActiveSubscriptions: types.optional(types.array(types.frozen()), []),
    allAwaitingActivationSubscriptions: types.optional(types.array(types.frozen()), []),
    allInactiveSubscriptions: types.optional(types.array(types.frozen()), []),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get rootStore() {
      return getRoot(self) as any;
    },
    get prices() {
      return getSnapshot(self.allPrices) as Stripe.Price[];
    },
    get products() {
      return getSnapshot(self.allProducts) as Stripe.Product[];
    },
    get customer() {
      return getSnapshot(self.stripeCustomer) as Stripe.Customer;
    },
    get subscription() {
      return getSnapshot(self.stripeSubscription) as any;
    },
    get subscriptions(): Stripe.Subscription[] {
      return (getSnapshot(self.stripeCustomer) as Stripe.Customer).subscriptions
        ? (getSnapshot(self.stripeCustomer) as Stripe.Customer).subscriptions.data
        : [];
    },
    get inactiveSubscriptions() {
      return getSnapshot(self.allInactiveSubscriptions) as Subscription[];
    },
    get awaitingActivationSubscriptions() {
      return getSnapshot(
        self.allAwaitingActivationSubscriptions,
      ) as AwaitingActivationSubscription[];
    },
    get activeSubscriptions() {
      return getSnapshot(self.allActiveSubscriptions) as Subscription[];
    },
  }))
  .views((self) => ({
    get paymentMethods() {
      return !!self.allPaymentMethods.length && !!self.customer && !!self.customer.invoice_settings
        ? sortBy(
            getSnapshot(self.allPaymentMethods) as Stripe.PaymentMethod[],
            (paymentMethod) =>
              paymentMethod.id !== self.customer.invoice_settings.default_payment_method,
          )
        : self.allPaymentMethods;
    },
  }))
  .actions((self) => ({
    setStatus(value: RequestStatus) {
      self.status = value;
    },
  }))
  .actions((self) => ({
    getPrices: flow(function* () {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: GetPricesResult = yield self.environment.stripeApi.getPrices();
        if (response.kind === 'ok') {
          applySnapshot(self.allPrices, response.data);
          self.setStatus(RequestStatus.DONE);
          return self.prices;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    getProducts: flow(function* () {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: GetProductsResult = yield self.environment.stripeApi.getProducts();
        if (response.kind === 'ok') {
          applySnapshot(self.allProducts, response.data);
          self.setStatus(RequestStatus.DONE);
          return self.products;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    getSubscriptions: flow(function* () {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: GetSubscriptionsResult = yield self.environment.stripeApi.getSubscriptions();
        if (response.kind === 'ok') {
          applySnapshot(self.allActiveSubscriptions, response.data.active);
          applySnapshot(self.allInactiveSubscriptions, response.data.inactive);
          applySnapshot(self.allAwaitingActivationSubscriptions, response.data.awaitingActivation);
          self.setStatus(RequestStatus.DONE);
          return self.products;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    createCustomer: flow(function* (firstName, lastName, email) {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: CreateCustomerResult = yield self.environment.stripeApi.createCustomer(
          firstName,
          lastName,
          email,
        );
        if (response.kind === 'ok') {
          applySnapshot(self.stripeCustomer, response.data);
          self.setStatus(RequestStatus.DONE);
          return self.customer;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    createSubscription: flow(function* (customerId, paymentMethodId, priceId) {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: CreateSubscriptionResult = yield self.environment.stripeApi.createSubscription(
          customerId,
          paymentMethodId,
          priceId,
        );
        if (response.kind === 'ok') {
          console.log('response.data', response.data);
          applySnapshot(self.stripeSubscription, response.data);
          self.setStatus(RequestStatus.DONE);
          return self.customer;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    getCustomer: flow(function* () {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: GetCustomerResult = yield self.environment.stripeApi.getCustomer();
        if (response.kind === 'ok') {
          applySnapshot(self.stripeCustomer, response.data);
          self.setStatus(RequestStatus.DONE);
          return self.customer;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    getPaymentMethods: flow(function* () {
      try {
        const response: GetPaymentMethodsResult = yield self.environment.stripeApi.getPaymentMethods();
        if (response.kind === 'ok') {
          applySnapshot(self.allPaymentMethods, response.data);
          self.setStatus(RequestStatus.DONE);
          return self.paymentMethods;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    updatePaymentMethod: flow(function* (
      oldPaymentMethodId: string,
      newPaymentMethodId: string,
      isDefault = false,
    ) {
      try {
        const response: UpdatePaymentMethodResult = yield self.environment.stripeApi.updatePaymentMethod(
          oldPaymentMethodId,
          newPaymentMethodId,
          isDefault,
        );
        if (response.kind === 'ok') {
          self.setStatus(RequestStatus.DONE);
          return response.data;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    createPaymentMethod: flow(function* (paymentMethodId: string, isDefault = false) {
      try {
        const response: CreatePaymentMethodResult = yield self.environment.stripeApi.createPaymentMethod(
          paymentMethodId,
          isDefault,
        );
        if (response.kind === 'ok') {
          self.setStatus(RequestStatus.DONE);
          return response.data;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    deletePaymentMethod: flow(function* (paymentMethodId: string) {
      try {
        const response: DeletePaymentMethodResult = yield self.environment.stripeApi.deletePaymentMethod(
          paymentMethodId,
        );
        if (response.kind === 'ok') {
          self.setStatus(RequestStatus.DONE);
          return response.data;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    cancelSubscription: flow(function* (subscriptionId: string) {
      try {
        const response: CancelSubscriptionResult = yield self.environment.stripeApi.cancelSubscription(
          subscriptionId,
        );
        if (response.kind === 'ok') {
          self.setStatus(RequestStatus.DONE);
          return response.data;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    resumeSubscription: flow(function* (subscriptionId: string) {
      try {
        const response: ResumeSubscriptionResult = yield self.environment.stripeApi.resumeSubscription(
          subscriptionId,
        );
        if (response.kind === 'ok') {
          self.setStatus(RequestStatus.DONE);
          return response.data;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    checkFingerprintExists: flow(function* (paymentMethodId: string) {
      try {
        const response: CheckFingerprintExistsResult = yield self.environment.stripeApi.checkFingerprintExists(
          paymentMethodId,
        );
        if (response.kind === 'ok') {
          self.setStatus(RequestStatus.DONE);
          return response.data;
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
  }));

type StripeStoreType = typeof StripeStoreModel.Type;
export interface StripeStore extends StripeStoreType {}
type StripeStoreSnapshotType = typeof StripeStoreModel.SnapshotType;
export interface StripeStoreSnapshot extends StripeStoreSnapshotType {}
