export type CategoryId =
  | 'cyberbullying'
  | 'fake-ai'
  | 'harmful-content'
  | 'worried-friend'
  | 'other'

export type Urgency = 'High' | 'Medium' | 'Low'

export type Status = 'Pending' | 'In Progress' | 'Resolved'

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
}

export interface Report {
  id: string
  code: string
  category: CategoryId
  details: string
  urgency: Urgency
  summary: string
  createdAt: number
  status: Status
  isNew: boolean
  screenshot: Screenshot | null
  assigned_teacher: string | null
  messages: Message[]
}

export interface NewReportInput {
  category: CategoryId
  details: string
  screenshot: Screenshot | null
  assigned_teacher: string | null
}
