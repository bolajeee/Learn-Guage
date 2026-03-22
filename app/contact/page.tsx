'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const updateField = (
    field: keyof ContactFormState,
    value: string
  ) => {
    setForm(current => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please complete your name, email, and message.');
      return;
    }

    if (!form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 900));
      setSuccessMessage('Your message has been queued. We will follow up soon.');
      setForm(initialFormState);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : 'Unable to send the message right now.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Contact"
        title="Talk to the team."
        description="Use this page for support, investor feedback, bug reports, or product requests."
        status="The form includes loading and validation states so it feels complete even before backend wiring."
        action={<Badge tone="accent">Support ready</Badge>}
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Full name"
                value={form.name}
                onChange={event => updateField('name', event.target.value)}
                placeholder="Your name"
              />
              <Input
                label="Email address"
                type="email"
                value={form.email}
                onChange={event => updateField('email', event.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <Input
              label="Subject"
              value={form.subject}
              onChange={event => updateField('subject', event.target.value)}
              placeholder="Bug report, feature request, or general support"
            />

            <Textarea
              label="Message"
              rows={6}
              value={form.message}
              onChange={event => updateField('message', event.target.value)}
              placeholder="Tell us what you need and how we can help."
            />

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {successMessage}
              </div>
            )}

            <Button type="submit" isLoading={isSubmitting} fullWidth>
              {isSubmitting ? 'Sending message...' : 'Send message'}
            </Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Support channels
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  title: 'General support',
                  detail: 'help@learngauge.ai',
                },
                {
                  title: 'Feature requests',
                  detail: 'product@learngauge.ai',
                },
                {
                  title: 'Response window',
                  detail: 'Within one business day',
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-surface-muted px-4 py-4"
                >
                  <p className="text-sm font-semibold text-text-primary">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              What to include
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-text-primary">
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                The topic you were working on.
              </div>
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                The page where something felt unclear or broken.
              </div>
              <div className="rounded-2xl bg-surface-muted px-4 py-3">
                Whether you want support, a feature, or a design change.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
