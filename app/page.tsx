import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/Card';
import { MetricCard } from '@/components/ui/MetricCard';

const surfaceCards = [
  {
    title: 'Generate lessons',
    description: 'Turn a topic into a structured explanation with a single form.',
    href: '/dashboard',
  },
  {
    title: 'Test understanding',
    description: 'Move from reading to practice with a guided quiz flow.',
    href: '/quiz',
  },
  {
    title: 'Track progress',
    description: 'Review momentum, score summaries, and learner history.',
    href: '/progress',
  },
  {
    title: 'Manage profile',
    description: 'Keep the learner experience personalized and polished.',
    href: '/profile',
  },
];

const comingSoonCards = [
  'Community study rooms',
  'AI coach guidance',
  'Shareable certificates',
  'Saved lesson library',
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <Badge tone="primary">AI STEM Tutor MVP</Badge>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
                  Build lessons, quizzes, and learner profiles in one polished
                  workspace.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-text-secondary">
                  This foundation focuses on clear information architecture,
                  calm visual hierarchy, and a path for future product depth without
                  sacrificing readability.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 font-medium text-white shadow-glow transition-colors hover:bg-[#16357d]"
                >
                  Open Dashboard
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-border-color bg-white px-5 py-3 font-medium text-text-primary transition-colors hover:bg-surface-muted"
                >
                  Talk to Us
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface-muted px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                    Flow
                  </p>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    Dashboard to lesson to quiz
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-muted px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                    Style
                  </p>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    Minimal, refined, and calm
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-muted px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
                    Delivery
                  </p>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    Demo-ready and extendable
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl bg-brand-ink p-6 text-white shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                  Product flow
                </p>
                <Badge tone="warning">Demo mode ready</Badge>
              </div>

              <div className="space-y-3">
                {[
                  'Input a topic and select the learning depth.',
                  'Generate a lesson with structured explanation blocks.',
                  'Move into the quiz and review scoring instantly.',
                  'Expand into profile, progress, and support pages.',
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-6 text-white/85">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <MetricCard
            label="Core workspace"
            value="9 pages"
            detail="Dashboard, lesson, quiz, profile, settings, contact, progress, resources, and the landing page."
            accent="blue"
          />
          <MetricCard
            label="Future layers"
            value="4 placeholders"
            detail="Community, AI coach, certificates, and saved lessons are scaffolded for the next phase."
            accent="cyan"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
              Live surfaces
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
              Pages that already feel like a product
            </h2>
          </div>
          <Link href="/dashboard" className="text-sm font-medium text-brand-blue">
            Open the learning flow
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {surfaceCards.map(card => (
            <Link key={card.title} href={card.href}>
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-glow">
                <p className="text-lg font-semibold text-text-primary">{card.title}</p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {card.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Coming soon
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
            Placeholder pages are already scaffolded.
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            These routes make the product roadmap visible without pretending the
            feature already exists.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {comingSoonCards.map(feature => (
              <div
                key={feature}
                className="rounded-2xl border border-dashed border-border-color bg-surface-muted px-4 py-4 text-sm font-medium text-text-primary"
              >
                {feature}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            What this groundwork gives you
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-sm font-semibold text-text-primary">Consistency</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Every route inherits the same layout language, spacing, and
                hierarchy.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-sm font-semibold text-text-primary">Scalability</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                New features can be added as routes without rebuilding the shell.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-sm font-semibold text-text-primary">
                Demo readiness
              </p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Mock content adapts to the topic so investor walkthroughs feel alive.
              </p>
            </div>
            <div className="rounded-2xl bg-surface-muted p-4">
              <p className="text-sm font-semibold text-text-primary">Support</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Contact and profile pages make the platform feel complete.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
