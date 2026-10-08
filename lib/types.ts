export type EnquiryStatus = "pending" | "contacted" | "completed"

export type EnquiryRecord = {
  id: number
  fullName: string
  companyName: string
  email: string
  phone: string
  requirementType: string
  industry: string
  rolesRequired: string
  employeesNeeded: number
  message: string
  status: EnquiryStatus
  adminNotes: string | null
  createdAt: string
  updatedAt: string
}

export type UserType = "recruiter" | "recruitee"

export type RegisteredUserRecord = {
  id: number | string
  userType?: UserType
  fullName: string
  email: string
  phone: string
  recruitingType?: string | null
  description?: string | null
  resumeUrl?: string | null
  resumeName?: string | null
  interestedRole?: string | null
  companyName?: string | null
  createdAt: string
}

