import coverAutomation from '../../assets/blog/which-tasks-are-worth-automating.svg'

export default {
    slug: 'which-tasks-are-worth-automating',
    title: 'The automation mindset: which tasks are actually worth it',
    excerpt:
      'Not everything repetitive should be automated. A simple, honest way to decide what to build, what to leave alone, and how to avoid automating a mess.',
    tag: 'Automation',
    tint: 'cyan',
    cover: coverAutomation,
    date: '2026-06-10',
    author: 'Rupam Bhakta',
    body: `The fastest way to waste a month is to automate the wrong task really well. I have done it, so now I run every idea through the same short filter before writing a line of code.

## The three questions

Before automating anything, I ask:

1. **How often does it actually happen?** Not how annoying it is, how *frequent*. A painful task you do twice a year is a bad target.
2. **Is the process stable?** If the steps change every week, you will spend more time maintaining the automation than you saved.
3. **What happens when it fails?** Automation fails silently and at scale. If a failure is expensive and hard to notice, you need guardrails before you need speed.

If a task is frequent, stable, and safe to get wrong occasionally, it is a strong candidate. Miss any one of those and I think twice.

## Do not automate a mess

Here is the trap. When a workflow is messy, automation feels like the fix. It is not. You are just making the mess run faster.

> Fix the process on paper first. If you cannot explain it in five plain steps, it is not ready to be automated.

Clean, then automate. Every time I skipped the clean step, I regretted it.

## Start with the boring 80 percent

The highest return is almost never the clever, edge-case-heavy part. It is the boring, high-volume middle. Copying data between two tools. Sending the same three follow-ups. Formatting a report the same way every Monday.

Automate that first, watch it for a week, and only then reach for the hard parts. The unglamorous wins compound quietly, and they rarely break.

## A quick gut check

If you can describe the task to a new teammate in two sentences and they could do it correctly, a machine probably can too. If it takes you ten minutes and a lot of "it depends," leave it with a human for now.`,
  }

