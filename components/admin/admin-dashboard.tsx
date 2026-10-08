"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import {
  Activity,
  BadgeCheck,
  Briefcase,
  Building2,
  Download,
  FileText,
  Filter,
  LogOut,
  Mail,
  Phone,
  Search,
  Shield,
  UserCheck,
  UserRound,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { EnquiryRecord, RegisteredUserRecord } from "@/lib/types"

type DashboardProps = {
  initialEnquiries: EnquiryRecord[]
  initialUsers: RegisteredUserRecord[]
}

function getStatusBadge(status: EnquiryRecord["status"]) {
  if (status === "completed") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/20"
  if (status === "contacted") return "bg-sky-500/15 text-sky-300 border-sky-500/20"
  return "bg-amber-500/15 text-amber-300 border-amber-500/20"
}

export function AdminDashboard({ initialEnquiries, initialUsers }: DashboardProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [users, setUsers] = useState(initialUsers)
  const [activeTab, setActiveTab] = useState<"enquiries" | "users">("enquiries")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [userTypeFilter, setUserTypeFilter] = useState<"all" | "recruiter" | "recruitee">("all")
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null)
  const [selectedUser, setSelectedUser] = useState<RegisteredUserRecord | null>(null)
  const [detailStatus, setDetailStatus] = useState<EnquiryRecord["status"]>("pending")
  const [detailNotes, setDetailNotes] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const industries = useMemo(() => Array.from(new Set(initialEnquiries.map((item) => item.industry))).sort(), [initialEnquiries])

  const summary = useMemo(() => {
    const totalEnquiries = enquiries.length
    const totalCounselingRequests = enquiries.filter((item) => /counsel/i.test(item.requirementType)).length
    const totalRegisteredUsers = users.length
    const totalRecruiters = users.filter((u) => (u.userType || "recruiter") === "recruiter").length
    const totalCandidates = users.filter((u) => u.userType === "recruitee").length
    const recentRequests = enquiries.filter((item) => Date.now() - new Date(item.createdAt).getTime() <= 1000 * 60 * 60 * 24 * 7).length
    const pendingRequests = enquiries.filter((item) => item.status === "pending").length
    const completedRequests = enquiries.filter((item) => item.status === "completed").length

    return { totalEnquiries, totalCounselingRequests, totalRegisteredUsers, totalRecruiters, totalCandidates, recentRequests, pendingRequests, completedRequests }
  }, [enquiries, users])

  const recentActivity = useMemo(() => enquiries.slice(0, 5), [enquiries])

  // Filtered users based on search & userTypeFilter
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const actualType = u.userType || "recruiter"
      if (userTypeFilter !== "all" && actualType !== userTypeFilter) {
        return false
      }
      if (!search.trim()) return true
      const query = search.toLowerCase().trim()
      return (
        u.fullName.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.phone.toLowerCase().includes(query) ||
        (u.companyName && u.companyName.toLowerCase().includes(query)) ||
        (u.recruitingType && u.recruitingType.toLowerCase().includes(query)) ||
        (u.interestedRole && u.interestedRole.toLowerCase().includes(query)) ||
        (u.description && u.description.toLowerCase().includes(query))
      )
    })
  }, [users, search, userTypeFilter])

  // Initial and Filter-triggered fetch for enquiries
  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(() => {
      startTransition(async () => {
        const params = new URLSearchParams()
        if (search.trim()) params.set("search", search.trim())
        if (statusFilter !== "all") params.set("status", statusFilter)
        if (industryFilter !== "all") params.set("industry", industryFilter)

        try {
          setErrorMessage("")
          const response = await fetch(`/api/admin/enquiries?${params.toString()}`, { signal: controller.signal })
          const result = await response.json()
          if (!response.ok) throw new Error(result.message || "Unable to load enquiries.")
          setEnquiries(result.enquiries)
        } catch (error) {
          if ((error as Error).name !== "AbortError") {
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong.")
          }
        }
      })
    }, 250)

    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [industryFilter, search, statusFilter])

  // Real-time background sync interval (every 5 seconds) for live dynamic updates
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const params = new URLSearchParams()
        if (search.trim()) params.set("search", search.trim())
        if (statusFilter !== "all") params.set("status", statusFilter)
        if (industryFilter !== "all") params.set("industry", industryFilter)

        const [enqRes, usersRes] = await Promise.all([
          fetch(`/api/admin/enquiries?${params.toString()}`),
          fetch(`/api/admin/users`),
        ])

        if (enqRes.ok) {
          const enqData = await enqRes.json()
          if (enqData.success && Array.isArray(enqData.enquiries)) {
            setEnquiries(enqData.enquiries)
          }
        }

        if (usersRes.ok) {
          const usersData = await usersRes.json()
          if (usersData.success && Array.isArray(usersData.users)) {
            setUsers(usersData.users)
          }
        }
      } catch (error) {
        console.error("Real-time sync check encountered an issue:", error)
      }
    }

    const intervalId = setInterval(fetchLatestData, 5000)
    return () => clearInterval(intervalId)
  }, [industryFilter, search, statusFilter])

  const openDetail = (enquiry: EnquiryRecord) => {
    setSelectedEnquiry(enquiry)
    setDetailStatus(enquiry.status)
    setDetailNotes(enquiry.adminNotes ?? "")
  }

  const updateEnquiry = async (id: number, payload: { status?: EnquiryRecord["status"]; adminNotes?: string }) => {
    const response = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || "Unable to update enquiry.")
    setEnquiries((current) => current.map((item) => (item.id === id ? result.enquiry : item)))
    if (selectedEnquiry?.id === id) setSelectedEnquiry(result.enquiry)
  }

  const deleteEnquiry = async (id: number) => {
    if (!window.confirm("Delete this enquiry permanently?")) return
    const response = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" })
    const result = await response.json()
    if (!response.ok) throw new Error(result.message || "Unable to delete enquiry.")
    setEnquiries((current) => current.filter((item) => item.id !== id))
    if (selectedEnquiry?.id === id) setSelectedEnquiry(null)
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin"
  }

  const exportEnquiriesCsv = () => {
    const header = ["ID", "Name", "Company Name", "Email", "Phone", "Requirement Type", "Industry", "Roles Required", "Employees Needed", "Message", "Status", "Date Submitted"]
    const rows = enquiries.map((item) => [item.id, item.fullName, item.companyName, item.email, item.phone, item.requirementType, item.industry, item.rolesRequired, item.employeesNeeded, item.message.replace(/\n/g, " "), item.status, new Date(item.createdAt).toLocaleString()])
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "talenty-enquiries.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportUsersCsv = () => {
    const header = ["ID", "User Type", "Full Name", "Email", "Phone", "Recruiting Type / Target Role", "Company Name", "Description", "Has Resume", "Resume Name", "Registered At"]
    const rows = filteredUsers.map((u) => [
      u.id,
      u.userType || "recruiter",
      u.fullName,
      u.email,
      u.phone,
      u.recruitingType || u.interestedRole || "",
      u.companyName || "",
      (u.description || "").replace(/\n/g, " "),
      u.resumeUrl ? "Yes" : "No",
      u.resumeName || "",
      new Date(u.createdAt).toLocaleString()
    ])
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "talenty-registered-users.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[290px_1fr]">
        <aside className="border-r border-border/40 bg-white/70 p-6 backdrop-blur-xl">
          <div className="mb-10">
            <div className="inline-flex rounded-2xl bg-gradient-to-br from-primary to-accent p-3"><Shield className="h-6 w-6 text-primary-foreground" /></div>
            <h1 className="mt-4 text-2xl font-bold">Talenty Admin</h1>
            <p className="text-sm text-muted-foreground">Secure dashboard access.</p>
          </div>

          <nav className="space-y-2">
            <button
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activeTab === "enquiries"
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground font-semibold"
                  : "text-muted-foreground hover:bg-secondary/20"
              }`}
              onClick={() => setActiveTab("enquiries")}
            >
              <Activity className="h-4 w-4" />
              Enquiries & Leads ({enquiries.length})
            </button>
            <button
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-foreground font-semibold"
                  : "text-muted-foreground hover:bg-secondary/20"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4" />
              Registered Users ({users.length})
            </button>
          </nav>

          <div className="mt-8 pt-6 border-t border-border/40 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2">Talent Pool Breakdown</div>
            <div className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg bg-secondary/30">
              <span className="flex items-center gap-1.5 text-sky-400 font-medium">
                <Briefcase className="w-3.5 h-3.5" /> Recruiters
              </span>
              <span className="font-bold">{summary.totalRecruiters}</span>
            </div>
            <div className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg bg-secondary/30">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <UserCheck className="w-3.5 h-3.5" /> Candidates
              </span>
              <span className="font-bold">{summary.totalCandidates}</span>
            </div>
          </div>

          <Button asChild variant="outline" className="mt-6 w-full border-border/50">
            <a href="/">Back to Website</a>
          </Button>
          <Button variant="outline" className="mt-3 w-full border-border/50" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </aside>

        <main className="p-4 md:p-6 lg:p-8">
          <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-border/40 bg-white/5 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Admin Dashboard</p>
              <h2 className="mt-2 text-3xl font-bold">Counseling and Consulting Control Center</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Monitor live enquiries, review recruiter needs, candidate resumes, and track all requests in real time via database sync.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Filter className="h-4 w-4 text-primary" />
              <span>{summary.pendingRequests} pending items need attention</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                { label: "Total Enquiries", value: summary.totalEnquiries, icon: Briefcase },
                { label: "Total Counseling Requests", value: summary.totalCounselingRequests, icon: BadgeCheck },
                { label: "Total Registered Users", value: summary.totalRegisteredUsers, icon: Users },
                { label: "Active Recruiters", value: summary.totalRecruiters, icon: Briefcase },
                { label: "Candidate Profiles", value: summary.totalCandidates, icon: UserCheck },
                { label: "Pending Enquiries", value: summary.pendingRequests, icon: Shield },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-border/50 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-3 text-primary"><item.icon className="h-5 w-5" /></div>
                    <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Sync (5s)
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-foreground">{item.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
              {activeTab === "enquiries" ? (
                <div className="rounded-3xl border border-border/50 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Enquiry Details</h2>
                      <p className="text-sm text-muted-foreground">Search, filter, export, and manage counseling and consulting leads.</p>
                    </div>
                    <div className="flex flex-col gap-3 md:flex-row">
                      <div className="relative min-w-[220px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-10 bg-secondary/40 border-border/50" placeholder="Search by name or company" value={search} onChange={(event) => setSearch(event.target.value)} />
                      </div>
                      <select className="h-10 rounded-md border border-border/50 bg-secondary/40 px-3 text-sm text-foreground" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      <select className="h-10 rounded-md border border-border/50 bg-secondary/40 px-3 text-sm text-foreground" value={industryFilter} onChange={(event) => setIndustryFilter(event.target.value)}>
                        <option value="all">All Industries</option>
                        {industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}
                      </select>
                      <Button variant="outline" className="border-border/50" onClick={exportEnquiriesCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
                    </div>
                  </div>

                  {errorMessage ? <p className="mb-4 text-sm text-red-400">{errorMessage}</p> : null}

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/40 text-left text-muted-foreground">
                          {["ID", "Name", "Company", "Email", "Phone", "Requirement", "Industry", "Roles", "Employees", "Date Submitted", "Status", "Actions"].map((header) => <th key={header} className="px-3 py-3 font-medium">{header}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.map((item) => (
                          <tr key={item.id} className="border-b border-border/20 align-top text-foreground">
                            <td className="px-3 py-4">#{item.id}</td>
                            <td className="px-3 py-4">{item.fullName}</td>
                            <td className="px-3 py-4">{item.companyName}</td>
                            <td className="px-3 py-4">{item.email}</td>
                            <td className="px-3 py-4">{item.phone}</td>
                            <td className="px-3 py-4">{item.requirementType}</td>
                            <td className="px-3 py-4">{item.industry}</td>
                            <td className="px-3 py-4">{item.rolesRequired}</td>
                            <td className="px-3 py-4">{item.employeesNeeded}</td>
                            <td className="px-3 py-4 text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</td>
                            <td className="px-3 py-4"><Badge className={getStatusBadge(item.status)}>{item.status}</Badge></td>
                            <td className="px-3 py-4">
                              <div className="flex flex-wrap gap-2">
                                <Button size="sm" variant="outline" className="border-border/50" onClick={() => openDetail(item)}>View</Button>
                                <Button size="sm" variant="outline" className="border-border/50" onClick={() => updateEnquiry(item.id, { status: "pending" })}>Pending</Button>
                                <Button size="sm" variant="outline" className="border-border/50" onClick={() => updateEnquiry(item.id, { status: "contacted" })}>Contacted</Button>
                                <Button size="sm" variant="outline" className="border-border/50" onClick={() => updateEnquiry(item.id, { status: "completed" })}>Completed</Button>
                                <Button size="sm" variant="outline" className="border-red-500/40 text-red-300 hover:bg-red-500/10" onClick={() => deleteEnquiry(item.id)}>Delete</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {enquiries.length === 0 ? <div className="py-10 text-center text-sm text-muted-foreground">No enquiries match the current filters.</div> : null}
                </div>
              ) : (
                <div className="rounded-3xl border border-border/50 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Registered Users & Talent Pool</h2>
                      <p className="text-sm text-muted-foreground">Review recruiter hiring requirements and candidate job applications.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <select
                        className="h-10 rounded-md border border-border/50 bg-secondary/40 px-3 text-sm text-foreground"
                        value={userTypeFilter}
                        onChange={(e) => setUserTypeFilter(e.target.value as "all" | "recruiter" | "recruitee")}
                      >
                        <option value="all">All Registration Types ({users.length})</option>
                        <option value="recruiter">Recruiters Only ({summary.totalRecruiters})</option>
                        <option value="recruitee">Candidates Only ({summary.totalCandidates})</option>
                      </select>
                      <div className="relative min-w-[220px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-10 bg-secondary/40 border-border/50" placeholder="Search name, role, details..." value={search} onChange={(event) => setSearch(event.target.value)} />
                      </div>
                      <Button variant="outline" className="border-border/50" onClick={exportUsersCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/40 text-left text-muted-foreground">
                          {["ID", "Type", "Full Name", "Contact Details", "Recruiting Type / Role", "Description", "Resume", "Registered Date", "Action"].map((header) => <th key={header} className="px-3 py-3 font-medium">{header}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => {
                          const isRecruiter = (user.userType || "recruiter") === "recruiter"
                          return (
                            <tr key={user.id} className="border-b border-border/20 align-top text-foreground">
                              <td className="px-3 py-4 text-xs font-mono text-muted-foreground">#{user.id}</td>
                              <td className="px-3 py-4">
                                {isRecruiter ? (
                                  <Badge className="bg-sky-500/15 text-sky-400 border-sky-500/20 font-mono text-[11px] gap-1">
                                    <Briefcase className="w-3 h-3" /> Recruiter
                                  </Badge>
                                ) : (
                                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 font-mono text-[11px] gap-1">
                                    <UserCheck className="w-3 h-3" /> Candidate
                                  </Badge>
                                )}
                              </td>
                              <td className="px-3 py-4">
                                <div className="font-semibold">{user.fullName}</div>
                                {user.companyName && (
                                  <div className="text-xs text-muted-foreground">{user.companyName}</div>
                                )}
                              </td>
                              <td className="px-3 py-4 text-xs space-y-0.5">
                                <div><a href={`mailto:${user.email}`} className="text-primary hover:underline">{user.email}</a></div>
                                <div className="text-muted-foreground">{user.phone}</div>
                              </td>
                              <td className="px-3 py-4">
                                <span className="font-medium text-xs">
                                  {user.recruitingType || user.interestedRole || "N/A"}
                                </span>
                              </td>
                              <td className="px-3 py-4 max-w-[200px]">
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {user.description || "—"}
                                </p>
                              </td>
                              <td className="px-3 py-4">
                                {user.resumeUrl ? (
                                  <a
                                    href={user.resumeUrl}
                                    download={user.resumeName || `resume-${user.fullName.replace(/\s+/g, "_")}.pdf`}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/15 text-primary text-xs font-medium hover:bg-primary/25 transition-colors"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span className="max-w-[80px] truncate">{user.resumeName || "Resume"}</span>
                                  </a>
                                ) : (
                                  <span className="text-xs text-muted-foreground">—</span>
                                )}
                              </td>
                              <td className="px-3 py-4 text-xs text-muted-foreground whitespace-nowrap">
                                {new Date(user.createdAt).toLocaleString()}
                              </td>
                              <td className="px-3 py-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-border/50 text-xs"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  {filteredUsers.length === 0 ? <div className="py-10 text-center text-sm text-muted-foreground">No registered users found matching the filter.</div> : null}
                </div>
              )}

              <div className="space-y-6">
                <div className="rounded-3xl border border-border/50 bg-white/5 p-5 backdrop-blur-xl">
                  <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
                  <div className="mt-4 space-y-4">
                    {recentActivity.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-border/30 bg-secondary/20 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-medium">{item.fullName}</div>
                            <div className="text-sm text-muted-foreground">{item.companyName} · {item.requirementType}</div>
                          </div>
                          <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border/50 bg-white/5 p-5 backdrop-blur-xl">
                  <h3 className="text-xl font-bold text-foreground">Quick Settings</h3>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> Business Contact: 8431119696</div>
                    <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> Email: connect@talentyconsulting.in</div>
                    <div className="flex items-center gap-3"><Building2 className="h-4 w-4 text-primary" /> Office: Bhive Platinum, Church Street</div>
                    <div className="flex items-center gap-3"><UserRound className="h-4 w-4 text-primary" /> Total Registrations: {users.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Enquiry Detail Dialog */}
      <Dialog open={Boolean(selectedEnquiry)} onOpenChange={(open) => !open && setSelectedEnquiry(null)}>
        <DialogContent className="max-w-3xl border-border/40 bg-white text-foreground shadow-2xl">
          {selectedEnquiry ? (
            <>
              <DialogHeader>
                <DialogTitle>Enquiry #{selectedEnquiry.id}</DialogTitle>
                <DialogDescription className="text-muted-foreground">Review the full counseling or consulting submission and update its workflow status.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border/30 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Contact</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div><span className="text-muted-foreground">Name:</span> {selectedEnquiry.fullName}</div>
                    <div><span className="text-muted-foreground">Company:</span> {selectedEnquiry.companyName}</div>
                    <div><span className="text-muted-foreground">Email:</span> {selectedEnquiry.email}</div>
                    <div><span className="text-muted-foreground">Phone:</span> {selectedEnquiry.phone}</div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/30 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Requirement</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div><span className="text-muted-foreground">Type:</span> {selectedEnquiry.requirementType}</div>
                    <div><span className="text-muted-foreground">Industry:</span> {selectedEnquiry.industry}</div>
                    <div><span className="text-muted-foreground">Roles Required:</span> {selectedEnquiry.rolesRequired}</div>
                    <div><span className="text-muted-foreground">Employees Needed:</span> {selectedEnquiry.employeesNeeded}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/30 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Message / Counseling Details</p>
                <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{selectedEnquiry.message}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <select className="h-10 w-full rounded-md border border-border/50 bg-secondary/40 px-3 text-sm text-foreground" value={detailStatus} onChange={(event) => setDetailStatus(event.target.value as EnquiryRecord["status"])}>
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Admin Notes</label>
                  <textarea rows={4} className="w-full rounded-md border border-border/50 bg-secondary/40 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50" value={detailNotes} onChange={(event) => setDetailNotes(event.target.value)} placeholder="Internal notes, next call details, or assignment remarks." />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" className="border-border/50" onClick={() => setSelectedEnquiry(null)}>Close</Button>
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0" onClick={async () => {
                  if (!selectedEnquiry) return
                  await updateEnquiry(selectedEnquiry.id, { status: detailStatus, adminNotes: detailNotes })
                  setSelectedEnquiry(null)
                }}>Save Changes</Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* User Registration Detail Dialog */}
      <Dialog open={Boolean(selectedUser)} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="max-w-2xl border-border/40 bg-white text-foreground shadow-2xl">
          {selectedUser ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  {(selectedUser.userType || "recruiter") === "recruiter" ? (
                    <Badge className="bg-sky-500/15 text-sky-600 border-sky-500/20 font-mono text-xs">
                      Recruiter Registration
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/20 font-mono text-xs">
                      Candidate Registration
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground font-mono">#{selectedUser.id}</span>
                </div>
                <DialogTitle className="text-2xl">{selectedUser.fullName}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Registered on {new Date(selectedUser.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-2 mt-2">
                <div className="rounded-2xl border border-border/30 bg-secondary/15 p-4 space-y-2 text-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-semibold">Contact Information</p>
                  <div><span className="text-muted-foreground">Email:</span> <a href={`mailto:${selectedUser.email}`} className="text-primary underline ml-1">{selectedUser.email}</a></div>
                  <div><span className="text-muted-foreground">Phone:</span> <a href={`tel:${selectedUser.phone}`} className="text-foreground ml-1">{selectedUser.phone}</a></div>
                  {selectedUser.companyName && (
                    <div><span className="text-muted-foreground">Company:</span> <span className="font-medium ml-1">{selectedUser.companyName}</span></div>
                  )}
                </div>

                <div className="rounded-2xl border border-border/30 bg-secondary/15 p-4 space-y-2 text-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                    {(selectedUser.userType || "recruiter") === "recruiter" ? "Recruiting Need" : "Target Domain"}
                  </p>
                  <div className="font-semibold text-primary">
                    {selectedUser.recruitingType || selectedUser.interestedRole || "Not specified"}
                  </div>
                  {selectedUser.resumeUrl && (
                    <div className="pt-2">
                      <a
                        href={selectedUser.resumeUrl}
                        download={selectedUser.resumeName || `resume-${selectedUser.fullName.replace(/\s+/g, "_")}.pdf`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download Attached Resume ({selectedUser.resumeName || "Document"})
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-border/30 bg-secondary/15 p-4 mt-2">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-semibold mb-2">
                  {(selectedUser.userType || "recruiter") === "recruiter" ? "Hiring Requirements Description" : "Candidate Summary & Skills"}
                </p>
                <p className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                  {selectedUser.description || "No description provided."}
                </p>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" className="border-border/50" onClick={() => setSelectedUser(null)}>Close</Button>
                <Button asChild className="bg-primary text-primary-foreground">
                  <a href={`mailto:${selectedUser.email}?subject=Talenty%20Follow-up%20for%20${encodeURIComponent(selectedUser.fullName)}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email {selectedUser.fullName.split(" ")[0]}
                  </a>
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
