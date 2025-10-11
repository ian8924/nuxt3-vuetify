import type { Dayjs } from 'dayjs'

export interface Activity {
  id: number
  eventId: string
  name: string
  organizer: string
  startedAt: Dayjs | string
  endedAt: Dayjs | string
  description: string
  contactInfo: string
  regionCode: string
  location: string
  url: string
  status: number
  createdFrom: number
  createdBy: number
  createdAt: string
  updatedAt: string
  coverPhotoUrl: string
  visibility: number
  sharedPassword: string
  activityTime: string
  theme: {
    id: number
    name: string
    description: string
    colorCode: string
    iconUrl: string
    isActive: boolean
    createdBy: number
    createdAt: string
    updatedAt: string
  }

  tags: {
    id: number
    name: string
    description: string
    colorCode: string
    usageCount: number
    isActive: boolean
    createdBy: number
    createdAt: string
    updatedAt: string
  }[]

  roles: {
    id: number
    name: string
    permissions: string[]
    userIds: number[]
  }[]

  links: {
    id: number
    activityId: number
    type: 'button'
    text: string
    action: string
    target: string
    displayOrder: number
    isActive: boolean
    createdBy: number
    createdAt: string
    updatedAt: string
  }[]

  participants: {
    id: number
    activityId: number
    type: string
    title: string
    name: string
    url: string
    avatarUrl: string
    displayOrder: number
    createdBy: number
    createdAt: string
    updatedAt: string
  }[]

}

export interface Tag {
  colorCode: string
  createdAt: string
  createdBy: number
  description: string
  id: number
  isActive: boolean
  name: string
  updatedAt: string
  usageCount: number
}

export interface ApiRequestCreateActivity {
  name: string
  organizer?: string
  startedAt: Dayjs | string
  endedAt: Dayjs | string
  description?: string
  location?: string
  visibility: number
}

export interface ApiRequestActivity {
  name: string
  organizer?: string
  startedAt: Dayjs | string
  endedAt: Dayjs | string
  description?: string
  location?: string
  visibility: number
  activityTime?: string
  tagIds?: number[]
}
