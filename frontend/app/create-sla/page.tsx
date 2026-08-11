"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [contracts, setContracts] = useState<any[]>([])
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [modalTab, setModalTab] = useState<"details" | "oracle" | "logs">("details")

  // State cho dropdown thông báo
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const loggedUser = localStorage.getItem("sla_logged_user")
    if (loggedUser) {
      setIsLoggedIn(true)
      setUsername(loggedUser)
    }

    const saved = localStorage.getItem("sla_contracts")
    if (saved) {
      setContracts(JSON.parse(saved))
    } else {
      const mockData = [
        { id: "SLA-1029", client: "Vietcombank", provider: "FPT Software", reputation: "98/100", service: "Cloud Hosting & Storage", kpi: "Uptime 99.9%", responseTime: "150ms", penalty: "2 INJ / giờ", status: "Active" },
        { id: "SLA-1028", client: "Techcombank", provider: "Viettel IDC", reputation: "95/100", service: "Cybersecurity Monitoring", kpi: "Uptime 99.95%", responseTime: "200ms", penalty: "5 INJ / giờ", status: "Active" },
        { id: "SLA-1027", client: "NAB Innovation Center", provider: "VNG Cloud", reputation: "99/100", service: "IT Infrastructure", kpi: "Uptime 99.99%", responseTime: "50ms", penalty: "10 INJ / giờ", status: "Warning" },
        { id: "SLA-1026", client: "CoverGo", provider: "Amazon Web Services", reputation: "100/100", service: "AWS EC2 & Serverless", kpi: "Uptime 99.99%", responseTime: "100ms", penalty: "Credit 10% bill", status: "Violated" }
      ]
      localStorage.setItem("sla_contracts", JSON.stringify(mockData))
      setContracts(mockData)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return alert("Vui lòng nhập đầy đủ!")
    const users = JSON.parse(localStorage.getItem("sla_users") || "[]")
    const validUser = users.find((u: any) => u.email === email && u.password === password)
    if (validUser || (email === "admin@sladex.io" && password === "123456")) {
      const name = validUser ? validUser.username : "Administrator"
      localStorage.setItem("sla_logged_user", name)
      setUsername(name)
      setIsLoggedIn(true)
    } else {
      alert("Sai thông tin đăng nhập!")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("sla_logged_user")
    setIsLoggedIn(false)
  }

  const openContractModal = (contract: any) => {
    setSelectedContract(contract)
    setModalTab("details")
  }

  const handleExportReport = () => {
    alert("Đang trích xuất dữ liệu từ Injective Chain...\nBáo cáo đối soát KPI định kỳ đã được tải xuống dưới định dạng PDF.")
  }

  const handleDispute = () => {
    alert(`Hệ thống đã tạo Phiếu xử lý (Ticket #DS-1092) cho hợp đồng ${selectedContract.id}.\nTạm ngưng lệnh phạt tự động trong 24h để kích hoạt cơ chế trọng tài đối soát dữ liệu.`)
  }

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        {/* Giữ nguyên form Login */}
        <div className="w-[400px] bg-white p-8 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center mb-4 shadow-sm text-white font-bold text-lg">SD</div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">SLA-DEX Enterprise</h2>
          <p className="text-slate-500 mb-6 text-center text-sm">Cổng quản trị hệ thống</p>
          <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tài khoản Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="admin@sladex.io" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu <span className="text-red-500">*</span></label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white" />
              </div>
              <button type="submit" className="w-full mt-2 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors text-sm">
                Xác thực đăng nhập
              </button>
            </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex relative">
      
      {/* MODAL CHI TIẾT */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedContract.id}</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Hash: 0x8a7b...4c9f (Injective Chain)</p>
              </div>
              <Badge variant={selectedContract.status === "Active" ? "default" : (selectedContract.status === "Warning" ? "secondary" : "destructive")} className="text-xs px-2.5 py-0.5 rounded-md">
                {selectedContract.status}
              </Badge>
            </div>
            
            <div className="flex space-x-6 border-b border-slate-200 mb-4">
              <button onClick={() => setModalTab("details")} className={`pb-2 text-sm font-medium transition-all ${modalTab === "details" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>1. Thông số Ký Kết</button>
              <button onClick={() => setModalTab("oracle")} className={`pb-2 text-sm font-medium transition-all ${modalTab === "oracle" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>2. Cấu hình Oracle</button>
              <button onClick={() => setModalTab("logs")} className={`pb-2 text-sm font-medium transition-all ${modalTab === "logs" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>3. Nhật ký Sự kiện</button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {modalTab === "details" && (
                <div className="space-y-3 text-sm bg-slate-50 p-5 rounded-md border border-slate-200">
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60"><span className="text-slate-600 font-medium">Bên thuê (Client):</span><span className="font-semibold text-slate-900">{selectedContract.client}</span></div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60"><span className="text-slate-600 font-medium">Nhà cung cấp (Provider):</span><span className="font-semibold text-blue-700">{selectedContract.provider || "Chưa xác định"}</span></div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60"><span className="text-slate-600 font-medium">Uptime mục tiêu:</span><span className="font-semibold text-slate-900">{selectedContract.kpi}</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-slate-600 font-medium">Đền bù vi phạm:</span><span className="font-semibold text-red-600">{selectedContract.penalty || "5 INJ / giờ"}</span></div>
                </div>
              )}
              {modalTab === "oracle" && (
                <div className="space-y-4">
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-xs font-medium border border-blue-100 leading-relaxed">
                    Hệ thống đang kết nối trực tiếp với Endpoint của {selectedContract.provider || "nhà cung cấp"} để Oracle quét dữ liệu KPI.
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nguồn Dữ Liệu (Data Source)</label>
                    <select className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white">
                      <option>Datadog API</option>
                      <option>AWS CloudWatch Metrics</option>
                      <option>Prometheus / Grafana</option>
                      <option>Tự định nghĩa (Custom Webhook)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Endpoint URL</label>
                    <input type="text" placeholder="https://api.datadoghq.com/api/v1/query" className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none font-mono text-xs bg-white" />
                  </div>
                  <button className="w-full h-9 bg-blue-600 text-white font-medium rounded-md text-sm hover:bg-blue-700 transition-colors shadow-sm mt-2">
                    Test Kết Nối & Kích Hoạt
                  </button>
                </div>
              )}
              {modalTab === "logs" && (
                <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pb-2 mt-2">
                  <div className="relative pl-5">
                    <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <p className="text-[11px] text-slate-400 font-bold mb-1 uppercase tracking-wider">Vừa xong • Oracle Execution</p>
                    <div className="bg-red-50 border border-red-100 p-4 rounded-md shadow-sm">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <div>
                          <p className="text-sm font-bold text-red-800">CẢNH BÁO VI PHẠM SLA</p>
                          <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                            Chỉ số {selectedContract.kpi.split(' ')[0]} thực tế rớt khỏi ngưỡng cam kết. Hợp đồng thông minh đã ghi nhận vi phạm và chuẩn bị tiến hành khấu trừ <b>{selectedContract.penalty}</b>.
                          </p>
                        </div>
                      </div>
                      <button onClick={handleDispute} className="mt-3 h-8 px-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-md transition-colors text-xs flex items-center gap-1.5 shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                        Tạo phiếu khiếu nại (Dispute)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button onClick={() => setSelectedContract(null)} className="h-9 px-4 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors text-sm">
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}

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
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-100 text-slate-900 font-medium text-sm transition-colors">Dashboard</Link>
            <Link href="/marketplace" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Marketplace SLA</Link>
            <Link href="/create-sla" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Khởi Tạo Hợp Đồng</Link>
            <Link href="/pricing" className="flex items-center justify-between px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">
              Gói Dịch Vụ
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">PRO</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Cài Đặt Tài Khoản</Link>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors text-sm">Đăng xuất</button>
        </div>
      </aside>

      {/* MAIN DASHBOARD */}
      <main className="flex-1 p-8 space-y-6 overflow-y-auto bg-slate-50/50">
        
        {/* === HEADER ĐƯỢC ĐỘ LẠI TẠI ĐÂY === */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Dashboard Quản Trị</h2>
            <p className="text-slate-500 text-sm mt-1">Giám sát vòng đời Smart Contract và đối soát dữ liệu Oracle.</p>
          </div>
          
          <div className="flex gap-4 items-center">
            
            {/* THÊM 1: Số dư SLAD Token */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-md">
              <span className="text-xs font-semibold text-blue-600">Balance:</span>
              <span className="text-sm font-bold text-blue-800">1,250 SLAD</span>
            </div>

            {/* THÊM 2: Chuông thông báo */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:bg-slate-200 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                {/* Dấu chấm đỏ cảnh báo */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
              </button>

              {/* Dropdown thông báo */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-slate-200 z-50">
                  <div className="p-3 border-b border-slate-100 font-bold text-sm text-slate-900">Thông báo (1 mới)</div>
                  <div className="p-3 bg-red-50/50 border-l-2 border-red-500 hover:bg-slate-50 cursor-pointer">
                    <p className="text-xs font-semibold text-red-700">SLA-1026: Vi phạm Uptime</p>
                    <p className="text-xs text-slate-500 mt-1">Dữ liệu Oracle báo cáo downtime vượt mức cam kết. Cần xử lý ngay.</p>
                  </div>
                  <div className="p-3 border-t border-slate-100 text-center text-xs text-blue-600 cursor-pointer hover:underline">
                    Xem tất cả
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-slate-300 mx-1"></div> {/* Dòng kẻ ngăn cách */}

            {/* Các nút bấm cũ */}
            <Button onClick={handleExportReport} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-4 h-9 rounded-md shadow-sm transition-colors text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Xuất Đối Soát
            </Button>
            <Link href="/create-sla">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 h-9 rounded-md shadow-sm transition-colors text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Khởi Tạo Hợp Đồng
              </Button>
            </Link>
          </div>
        </div>

        {/* Khối Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-slate-200 rounded-lg bg-white">
            <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tổng Hợp Đồng</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold text-slate-900">{contracts.length}</CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200 rounded-lg bg-white">
            <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tỷ Lệ Đạt KPI</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold text-emerald-600">98.5%</CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200 rounded-lg bg-white">
            <CardHeader className="pb-2"><CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Cảnh Báo (24h)</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold text-red-600">1</CardContent>
          </Card>
        </div>

        {/* Bảng Hợp Đồng */}
        <Card className="shadow-sm border-slate-200 rounded-lg overflow-hidden bg-white">
          <CardHeader className="bg-white border-b border-slate-200 p-5">
            <CardTitle className="text-lg font-bold text-slate-900">Nhật Ký Thực Thi SLA Trực Tuyến</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Mã HĐ</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Khách Hàng</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Nhà Cung Cấp</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">Uy Tín</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider">Dịch Vụ</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-xs uppercase tracking-wider text-right">Trạng Thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((c, i) => (
                  <TableRow key={i} className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => openContractModal(c)}>
                    <TableCell className="font-semibold text-slate-900 text-sm">{c.id}</TableCell>
                    <TableCell className="text-slate-700 text-sm">{c.client}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{c.provider || "Đang chờ ký"}</TableCell>
                    <TableCell className="text-center">
                      {c.reputation ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-medium text-[11px] rounded border border-emerald-200">{c.reputation}</span>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">{c.service}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={c.status === "Active" ? "default" : (c.status === "Warning" ? "secondary" : "destructive")} className="font-medium text-xs rounded-md">
                        {c.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}