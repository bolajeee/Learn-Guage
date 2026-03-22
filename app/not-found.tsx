import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

export default function NotFound() {
  return (
    <PlaceholderPage
      title="Page not found"
      description="The route you opened does not exist yet. Use the dashboard to get back into the main flow or contact support if you expected this page to be live."
      highlights={[
        'Return to the dashboard',
        'Check the coming soon routes',
        'Ask for help through the contact page',
      ]}
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"
      secondaryHref="/contact"
      secondaryLabel="Contact support"
    />
  );
}
