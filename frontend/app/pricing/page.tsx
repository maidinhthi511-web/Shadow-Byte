"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter()
  const [username, setUsername] = useState("Administrator")

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

  const handleUpgrade = (plan: string) => {
    alert(`Yêu cầu nâng cấp lên gói ${plan} đã được gửi đến bộ phận CSKH.\nChúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất!`)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* --- SIDEBAR MENU ENTERPRISE --- */}
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
            <Link href="/create-sla" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors">Khởi Tạo Hợp Đồng</Link>
            <Link href="/pricing" className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-100 text-slate-900 font-medium text-sm transition-colors">
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

      {/* --- NỘI DUNG CHÍNH: BẢNG GIÁ --- */}
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">Nâng cấp nền tảng quản trị SLA</h2>
            <p className="text-slate-500 text-sm">
              Lựa chọn gói dịch vụ phù hợp với quy mô doanh nghiệp. Chuẩn hóa quy trình, tự động hóa đối soát và tối ưu chi phí vận hành.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* GÓI 1: SLA BASIC */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col hover:border-blue-300 transition-colors">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">SLA Basic</h3>
                <p className="text-xs text-slate-500 mt-1 h-8">Phù hợp doanh nghiệp nhỏ, mục tiêu giảm rào cản và chuẩn hóa quy trình.</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-slate-900">Miễn phí</span>
                <span className="text-sm text-slate-500 font-medium"> / tháng đầu</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Tạo SLA theo template
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Ký kết điện tử
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Lưu dấu vân tay SLA (Blockchain)
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Dashboard quản trị cơ bản
                </li>
              </ul>
              <button onClick={() => handleUpgrade("Basic")} className="w-full h-10 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors text-sm">
                Bắt đầu dùng thử
              </button>
            </div>

            {/* GÓI 2: SLA ADVANCED */}
            <div className="bg-white rounded-xl border-2 border-blue-600 p-6 shadow-md relative flex flex-col transform md:-translate-y-2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Được khuyên dùng
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-blue-700">SLA Advanced</h3>
                <p className="text-xs text-slate-500 mt-1 h-8">Giảm tranh chấp và tối ưu hóa chi phí vận hành bằng tự động hóa.</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-slate-900">Trả phí</span>
                <span className="text-sm text-slate-500 font-medium"> / theo tháng, quý</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Bao gồm toàn bộ tính năng Basic
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Kết nối dữ liệu KPI phổ biến (ticketing, monitoring)
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Cảnh báo vi phạm Real-time
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Cơ chế xử lý vi phạm tự động theo rule
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Xuất báo cáo đối soát định kỳ
                </li>
              </ul>
              <button onClick={() => handleUpgrade("Advanced")} className="w-full h-10 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 shadow-sm transition-colors text-sm">
                Đăng ký ngay
              </button>
            </div>

            {/* GÓI 3: SLA PREMIUM */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col hover:border-blue-300 transition-colors">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">SLA Premium</h3>
                <p className="text-xs text-slate-500 mt-1 h-8">Dành cho tập đoàn (Enterprise) với nhu cầu tích hợp hệ thống phức tạp.</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-slate-900">Liên hệ</span>
                <span className="text-sm text-slate-500 font-medium"> / theo quy mô</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Bao gồm toàn bộ tính năng Advanced
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Phân quyền quản trị nâng cao
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Tích hợp nhiều hệ thống nội bộ chuyên sâu
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Audit trail phục vụ kiểm toán hệ thống
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Kèm hỗ trợ triển khai theo dự án
                </li>
              </ul>
              <button onClick={() => handleUpgrade("Premium")} className="w-full h-10 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors text-sm">
                Yêu cầu tư vấn
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}