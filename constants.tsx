
import { Post } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of AI in Modern Creative Workflows',
    excerpt: 'Exploring how generative intelligence is reshaping how designers, writers, and artists approach their daily craft.',
    content: `Generative AI is no longer a futuristic concept—it's a present-day reality that is fundamentally altering creative workflows. From brainstorming ideas to generating high-fidelity assets, the collaboration between human intuition and machine efficiency is opening doors to unprecedented levels of productivity.\n\n### The Shift in Paradigm\nFor decades, creativity was seen as a uniquely human trait. However, as large language models and diffusion models become more sophisticated, they are acting as "copilots" rather than competitors. This shift allows creators to focus on higher-level strategy and emotional resonance while the AI handles iterative tasks.\n\n### Practical Applications\n1. **Concept Ideation**: AI can generate hundreds of variations of a single idea in seconds.\n2. **Drafting and Refinement**: Natural language processing helps in polishing prose and finding the right tone.\n3. **Visual Prototyping**: Image generation models allow for rapid visualization of complex scenes.\n\nAs we look forward, the challenge will not be how to beat the AI, but how to master the art of the prompt to unlock its full potential.`,
    coverImage: 'https://picsum.photos/seed/ai-future/1200/600',
    author: {
      name: 'Alex Sterling',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      role: 'Technology Lead'
    },
    date: '2024-05-15',
    category: 'Technology',
    readTime: '6 min'
  },
  {
    id: '2',
    title: 'Minimalism: Finding Clarity in a Digital World',
    excerpt: 'How stripping back our digital surroundings can lead to profound improvements in focus and mental well-being.',
    content: `In an era of constant notifications and infinite scrolling, the concept of digital minimalism has become more vital than ever. It's not about throwing away your smartphone, but about intentional usage.\n\n### The Cost of Attention\nEvery app on your phone is designed to compete for your attention. By reducing the number of inputs, we reclaim our cognitive load. Research shows that deep work thrives in environments with minimal distractions.\n\n### Steps to Digital Zen\n- **Audit your apps**: If you haven't used it in a month, delete it.\n- **Disable non-essential notifications**: Only allow humans to interrupt you, not algorithms.\n- **Define your "Golden Hours"**: Set specific times for disconnecting completely.\n\nThe goal of minimalism is simple: to make sure the tools we use serve us, and not the other way around.`,
    coverImage: 'https://picsum.photos/seed/minimalism/1200/600',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      role: 'Lifestyle Writer'
    },
    date: '2024-05-12',
    category: 'Lifestyle',
    readTime: '4 min'
  },
  {
    id: '3',
    title: 'Architectural Marvels: Sustaining Our Urban Environments',
    excerpt: 'A look at the buildings that are not only aesthetically stunning but also self-sufficient and eco-friendly.',
    content: `Urban architecture is undergoing a green revolution. As cities grow, the demand for sustainable housing that coexists with nature is at an all-time high.\n\n### Green Skyscrapers\nBuildings like the Bosco Verticale in Milan have shown that we can integrate thousands of trees into urban skylines, providing natural insulation and air purification.\n\n### Energy Autonomy\nModern architecture focuses on passive solar design, rainwater harvesting, and integrated wind turbines. These "living buildings" are moving away from being consumers of energy to becoming producers.\n\nSustainable design isn't just about the planet—it's about creating spaces where people feel connected to the environment even in the heart of a concrete jungle.`,
    coverImage: 'https://picsum.photos/seed/arch/1200/600',
    author: {
      name: 'Jordan Vane',
      avatar: 'https://i.pravatar.cc/150?u=jordan',
      role: 'Design Critic'
    },
    date: '2024-05-10',
    category: 'Architecture',
    readTime: '8 min'
  }
];

export const CATEGORIES = ['All', 'Technology', 'Lifestyle', 'Architecture', 'Design', 'Culture'];
