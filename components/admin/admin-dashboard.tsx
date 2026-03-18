"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import {
  Activity,
  BadgeCheck,
  Briefcase,
  Building2,
  Download,
  Filter,
  LogOut,
  Mail,
  Phone,
  Search,
  Shield,
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
  const [users] = useState(initialUsers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null)
  const [detailStatus, setDetailStatus] = useState<EnquiryRecord["status"]>("pending")
  const [detailNotes, setDetailNotes] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const industries = useMemo(() => Array.from(new Set(initialEnquiries.map((item) => item.industry))).sort(), [initialEnquiries])

  const summary = useMemo(() => {
    const totalEnquiries = enquiries.length
    const totalCounselingRequests = enquiries.filter((item) => /counsel/i.test(item.requirementType)).length
    const totalRegisteredUsers = users.length
    const recentRequests = enquiries.filter((item) => Date.now() - new Date(item.createdAt).getTime() <= 1000 * 60 * 60 * 24 * 7).length
    const pendingRequests = enquiries.filter((item) => item.status === "pending").length
    const completedRequests = enquiries.filter((item) => item.status === "completed").length

    return { totalEnquiries, totalCounselingRequests, totalRegisteredUsers, recentRequests, pendingRequests, completedRequests }
  }, [enquiries, users])

  const recentActivity = useMemo(() => enquiries.slice(0, 5), [enquiries])

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

  const exportCsv = () => {
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
            <button className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-3 text-left text-foreground transition">
              <Activity className="h-4 w-4" />
              Dashboard
            </button>
          </nav>

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
              <p className="mt-2 text-sm text-muted-foreground">Monitor live enquiries, review registrations, and keep every request moving through your process.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground"><Filter className="h-4 w-4 text-primary" /><span>{summary.pendingRequests} pending items need attention</span></div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                { label: "Total Enquiries", value: summary.totalEnquiries, icon: Briefcase },
                { label: "Total Counseling Requests", value: summary.totalCounselingRequests, icon: BadgeCheck },
                { label: "Total Registered Users", value: summary.totalRegisteredUsers, icon: Users },
                { label: "Recent Requests", value: summary.recentRequests, icon: Activity },
                { label: "Pending Requests", value: summary.pendingRequests, icon: Shield },
                { label: "Completed Requests", value: summary.completedRequests, icon: BadgeCheck },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-border/50 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-3 text-primary"><item.icon className="h-5 w-5" /></div>
                    <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{isPending ? "Syncing" : "Live"}</span>
                  </div>
                  <div className="text-3xl font-bold text-foreground">{item.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
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
                    <Button variant="outline" className="border-border/50" onClick={exportCsv}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
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
                    <div className="flex items-center gap-3"><UserRound className="h-4 w-4 text-primary" /> Registered Users: {users.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

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
    </div>
  )
}

