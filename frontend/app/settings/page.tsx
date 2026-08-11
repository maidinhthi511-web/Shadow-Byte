"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const TEAM_MEMBERS = [
  { id: 1, name: "Minh Phương", email: "admin@sladex.io", role: "Quản trị (Admin)", status: "Active" },
  { id: 2, name: "Nguyễn Văn A", email: "legal@sladex.io", role: "Pháp chế (Legal)", status: "Active" },
  { id: 3, name: "Trần Thị B", email: "ops@sladex.io", role: "Vận hành (Operations)", status: "Active" },
  { id: 4, name: "Lê Văn C", email: "pm@sladex.io", role: "Quản lý dự án (PM)", status: "Pending" },
]

export default function SettingsPage() {
  const router = useRouter()
  const [username, setUsername] = useState("Administrator")
  // Đã thêm tab integrations
  const [activeTab, setActiveTab] = useState<"profile" | "team" | "staking" | "integrations">("integrations") 
  const [stakeAmount, setStakeAmount] = useState("")

  useEffect(() => {
    const loggedUser = localStorage.getItem("sla_logged_user")
    if (loggedUser) {
      setUsername(loggedUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("sla_logged_user")
    router.push("/")
  }

  const handleInvite = () => alert("Đã gửi email mời thành viên mới tham gia không gian làm việc!")
  const handleStake = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stakeAmount) return
    alert(`Đang khởi tạo Smart Contract...\nĐã khóa thành công ${stakeAmount} SLAD vào Quỹ bảo chứng. Huy hiệu "Nhà Cung Cấp Uy Tín" của bạn đã được kích hoạt!`)
    setStakeAmount("")
  }

  const handleConnectAPI = (tool: string) => {
    alert(`Đã kết nối thành công Webhook/API với hệ thống ${tool}!`)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* SIDEBAR MENU */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-5 border-b border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-sm">SD</div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm">SLA-DEX</h1>
              <p className="text-[11px] text-slate-500 truncate w-32">{username}</p>
            </div>
          </div>
          <nav className="p-3 space-y-1">
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Dashboard</Link>
            <Link href="/marketplace" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Marketplace SLA</Link>
            <Link href="/create-sla" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Khởi Tạo Hợp Đồng</Link>
            <Link href="/pricing" className="flex items-center justify-between px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">
              Gói Dịch Vụ <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">PRO</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-100 text-slate-900 font-medium text-sm transition-colors">Cài Đặt Tài Khoản</Link>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors text-sm">Đăng xuất</button>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Cài Đặt Tổ Chức</h2>
            <p className="text-slate-500 text-sm mt-1">Quản lý định danh quản trị viên, thông tin phòng ban và bảo mật chuỗi.</p>
          </div>

          <div className="flex space-x-6 border-b border-slate-200">
            <button onClick={() => setActiveTab("profile")} className={`pb-3 text-sm font-medium transition-all ${activeTab === "profile" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>Hồ Sơ Doanh Nghiệp</button>
            <button onClick={() => setActiveTab("team")} className={`pb-3 text-sm font-medium transition-all ${activeTab === "team" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>Phân Quyền & Thành Viên</button>
            <button onClick={() => setActiveTab("staking")} className={`pb-3 text-sm font-medium transition-all ${activeTab === "staking" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>Ký Quỹ & Uy Tín</button>
            <button onClick={() => setActiveTab("integrations")} className={`pb-3 text-sm font-medium transition-all ${activeTab === "integrations" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>Tích Hợp API</button>
          </div>

          {/* CÁC TAB CŨ (Profile, Team, Staking) GIỮ NGUYÊN */}
          {activeTab === "profile" && (<div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm"><h3 className="text-lg font-bold text-slate-900 mb-3">Thông Tin Định Danh</h3><p className="text-sm text-slate-500">Demo form...</p></div>)}
          {activeTab === "team" && (<div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm"><h3 className="text-lg font-bold text-slate-900 mb-3">Quản lý Thành viên</h3><p className="text-sm text-slate-500">Demo form...</p></div>)}
          {activeTab === "staking" && (<div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm"><h3 className="text-lg font-bold text-slate-900 mb-3">Ký Quỹ SLA</h3><p className="text-sm text-slate-500">Demo form...</p></div>)}

          {/* TAB 4: TÍCH HỢP (MỚI) */}
          {activeTab === "integrations" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md text-sm text-blue-800">
                Kết nối các hệ thống nội bộ của doanh nghiệp để Oracle có thể tự động thu thập dữ liệu KPI thực tế (Monitoring, Ticketing, CRM).
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Datadog */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-bold text-slate-900">Datadog (Monitoring)</div>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Đã kết nối</span>
                  </div>
                  <input type="password" value="************************" readOnly className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-xs mb-3" />
                  <button className="w-full mt-auto h-8 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 text-xs">Cấu hình lại</button>
                </div>

                {/* Slack */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-bold text-slate-900">Slack (Alerts)</div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">Chưa kết nối</span>
                  </div>
                  <input type="text" placeholder="Nhập Webhook URL..." className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs mb-3 focus:ring-1 focus:ring-blue-600" />
                  <button onClick={() => handleConnectAPI('Slack')} className="w-full mt-auto h-8 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-xs">Kết nối Webhook</button>
                </div>

                {/* Jira */}
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-bold text-slate-900">Jira Software (Ticketing)</div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">Chưa kết nối</span>
                  </div>
                  <input type="text" placeholder="Nhập Personal Access Token..." className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs mb-3 focus:ring-1 focus:ring-blue-600" />
                  <button onClick={() => handleConnectAPI('Jira')} className="w-full mt-auto h-8 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-xs">Xác thực Token</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}