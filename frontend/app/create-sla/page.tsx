"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const SLA_TEMPLATES = [
  { id: "tpl-cloud", title: "Cloud Hosting Standard", service: "Cloud Hosting & Storage", uptime: "99.9%", responseTime: "200ms", penalty: "5 INJ / giờ vi phạm", icon: "☁️" },
  { id: "tpl-api", title: "API Gateway Premium", service: "API Gateway", uptime: "99.99%", responseTime: "100ms", penalty: "10 INJ / giờ vi phạm", icon: "⚡" },
  { id: "tpl-cyber", title: "Cybersecurity SOC", service: "Cybersecurity Monitoring", uptime: "99.95%", responseTime: "50ms", penalty: "20 INJ / giờ vi phạm", icon: "🛡️" }
]

const PROVIDER_NAMES = [
  "Amazon Web Services", "FPT Software", "Viettel IDC", "VNG Cloud", 
  "Google Cloud", "Microsoft Azure", "VNPT Cloud", "CMC Telecom", 
  "BizFly Cloud", "Tiki Logistics Ops", "HPT Vietnam", "Base.vn", 
  "VSEC", "Sao Bac Dau", "MISA", "Mat Bao", "KDATA", "MobiFone Global"
]

export default function CreateSlaPage() {
  const router = useRouter()
  const [username, setUsername] = useState("Administrator")
  
  const [client, setClient] = useState("")
  const [provider, setProvider] = useState("")
  const [service, setService] = useState("")
  const [uptime, setUptime] = useState("")
  const [responseTime, setResponseTime] = useState("")
  const [penalty, setPenalty] = useState("")
  
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null)
  const [toast, setToast] = useState({ show: false, message: "" })

  const [isSigning, setIsSigning] = useState(false)
  const [signStep, setSignStep] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)

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

  const handleSelectTemplate = (tpl: any) => {
    setActiveTemplate(tpl.id)
    setService(tpl.service)
    setUptime(tpl.uptime)
    setResponseTime(tpl.responseTime)
    setPenalty(tpl.penalty)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!client.trim() || !service || !provider) {
      setToast({ show: true, message: "Vui lòng nhập tên Khách hàng, chọn Nhà cung cấp và Dịch vụ!" })
      setTimeout(() => setToast({ show: false, message: "" }), 3000)
      return
    }
    
    setIsSigning(true)
    setSignStep(1)

    setTimeout(() => {
      setSignStep(2)
    }, 1500)

    setTimeout(async () => {
      setSignStep(3)
      
      try {
        // GỌI API BACKEND THẬT Ở ĐÂY NÈ M!
        const res = await fetch('http://localhost:3000/api/contracts/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client,
            provider,
            service,
            uptime,
            responseTime,
            penalty
          })
        });

        if (res.ok) {
          setTimeout(() => {
            router.push("/")
          }, 1000)
        } else {
          setToast({ show: true, message: "Lỗi kết nối Backend! Server báo lỗi." })
          setIsSigning(false)
        }
      } catch (error) {
        setToast({ show: true, message: "Không thể gọi API! Nhớ bật Backend (NestJS) lên nha m." })
        setIsSigning(false)
      }

    }, 3500)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex relative">
      
      {/* POPUP CHỮ KÝ SỐ CA */}
      {isSigning && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex flex-col items-center text-center">
              {signStep === 1 && (
                <>
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Đang chờ thiết bị USB Token...</h3>
                  <p className="text-sm text-slate-500">Vui lòng cắm USB Token để xác thực chữ ký số theo Nghị định 130/2018/NĐ-CP.</p>
                </>
              )}
              {signStep === 2 && (
                <>
                  <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Đang đồng bộ với Backend...</h3>
                  <p className="text-sm text-slate-500">Lưu dữ liệu Hợp đồng vào Database và chuẩn bị Hash.</p>
                </>
              )}
              {signStep === 3 && (
                <>
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-emerald-700 mb-1">Ký Hợp Đồng Thành Công!</h3>
                  <p className="text-sm text-slate-500">Đang chuyển hướng về Dashboard...</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST THÔNG BÁO LỖI */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-md shadow-lg flex items-center gap-3 text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {toast.message}
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
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Dashboard</Link>
            <Link href="/marketplace" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Marketplace SLA</Link>
            <Link href="/create-sla" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-100 text-slate-900 font-medium text-sm transition-colors">Khởi Tạo Hợp Đồng</Link>
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
        
        {/* HEADER ĐÃ ĐƯỢC ĐỒNG BỘ VỚI TRANG DASHBOARD */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Khởi Tạo Hợp Đồng SLA</h2>
            <p className="text-slate-500 text-sm mt-1">Sử dụng mẫu có sẵn hoặc tùy chỉnh tham số hợp đồng thông minh.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-md">
              <span className="text-xs font-semibold text-blue-600">Balance:</span>
              <span className="text-sm font-bold text-blue-800">1,250 SLAD</span>
            </div>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-slate-500 hover:bg-slate-200 rounded-md transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-800 mb-3">1. Mẫu Dịch Vụ Phổ Biến</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SLA_TEMPLATES.map((tpl) => (
                  <div 
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`cursor-pointer rounded-md p-4 border transition-all ${
                      activeTemplate === tpl.id 
                        ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{tpl.icon}</div>
                    <h3 className="font-bold text-slate-900 text-sm">{tpl.title}</h3>
                    <div className="mt-2 space-y-1 text-xs text-slate-500 font-medium">
                      <p>• {tpl.uptime}</p>
                      <p>• Phản hồi: {tpl.responseTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-5 border-t border-slate-100 pt-6">
              <label className="block text-sm font-bold text-slate-800 mb-1">2. Chi Tiết Thông Số Ký Kết</label>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tên Khách Hàng (Client)</label>
                  <input
                    type="text"
                    placeholder="VD: VNG Corporation"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nhà Cung Cấp (Provider)</label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white"
                  >
                    <option value="">-- Lựa chọn đối tác --</option>
                    {PROVIDER_NAMES.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Loại Dịch Vụ</label>
                <input
                  type="text"
                  placeholder="Chọn từ mẫu hoặc nhập tay..."
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Uptime Tối Thiểu</label>
                  <input
                    type="text"
                    value={uptime}
                    onChange={(e) => setUptime(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phản Hồi Tối Đa</label>
                  <input
                    type="text"
                    value={responseTime}
                    onChange={(e) => setResponseTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Cơ Chế Đền Bù (Auto-Execution Penalty)</label>
                <input
                  type="text"
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white text-red-600 font-medium"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSigning}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  Ký Chữ Ký Số & Triển Khai Smart Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}