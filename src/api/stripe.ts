import { ApiResponse } from 'apisauce';

import { Api } from './api';
import {
  getGeneralApiProblem,
  GetPricesResult,
  GetPricesResponse,
  GetProductsResult,
  GetProductsResponse,
  CreateCustomerResult,
  CreateCustomerResponse,
  CreateSubscriptionResult,
  CreateSubscriptionResponse,
  GetPaymentMethodsResult,
  GetPaymentMethodsResponse,
  UpdatePaymentMethodResult,
  UpdatePaymentMethodResponse,
  CreatePaymentMethodResult,
  CreatePaymentMethodResponse,
  GetCustomerResult,
  GetCustomerResponse,
  DeletePaymentMethodResult,
  DeletePaymentMethodResponse,
  GetSubscriptionsResult,
  GetSubscriptionsResponse,
  CancelSubscriptionResult,
  CancelSubscriptionResponse,
  CheckFingerprintExistsResult,
  CheckFingerprintExistsResponse,
  ResumeSubscriptionResult,
  ResumeSubscriptionResponse,
} from '../models';

/**
 * Manages all requests to the Stripe API.
 */
export class StripeApi extends Api {
  /**
   * Get list of prices
   */
  async getPrices(): Promise<GetPricesResult> {
    // make the api call
    const response: ApiResponse<GetPricesResponse> = await Api.apisauce.get(`/prices/getPrices/`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Get list of products
   */
  async getProducts(): Promise<GetProductsResult> {
    // make the api call
    const response: ApiResponse<GetProductsResponse> = await Api.apisauce.get(
      `/prices/getProducts/`,
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Get list of subscriptions for Customer
   */
  async getSubscriptions(): Promise<GetSubscriptionsResult> {
    // make the api call
    const response: ApiResponse<GetSubscriptionsResponse> = await Api.apisauce.get(
      `/subscription/`,
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Resume a subscription
   */
  async resumeSubscription(subscriptionId): Promise<ResumeSubscriptionResult> {
    // make the api call
    const response: ApiResponse<ResumeSubscriptionResponse> = await Api.apisauce.patch(
      `/subscription/resumeSubscription/`,
      { subscriptionId },
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId): Promise<CancelSubscriptionResult> {
    // make the api call
    const response: ApiResponse<CancelSubscriptionResponse> = await Api.apisauce.delete(
      `/subscription/`,
      { subscriptionId },
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Create a Stripe Customer
   */
  async createCustomer(firstName, lastName, email): Promise<CreateCustomerResult> {
    // make the api call
    const response: ApiResponse<CreateCustomerResponse> = await Api.apisauce.post(`/customers/`, {
      firstName,
      lastName,
      email,
    });

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Get a Stripe Customer
   */
  async getCustomer(): Promise<GetCustomerResult> {
    // make the api call
    const response: ApiResponse<GetCustomerResponse> = await Api.apisauce.get(`/customer/`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Create a Stripe Customer
   */
  async createSubscription(
    customerId,
    paymentMethodId,
    priceId,
  ): Promise<CreateSubscriptionResult> {
    // make the api call
    const response: ApiResponse<CreateSubscriptionResponse> = await Api.apisauce.post(
      `/subscription/createSubscription/`,
      { customerId, paymentMethodId, priceId },
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Get all user's payment methods
   */
  async getPaymentMethods(): Promise<GetPaymentMethodsResult> {
    // make the api call
    const response: ApiResponse<GetPaymentMethodsResponse> = await Api.apisauce.get(
      `/payments/paymentMethods/`,
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Create a Payment Method
   */
  async createPaymentMethod(
    paymentMethodId: string,
    isDefault = false,
  ): Promise<CreatePaymentMethodResult> {
    // make the api call
    const response: ApiResponse<CreatePaymentMethodResponse> = await Api.apisauce.post(
      `/payments/paymentMethods/`,
      { paymentMethodId, isDefault },
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Delete a Payment Method
   */
  async deletePaymentMethod(paymentMethodId: string): Promise<DeletePaymentMethodResult> {
    // make the api call
    const response: ApiResponse<DeletePaymentMethodResponse> = await Api.apisauce.delete(
      `/payments/paymentMethods/`,
      { paymentMethodId },
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Update a Payment Method
   */
  async updatePaymentMethod(
    oldPaymentMethodId: string,
    newPaymentMethodId: string,
    isDefault = false,
  ): Promise<UpdatePaymentMethodResult> {
    // make the api call
    const response: ApiResponse<UpdatePaymentMethodResponse> = await Api.apisauce.patch(
      `/payments/paymentMethods/`,
      { oldPaymentMethodId, newPaymentMethodId, isDefault },
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Check if payment method fingerprint already has trial
   */
  async checkFingerprintExists(paymentMethodId: string): Promise<CheckFingerprintExistsResult> {
    // make the api call
    const response: ApiResponse<CheckFingerprintExistsResponse> = await Api.apisauce.get(
      `/payments/fingerprintExists/`,
      { paymentMethodId },
    );
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }
}
