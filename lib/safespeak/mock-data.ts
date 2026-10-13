import type { Report } from './types'

const t = (iso: string) => new Date(iso).getTime()

export const DEMO_CODE = 'SAFE-PANDA-42'

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'R-1004',
    code: 'SAFE-COMET-17',
    category: 'fake-ai',
    details:
      'Someone made a fake AI picture of me and posted it in the class group chat. Now people keep sending it around and I feel scared to go to school tomorrow.',
    urgency: 'High',
    summary:
      'Student reports an AI-generated image of themselves circulating in a class group chat and expresses fear of attending school; recommend a counselor check-in within the hour.',
    createdAt: t('2026-10-13T08:42:00'),
    status: 'Pending',
    isNew: true,
    screenshot: { url: '/mock-screenshot.png', name: 'group-chat.png', blurred: true },
    messages: [],
  },
  {
    id: 'R-1003',
    code: DEMO_CODE,
    category: 'cyberbullying',
    details:
      'A group of kids from my grade keep leaving mean comments on everything I post and they made a group chat just to laugh at me.',
    urgency: 'Medium',
    summary:
      'Student describes repeated targeted comments and an exclusionary group chat by grade-level peers; recommend follow-up within 24 hours.',
    createdAt: t('2026-10-12T15:10:00'),
    status: 'In Progress',
    isNew: false,
    screenshot: { url: '/mock-screenshot.png', name: 'comments.png', blurred: true },
    messages: [
      {
        id: 'm1',
        from: 'counselor',
        text: 'Thank you for telling us. We are looking into this, you are safe. Is this still happening today?',
        sentAt: t('2026-10-12T16:02:00'),
      },
      {
        id: 'm2',
        from: 'student',
        text: 'Yes, there were more comments this morning.',
        sentAt: t('2026-10-13T07:55:00'),
      },
    ],
  },
  {
    id: 'R-1002',
    code: 'SAFE-OTTER-63',
    category: 'worried-friend',
    details:
      "My best friend has been really quiet and says she's lonely all the time. She stopped eating lunch with us. I'm worried about her.",
    urgency: 'Medium',
    summary:
      'Student is concerned about a friend showing withdrawal and loneliness; recommend a discreet wellbeing check within 24 hours.',
    createdAt: t('2026-10-11T12:25:00'),
    status: 'Pending',
    isNew: true,
    screenshot: null,
    messages: [],
  },
  {
    id: 'R-1001',
    code: 'SAFE-MAPLE-28',
    category: 'harmful-content',
    details: 'I saw a video on a gaming site with a lot of gross stuff and it kept auto-playing.',
    urgency: 'Low',
    summary:
      'Student encountered upsetting auto-playing video content on a gaming site with no immediate safety indicators; recommend routine review.',
    createdAt: t('2026-10-09T10:05:00'),
    status: 'Resolved',
    isNew: false,
    screenshot: null,
    messages: [
      {
        id: 'm3',
        from: 'counselor',
        text: "Thanks for letting us know! We've reported that site to IT so it gets blocked on school devices.",
        sentAt: t('2026-10-09T13:40:00'),
      },
    ],
  },
]

export const RESPONSE_TEMPLATES = [
  'We are looking into this, you are safe.',
  'Thank you for being brave and telling us.',
  'Can you share a little more about when this happened?',
  "A counselor would love to chat. Stop by Room 104 anytime — you're not in trouble.",
]
