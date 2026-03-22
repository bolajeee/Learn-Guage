import type { Metadata, Viewport } from 'next';
import './globals.css';

/**
 * Site metadata for SEO
 */
export const metadata: Metadata = {
  title: 'Learn Gauge - AI-Powered Learning Platform',
  description:
    'Get personalized lessons and quizzes powered by AI. Learn any topic at your own pace with customizable difficulty levels.',
  keywords: [
    'AI learning',
    'personalized education',
    'STEM tutoring',
    'online learning',
  ],
  authors: [{ name: 'Learn Gauge' }],
  creator: 'Learn Gauge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://learngauge.com',
    siteName: 'Learn Gauge',
    title: 'Learn Gauge - AI-Powered Learning Platform',
    description:
      'Get personalized lessons and quizzes powered by AI. Learn any topic at your own pace.',
  },
};

/**
 * Viewport configuration
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1E40AF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
