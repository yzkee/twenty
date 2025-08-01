/* @license Enterprise */

import { CustomException } from 'src/utils/custom-exception';

export class BillingException extends CustomException<BillingExceptionCode> {}

export enum BillingExceptionCode {
  BILLING_CUSTOMER_NOT_FOUND = 'BILLING_CUSTOMER_NOT_FOUND',
  BILLING_PLAN_NOT_FOUND = 'BILLING_PLAN_NOT_FOUND',
  BILLING_PRODUCT_NOT_FOUND = 'BILLING_PRODUCT_NOT_FOUND',
  BILLING_PRICE_NOT_FOUND = 'BILLING_PRICE_NOT_FOUND',
  BILLING_METER_NOT_FOUND = 'BILLING_METER_NOT_FOUND',
  BILLING_SUBSCRIPTION_NOT_FOUND = 'BILLING_SUBSCRIPTION_NOT_FOUND',
  BILLING_SUBSCRIPTION_ITEM_NOT_FOUND = 'BILLING_SUBSCRIPTION_ITEM_NOT_FOUND',
  BILLING_SUBSCRIPTION_EVENT_WORKSPACE_NOT_FOUND = 'BILLING_SUBSCRIPTION_EVENT_WORKSPACE_NOT_FOUND',
  BILLING_CUSTOMER_EVENT_WORKSPACE_NOT_FOUND = 'BILLING_CUSTOMER_EVENT_WORKSPACE_NOT_FOUND',
  BILLING_ACTIVE_SUBSCRIPTION_NOT_FOUND = 'BILLING_ACTIVE_SUBSCRIPTION_NOT_FOUND',
  BILLING_METER_EVENT_FAILED = 'BILLING_METER_EVENT_FAILED',
  BILLING_MISSING_REQUEST_BODY = 'BILLING_MISSING_REQUEST_BODY',
  BILLING_UNHANDLED_ERROR = 'BILLING_UNHANDLED_ERROR',
  BILLING_STRIPE_ERROR = 'BILLING_STRIPE_ERROR',
  BILLING_SUBSCRIPTION_NOT_IN_TRIAL_PERIOD = 'BILLING_SUBSCRIPTION_NOT_IN_TRIAL_PERIOD',
  BILLING_SUBSCRIPTION_INTERVAL_NOT_SWITCHABLE = 'BILLING_SUBSCRIPTION_INTERVAL_NOT_SWITCHABLE',
  BILLING_SUBSCRIPTION_PLAN_NOT_SWITCHABLE = 'BILLING_SUBSCRIPTION_PLAN_NOT_SWITCHABLE',
}
