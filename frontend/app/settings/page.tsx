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
  const [activeTab, setActiveTab] = useState<"profile" | "team" | "staking" | "integrations">("profile") 
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
      {/* SIDEBAR */}
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

      {/* MAIN CONTENT */}
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

          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Thông Tin Định Danh</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Họ và Tên / Đại diện</label>
                  <input type="text" defaultValue={username} className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm bg-slate-50" readOnly />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Công Ty</label>
                  <input type="text" defaultValue="admin@sladex.io" className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm bg-slate-50" readOnly />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Địa Chỉ Ví Injective (Web3 Public Key)</label>
                  <input type="text" defaultValue="inj1234567890abcdef...xyz789" className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm font-mono text-slate-500 bg-slate-50" readOnly />
                </div>
              </div>
              <div className="pt-2">
                <button className="h-9 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 shadow-sm transition-colors text-sm">Lưu Thay Đổi</button>
              </div>
            </div>
          )}

          {/* TAB 2: TEAM */}
          {activeTab === "team" && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Quản lý Thành viên</h3>
                  <p className="text-xs text-slate-500 mt-1">Phân quyền thao tác hệ thống theo phòng ban chuyên trách.</p>
                </div>
                <button onClick={handleInvite} className="h-9 px-4 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors text-sm flex items-center gap-2">
                  Mời Thành Viên
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Thành viên</th>
                      <th className="py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider">Vai trò (Role)</th>
                      <th className="py-3 px-6 text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {TEAM_MEMBERS.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-6">
                          <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.email}</p>
                        </td>
                        <td className="py-3 px-6">
                          <select className="bg-transparent text-sm font-medium text-slate-700 border-none focus:ring-0 cursor-pointer p-0" defaultValue={member.role}>
                            <option>Quản trị (Admin)</option>
                            <option>Pháp chế (Legal)</option>
                            <option>Vận hành (Operations)</option>
                            <option>Quản lý dự án (PM)</option>
                          </select>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${member.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: STAKING */}
          {activeTab === "staking" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Tổng tài sản Ký Quỹ</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">10,000 <span className="text-sm font-medium text-slate-500">SLAD</span></p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Hạng Uy Tín Hiện Tại</p>
                    <p className="text-xl font-bold text-emerald-600 mt-1">Nhà Cung Cấp Uy Tín</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Gia tăng uy tín bằng cách Ký Quỹ</h3>
                <p className="text-sm text-slate-500 mb-6">Khóa token SLAD để ưu tiên hiển thị trên Marketplace SLA và nhận chiết khấu phí.</p>
                <form onSubmit={handleStake} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Số lượng Token muốn khóa (SLAD)</label>
                    <input type="number" placeholder="Nhập số lượng..." value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white" />
                  </div>
                  <button type="submit" className="h-9 px-6 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 shadow-sm transition-colors text-sm">
                    Xác nhận Ký Quỹ (Stake)
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: INTEGRATIONS */}
          {activeTab === "integrations" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md text-sm text-blue-800">
                Kết nối các hệ thống nội bộ để Oracle thu thập dữ liệu KPI thực tế.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-bold text-slate-900">Datadog (Monitoring)</div>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">Đã kết nối</span>
                  </div>
                  <input type="password" value="************************" readOnly className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-xs mb-3" />
                  <button className="w-full mt-auto h-8 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 text-xs">Cấu hình lại</button>
                </div>
                <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-bold text-slate-900">Slack (Alerts)</div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">Chưa kết nối</span>
                  </div>
                  <input type="text" placeholder="Nhập Webhook URL..." className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs mb-3" />
                  <button onClick={() => handleConnectAPI('Slack')} className="w-full mt-auto h-8 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-xs">Kết nối Webhook</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
