import { Subscription } from '../models/subscription.model';

export function isSubscriptionExpiringSoon(subscription: Subscription, thresholdDays = 7): boolean {
  return subscription.status === 'active' && subscription.daysUntilRenewal <= thresholdDays;
}

export function isSubscriptionOverdue(subscription: Subscription): boolean {
  return subscription.status === 'active' && subscription.daysUntilRenewal < 0;
}

export function canCancelSubscription(subscription: Subscription): boolean {
  return subscription.status === 'active' || subscription.status === 'paused';
}

export function canPauseSubscription(subscription: Subscription): boolean {
  return subscription.status === 'active';
}
