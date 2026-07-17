export type AnalyticsEvent =
  | { name: 'vehicle_view'; vehicleSlug: string }
  | { name: 'vehicle_color_change'; vehicleSlug: string; colorId: string }
  | { name: 'financing_simulation'; vehicleSlug?: string; tenorMonths: number }
  | { name: 'whatsapp_click'; context: string }
  | { name: 'lead_submit'; leadType: string }
  | { name: 'compare_add'; vehicleSlug: string };

/**
 * Minimal, dependency-free analytics sink. Swap the console.debug call for a
 * real provider (GA4, PostHog, etc.) once one is chosen — every call site in
 * the app already funnels through this single function.
 */
export function track(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event);
  }
}
