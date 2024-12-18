// ./domain/dtos/purchase.ts

export interface ValidatePurchaseDTO {
  appUserId: string | number; // Accept string or number
  receiptData: string;
  platform: 'ios' | 'android';
  productId?: string;
  price?: number;
  currency?: string;
  isRestore?: boolean;
}


export interface RevenueCatWebhookEvent {
  event: string;
  subscriber: any;
  // Add other properties based on RevenueCat's webhook payload
}
