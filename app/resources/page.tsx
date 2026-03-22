import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';

const resourceGroups = [
  {
    title: 'Lesson templates',
    description: 'Reusable structures for explanations, examples, and summaries.',
    items: ['Core concept outline', 'Step-by-step guide', 'Recap format'],
  },
  {
    title: 'Quiz drills',
    description: 'Short practice sets that keep recall active between lessons.',
    items: ['Single-choice review', 'Topic refreshers', 'Confidence checks'],
  },
  {
    title: 'Study kits',
    description: 'Saved prompts and topic packs for deeper sessions later on.',
    items: ['Topic collection', 'Language presets', 'Depth presets'],
  },
  {
    title: 'Reference aids',
    description: 'Supporting material that makes the product feel more complete.',
    items: ['Glossary', 'Formula sheet', 'Quick revision note'],
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Resources"
        title="A library for deeper study."
        description="This page gathers the supporting materials around the learning flow so the platform has a home for templates, reference aids, and future saved content."
        status="It is live now, even though some of the surrounding features are still placeholders."
        action={<Badge tone="accent">Study library</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {resourceGroups.map(group => (
          <Card key={group.title} className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-text-primary">{group.title}</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {group.description}
              </p>
            </div>
            <div className="space-y-2">
              {group.items.map(item => (
                <div
                  key={item}
                  className="rounded-2xl bg-surface-muted px-4 py-3 text-sm font-medium text-text-primary"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            Suggested path
          </p>
          <h2 className="text-2xl font-semibold text-text-primary">
            Move from lesson creation to revision
          </h2>
          <p className="text-sm leading-6 text-text-secondary">
            A simple flow makes the platform easier to understand: create a lesson,
            test knowledge, check progress, and save the materials you want to come
            back to later.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 font-medium text-white shadow-glow transition-colors hover:bg-[#16357d]"
            >
              Open dashboard
            </Link>
            <Link
              href="/saved"
              className="inline-flex items-center justify-center rounded-full border border-border-color bg-white px-5 py-3 font-medium text-text-primary transition-colors hover:bg-surface-muted"
            >
              View saved lessons
            </Link>
          </div>
        </Card>

        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-secondary">
            What to add next
          </p>
          <div className="space-y-3">
            {[
              'Bookmark lessons from the lesson page.',
              'Export quizzes into reusable practice sets.',
              'Group resources by subject and learning level.',
              'Add downloadable study packs later.',
            ].map(item => (
              <div
                key={item}
                className="rounded-2xl bg-surface-muted px-4 py-3 text-sm leading-6 text-text-primary"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
