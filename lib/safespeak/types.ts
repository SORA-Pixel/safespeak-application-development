export type CategoryId =
  | 'cyberbullying'
  | 'fake-ai'
  | 'harmful-content'
  | 'worried-friend'
  | 'other'

export type Urgency = 'High' | 'Medium' | 'Low'

export type Status = 'Pending' | 'In Progress' | 'Resolved'
export type TeacherId = 'any' | 'alexis' | 'botto'

export const TEACHERS = {
  alexis: { id: 'alexis', name: 'Mr. Alexis', staffId: 'STAFF-9901' },
  botto: { id: 'botto', name: 'Mr. Botto', staffId: 'STAFF-9902' },
} as const

export const STATUSES: Status[] = ['Pending', 'In Progress', 'Resolved']
export const URGENCIES: Urgency[] = ['High', 'Medium', 'Low']

export interface Message {
  id: string
  from: 'student' | 'counselor'
  text: string
  sentAt: number
}

export interface Screenshot {
  url: string
  name: string
  blurred: boolean
}

export interface Report {
  id: string
  assignedTo: TeacherId
  code: string
  category: CategoryId
  details: string
  urgency: Urgency
  summary: string
  createdAt: number
  status: Status
  isNew: boolean
  screenshot: Screenshot | null
  messages: Message[]
}

export interface NewReportInput {
  category: CategoryId
  assignedTo: TeacherId
  details: string
  screenshot: Screenshot | null
}
