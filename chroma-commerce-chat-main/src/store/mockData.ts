
import { Chat } from './types';

// Mock data for initial development
export const mockChatHistory: Chat[] = [
  {
    id: "1",
    title: "Product recommendation",
    createdAt: new Date().toISOString(),
    messages: [
      {
        id: "m1",
        content: "Can you recommend some wireless headphones?",
        role: "user" as const,
        timestamp: new Date().toISOString(),
      },
      {
        id: "m2",
        content: "I'd be happy to recommend some wireless headphones for you!",
        role: "assistant" as const,
        timestamp: new Date().toISOString(),
        products: [
          {
            id: "p1",
            name: "SoundWave Pro X",
            price: 199.99,
            description: "Premium wireless headphones with noise cancellation",
            image: "/placeholder.svg",
          },
          {
            id: "p2",
            name: "AudioMax Wireless",
            price: 149.99,
            description: "Comfortable over-ear wireless headphones with 30hr battery",
            image: "/placeholder.svg",
          },
          {
            id: "p2",
            name: "AudioMax Wireless",
            price: 149.99,
            description: "Comfortable over-ear wireless headphones with 30hr battery",
            image: "/placeholder.svg",
          },
          {
            id: "p2",
            name: "AudioMax Wireless",
            price: 149.99,
            description: "Comfortable over-ear wireless headphones with 30hr battery",
            image: "/placeholder.svg",
          },
          {
            id: "p3",
            name: "EarBuds Ultra",
            price: 89.99,
            description: "Compact wireless earbuds with water resistance",
            image: "/placeholder.svg",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Camera inquiry",
    createdAt: new Date().toISOString(),
    messages: [
      {
        id: "m3",
        content: "What's the best budget DSLR camera?",
        role: "user" as const,
        timestamp: new Date().toISOString(),
      },
    ],
  },
];
