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

export type RegisteredUserRecord = {
  id: number
  fullName: string
  email: string
  phone: string
  interestedRole: string
  companyName: string | null
  createdAt: string
}

