import coverVoice from '../../assets/blog/voice-assistant-that-books-its-own-meetings.svg'

export default {
    slug: 'voice-assistant-that-books-its-own-meetings',
    title: 'How I built a 24/7 assistant that books its own meetings',
    excerpt:
      'A chat and voice agent that answers questions, qualifies leads, and puts real meetings on a calendar. Here is the architecture, the parts that were hard, and the parts that surprised me.',
    tag: 'AI Agents',
    tint: 'ember',
    cover: coverVoice,
    date: '2026-06-24',
    featured: true,
    author: 'Rupam Bhakta',
    body: `Most "AI chat" widgets are a search box wearing a costume. They answer a question and then go quiet. I wanted the opposite: an assistant that treats a conversation like a job, carries it forward, and ends with something useful on the calendar.

That became GetParlix, a 24/7 chat and voice assistant that drops onto any website with one line of code. This is how it works under the hood.

## The shape of the problem

A good assistant has to do four things well, and they pull in different directions:

- Answer accurately from a specific business's own material, not the open internet.
- Hold the thread across a long back and forth without losing context.
- Know when a visitor is a real lead and move them toward a booking.
- Stay fast enough that talking to it never feels like waiting.

If you optimise only for accuracy you get something slow and cautious. If you optimise only for speed you get something confidently wrong. The interesting work is in the balance.

## Retrieval first, generation second

Every client uploads their own documents: pricing, policies, product notes, FAQs. I chunk that content, embed it, and store the vectors in **PostgreSQL with pgvector**. When a visitor asks something, the assistant retrieves the most relevant chunks and answers *from those*, with the raw model only used to phrase the reply.

> The model is not the source of truth. The client's documents are. The model is just the voice.

This one decision removes most hallucination. If the answer is not in the retrieved context, the assistant says so and offers to connect the visitor with a human instead of inventing a number.

## Voice without the awkward pauses

The voice layer runs on the **OpenAI Realtime API** over a WebSocket, so audio streams both ways instead of waiting for a full turn to finish. The trick that made it feel natural was letting the model start speaking as soon as it had a confident opening, then continue as retrieval finished in the background.

\`\`\`js
// Stream partial audio the moment the first sentence is ready,
// instead of blocking on the full response.
socket.on('response.audio.delta', (chunk) => {
  speaker.play(chunk)
})
\`\`\`

## Booking is a first-class feature, not a link

The part people underrate: qualifying and booking. The assistant asks a couple of natural questions, decides whether the visitor fits, and if they do it opens a real slot and writes the meeting to the calendar. No "here is a link, good luck." The booking engine is its own service so it can enforce availability and avoid double-booking.

### What surprised me

1. Visitors trust a bot that admits what it does not know far more than one that always has an answer.
2. Voice sessions are longer and convert better than chat, but only when latency stays under about a second.
3. Ninety percent of the value came from retrieval quality, not from the model choice.

## Where it goes next

The next step is memory across visits, so a returning lead does not start from zero. But the core lesson holds: an assistant is only worth embedding if a business can trust it to run without someone watching it. Build for that trust first, and the wow follows.`,
  }

