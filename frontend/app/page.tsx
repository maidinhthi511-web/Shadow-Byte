"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authView, setAuthView] = useState<"login" | "register">("login")
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [contracts, setContracts] = useState<any[]>([])
  
  // State quản lý Modal popup chi tiết hợp đồng
  const [selectedContract, setSelectedContract] = useState<any>(null)

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
        { id: "SLA-1024", client: "VNG Corporation", service: "IT Infrastructure", kpi: "Uptime 99.9%", responseTime: "150ms", penalty: "2 INJ / giờ", status: "Active" },
        { id: "SLA-1025", client: "FPT Software", service: "Cloud Hosting", kpi: "Uptime 99.95%", responseTime: "200ms", penalty: "5 INJ / giờ", status: "Warning" }
      ]
      localStorage.setItem("sla_contracts", JSON.stringify(mockData))
      setContracts(mockData)
    }
  }, [])

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !username) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!")
      return
    }
    const users = JSON.parse(localStorage.getItem("sla_users") || "[]")
    if (users.some((u: any) => u.email === email)) {
      alert("Email này đã được đăng ký!")
      return
    }
    users.push({ email, password, username })
    localStorage.setItem("sla_users", JSON.stringify(users))
    alert("Đăng ký thành công! Hãy chuyển sang đăng nhập.")
    setAuthView("login")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ Email và Mật khẩu!")
      return
    }
    const users = JSON.parse(localStorage.getItem("sla_users") || "[]")
    const validUser = users.find((u: any) => u.email === email && u.password === password)

    if (validUser || (email === "admin@sladex.io" && password === "123456")) {
      const name = validUser ? validUser.username : "Administrator"
      localStorage.setItem("sla_logged_user", name)
      setUsername(name)
      setIsLoggedIn(true)
    } else {
      alert("Sai thông tin đăng nhập hoặc tài khoản không tồn tại!")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("sla_logged_user")
    setIsLoggedIn(false)
  }

  // MÀN HÌNH ĐĂNG NHẬP / ĐĂNG KÝ
  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="w-[440px] bg-white p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-md text-white font-bold text-xl">
            SD
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-1">SLA-DEX System</h2>
          <p className="text-slate-500 mb-6 text-center text-sm">Cổng quản trị Smart Contract bảo mật</p>

          <div className="flex w-full bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              type="button"
              onClick={() => setAuthView("login")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authView === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Đăng Nhập
            </button>
            <button 
              type="button"
              onClick={() => setAuthView("register")}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authView === "register" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Đăng Ký
            </button>
          </div>

          {authView === "login" ? (
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  placeholder="admin@sladex.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mật khẩu <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.4)] transition-all active:scale-95"
              >
                Xác Thực & Đăng Nhập
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="w-full space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Họ tên <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nguyễn Văn A"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mật khẩu <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-[0_10px_25px_-5px_rgba(15,23,42,0.4)] transition-all active:scale-95"
              >
                Đăng Ký Tài Khoản
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex relative">
      
      {/* MODAL HIỂN THỊ THÔNG TIN CHI TIẾT TỪNG HỢP ĐỒNG */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedContract.id}</h3>
                <p className="text-xs text-slate-400">Mã hóa trên Injective Blockchain</p>
              </div>
              <Badge variant={selectedContract.status === "Active" ? "default" : "destructive"}>{selectedContract.status}</Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Bên thuê (Client):</span>
                <span className="font-bold text-slate-800">{selectedContract.client}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Dịch vụ cam kết:</span>
                <span className="font-bold text-slate-800">{selectedContract.service}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Uptime mục tiêu:</span>
                <span className="font-bold text-slate-800">{selectedContract.kpi}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Thời gian phản hồi:</span>
                <span className="font-bold text-slate-800">{selectedContract.responseTime || "200ms"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400 font-medium">Cơ chế đền bù tự động:</span>
                <span className="font-bold text-red-600">{selectedContract.penalty || "5 INJ / giờ"}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedContract(null)}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
            >
              Đóng Chi Tiết
            </button>
          </div>
        </div>
      )}

      {/* SIDEBAR GÓC TRÁI */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              SD
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 leading-tight">SLA-DEX</h1>
              <p className="text-xs text-slate-400">Xin chào, {username}</p>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-sm transition-all">
              Dashboard
            </a>
            <Link href="/create-sla" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 font-medium transition-all">
              Khởi Tạo Hợp Đồng
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 font-medium transition-all">
              Cài Đặt Tài Khoản
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium transition-all text-sm"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* DASHBOARD CHÍNH */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] border border-slate-100">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Dashboard Quản Trị</h2>
            <p className="text-slate-500 text-sm">Bấm vào bất kỳ hợp đồng nào bên dưới để xem chi tiết thông số On-Chain.</p>
          </div>
          <Link href="/create-sla">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-5 rounded-xl shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)]">
              + Khởi Tạo Hợp Đồng
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border-0 rounded-2xl bg-white border-l-4 border-l-slate-900">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400 font-bold uppercase tracking-wider">Tổng Hợp Đồng</CardTitle></CardHeader>
            <CardContent className="text-4xl font-black text-slate-900">{contracts.length}</CardContent>
          </Card>
          <Card className="shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border-0 rounded-2xl bg-white border-l-4 border-l-emerald-500">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400 font-bold uppercase tracking-wider">Tỷ Lệ Đạt KPI</CardTitle></CardHeader>
            <CardContent className="text-4xl font-black text-emerald-600">98.5%</CardContent>
          </Card>
          <Card className="shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border-0 rounded-2xl bg-white border-l-4 border-l-rose-500">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400 font-bold uppercase tracking-wider">Cảnh Báo (24h)</CardTitle></CardHeader>
            <CardContent className="text-4xl font-black text-rose-600">1</CardContent>
          </Card>
        </div>

        <Card className="shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] border-0 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-white border-b border-slate-100 p-6">
            <CardTitle className="text-xl font-bold text-slate-900">Nhật Ký Thực Thi SLA Trực Tuyến</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/70">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">Mã HĐ</TableHead>
                  <TableHead className="font-bold text-slate-700">Khách Hàng</TableHead>
                  <TableHead className="font-bold text-slate-700">Dịch Vụ</TableHead>
                  <TableHead className="font-bold text-slate-700">Cam Kết KPI</TableHead>
                  <TableHead className="font-bold text-slate-700 text-right">Trạng Thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((c, i) => (
                  <TableRow key={i} className="cursor-pointer hover:bg-slate-50/80 transition-colors" onClick={() => setSelectedContract(c)}>
                    <TableCell className="font-bold text-slate-900">{c.id}</TableCell>
                    <TableCell className="font-semibold text-slate-700">{c.client}</TableCell>
                    <TableCell className="text-slate-600">{c.service}</TableCell>
                    <TableCell className="text-slate-500">{c.kpi}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={c.status === "Active" ? "default" : (c.status === "Warning" ? "secondary" : "destructive")}>{c.status}</Badge>
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