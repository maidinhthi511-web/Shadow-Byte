"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CreateSlaPage() {
  const router = useRouter()
  const [client, setClient] = useState("")
  const [service, setService] = useState("Cloud Hosting & Storage")
  const [uptime, setUptime] = useState("99.9%")
  const [responseTime, setResponseTime] = useState("200ms")
  const [penalty, setPenalty] = useState("5 INJ / giờ vi phạm")
  const [toast, setToast] = useState({ show: false, message: "" })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!client.trim()) {
      setToast({ show: true, message: "Vui lòng nhập tên khách hàng đầy đủ!" })
      setTimeout(() => setToast({ show: false, message: "" }), 3000)
      return
    }
    
    const existing = JSON.parse(localStorage.getItem("sla_contracts") || "[]")
    
    const newContract = {
      id: `SLA-${1024 + existing.length}`,
      client: client,
      service: service,
      kpi: `Uptime ${uptime}`,
      responseTime: responseTime,
      penalty: penalty,
      status: "Active"
    }
    
    localStorage.setItem("sla_contracts", JSON.stringify([newContract, ...existing]))
    
    setToast({ show: true, message: "Khởi tạo Smart Contract thành công trên Injective Chain!" })
    setTimeout(() => {
      setToast({ show: false, message: "" })
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 relative">
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold mb-6 inline-flex items-center gap-2">
          &larr; Quay lại Dashboard
        </Link>
        
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h1 className="text-2xl font-extrabold text-slate-800">Khởi Tạo Smart Contract SLA</h1>
            <p className="text-slate-500 text-sm mt-1">Cấu hình thông số KPI và đưa hợp đồng lên mạng lưới Injective.</p>
          </div>

          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tên Khách Hàng (Client)</label>
              <input
                type="text"
                placeholder="VD: VNG Corporation"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Loại Dịch Vụ</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 bg-slate-50/50"
              >
                <option value="Cloud Hosting & Storage">Cloud Hosting & Storage</option>
                <option value="API Gateway">API Gateway</option>
                <option value="Cybersecurity Monitoring">Cybersecurity Monitoring</option>
                <option value="IT Infrastructure">IT Infrastructure</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Uptime Tối Thiểu</label>
                <input
                  type="text"
                  value={uptime}
                  onChange={(e) => setUptime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phản Hồi Tối Đa</label>
                <input
                  type="text"
                  value={responseTime}
                  onChange={(e) => setResponseTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Cơ Chế Đền Bù (Auto-Execution)</label>
              <input
                type="text"
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 bg-slate-50/50"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(37,99,235,0.8)] active:scale-95 flex items-center justify-center gap-2"
              >
                Ký Duyệt & Đẩy Lên Chain
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}