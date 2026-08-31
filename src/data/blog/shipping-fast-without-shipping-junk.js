import coverShipping from '../../assets/blog/shipping-fast-without-shipping-junk.svg'

export default {
    slug: 'shipping-fast-without-shipping-junk',
    title: 'Shipping fast without shipping junk',
    excerpt:
      'Speed and quality are not opposites. A short, practical checklist I run before anything I build goes in front of real users.',
    tag: 'Full-Stack',
    tint: 'green',
    cover: coverShipping,
    date: '2026-05-15',
    author: 'Rupam Bhakta',
    body: `"Move fast" gets a bad name because people hear "skip the basics." That is not it. Moving fast means having a small set of non-negotiables that are so routine they cost you almost nothing, so you can be reckless about everything else.

## My pre-ship checklist

None of this is clever. That is the point.

1. **It works on a phone.** Most first visits are mobile. If it breaks on a small screen, it is broken.
2. **The error states exist.** Empty, loading, and failed are real screens, not afterthoughts.
3. **Nothing secret is in the client.** Keys live on the server. Always.
4. **One real user could use it without me.** If it needs a tour, it needs work.

That is the whole list for a first release. Four things, done every time.

## Boring architecture, interesting product

The product should be interesting. The stack under it should be boring and predictable: **React** on the front, a clean **REST API**, a database you understand, and deployment you can repeat in your sleep. Save your creativity for the thing the user actually touches.

> Boring infrastructure is a feature. It fails less, and it fails in ways you can predict.

## Ship, watch, then decide

The last step is the one people skip: ship the smallest honest version, then *watch it* with real usage before adding anything. Half the features I was sure I needed turned out to be unnecessary once I saw how people actually used the thing.

Fast and careful are not a trade. They are the same habit, practised until it is quiet.`,
  }

