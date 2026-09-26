import amazonLogo from '@/assets/logos/amazon-prime.svg';
import mcdonaldLogo from '@/assets/logos/mcdonald.svg';
import mediumLogo from '@/assets/logos/medium.svg';
import redditLogo from '@/assets/logos/reddit.svg';

import type { Signal } from './types';

export const signalsFixture: Signal[] = [
  {
    id: 'signal-001',
    category: 'role-change',
    inSequence: true,
    message: [
      { text: 'Robert Smith', emphasis: 'strong' },
      { text: ' changed role from SDR to Senior SDR at ' },
      { text: 'Medium', emphasis: 'accent' },
    ],
    date: '2025-04-02',
    image: { src: mediumLogo, alt: 'Medium' },
  },
  {
    id: 'signal-002',
    category: 'company-change',
    inSequence: false,
    message: [
      { text: 'Robert Smith', emphasis: 'strong' },
      { text: ' changed company from TravelPerk to ' },
      { text: 'Medium', emphasis: 'accent' },
    ],
    date: '2025-04-02',
    image: { src: mediumLogo, alt: 'Medium' },
  },
  {
    id: 'signal-003',
    category: 'website-view',
    inSequence: false,
    message: [
      { text: 'Amazon', emphasis: 'strong' },
      { text: ' viewed ' },
      { text: '2 pages', emphasis: 'accent' },
      { text: ' of your website for 65 sec' },
    ],
    date: '2025-04-02',
    image: { src: amazonLogo, alt: 'Amazon' },
  },
  {
    id: 'signal-004',
    category: 'role-change',
    inSequence: false,
    message: [
      { text: 'Emily Johnson', emphasis: 'strong' },
      { text: ' changed role from Account Executive to Sales Manager at ' },
      { text: "McDonald's", emphasis: 'accent' },
    ],
    date: '2025-04-01',
    image: { src: mcdonaldLogo, alt: "McDonald's" },
  },
  {
    id: 'signal-005',
    category: 'website-view',
    inSequence: true,
    message: [
      { text: 'Reddit', emphasis: 'strong' },
      { text: ' viewed ' },
      { text: '4 pages', emphasis: 'accent' },
      { text: ' of your website for 2 min' },
    ],
    date: '2025-04-01',
    image: { src: redditLogo, alt: 'Reddit' },
  },
  {
    id: 'signal-006',
    category: 'company-change',
    inSequence: true,
    message: [
      { text: 'Daniel Lee', emphasis: 'strong' },
      { text: ' changed company from Notion to ' },
      { text: 'Medium', emphasis: 'accent' },
    ],
    date: '2025-03-31',
    image: { src: mediumLogo, alt: 'Medium' },
  },
  {
    id: 'signal-007',
    category: 'website-view',
    inSequence: false,
    message: [
      { text: "McDonald's", emphasis: 'strong' },
      { text: ' viewed ' },
      { text: '3 pages', emphasis: 'accent' },
      { text: ' of your website for 48 sec' },
    ],
    date: '2025-03-30',
    image: { src: mcdonaldLogo, alt: "McDonald's" },
  },
  {
    id: 'signal-008',
    category: 'role-change',
    inSequence: true,
    message: [
      { text: 'Sofia Martinez', emphasis: 'strong' },
      { text: ' changed role from Marketing Specialist to Head of Growth at ' },
      { text: 'Reddit', emphasis: 'accent' },
    ],
    date: '2025-03-29',
    image: { src: redditLogo, alt: 'Reddit' },
  },
  {
    id: 'signal-009',
    category: 'company-change',
    inSequence: false,
    message: [
      { text: 'James Wilson', emphasis: 'strong' },
      { text: ' changed company from Shopify to ' },
      { text: 'Amazon', emphasis: 'accent' },
    ],
    date: '2025-03-28',
    image: { src: amazonLogo, alt: 'Amazon' },
  },
  {
    id: 'signal-010',
    category: 'website-view',
    inSequence: true,
    message: [
      { text: 'Medium', emphasis: 'strong' },
      { text: ' viewed ' },
      { text: '5 pages', emphasis: 'accent' },
      { text: ' of your website for 3 min' },
    ],
    date: '2025-03-27',
    image: { src: mediumLogo, alt: 'Medium' },
  },
  {
    id: 'signal-011',
    category: 'role-change',
    inSequence: false,
    message: [
      { text: 'Olivia Brown', emphasis: 'strong' },
      { text: ' changed role from Recruiter to Talent Lead at ' },
      { text: 'Amazon', emphasis: 'accent' },
    ],
    date: '2025-03-26',
    image: { src: amazonLogo, alt: 'Amazon' },
  },
  {
    id: 'signal-012',
    category: 'company-change',
    inSequence: true,
    message: [
      { text: 'Noah Williams', emphasis: 'strong' },
      { text: ' changed company from HubSpot to ' },
      { text: 'Reddit', emphasis: 'accent' },
    ],
    date: '2025-03-25',
    image: { src: redditLogo, alt: 'Reddit' },
  },
];
