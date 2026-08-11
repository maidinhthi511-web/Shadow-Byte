"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Danh sách 18 tay to trên Marketplace
const PROVIDERS = [
  { id: "p-01", name: "FPT Software", service: "Cloud Hosting & Storage", kpi: "Uptime 99.99%", response: "< 15 phút", penalty: "Hoàn 10% phí/giờ", reputation: 98, verified: true, logo: "FPT" },
  { id: "p-02", name: "Viettel IDC", service: "Cybersecurity SOC", kpi: "Phát hiện sự cố < 5p", response: "< 10 phút", penalty: "Khấu trừ 5 INJ", reputation: 96, verified: true, logo: "VIDC" },
  { id: "p-03", name: "VNG Cloud", service: "IT Infrastructure", kpi: "Uptime 99.95%", response: "< 30 phút", penalty: "Hoàn 5% phí/giờ", reputation: 99, verified: true, logo: "VNG" },
  { id: "p-04", name: "Amazon Web Services", service: "AWS EC2 & Serverless", kpi: "Uptime 99.99%", response: "< 10 phút", penalty: "Credit 10% bill", reputation: 100, verified: true, logo: "AWS" },
  { id: "p-05", name: "CMC Telecom", service: "Network Bandwidth", kpi: "Cam kết 99.9%", response: "< 1 giờ", penalty: "Khấu trừ 2 INJ", reputation: 92, verified: false, logo: "CMC" },
  { id: "p-06", name: "VNPT Cloud", service: "Data Center Colocation", kpi: "Uptime 99.98%", response: "< 30 phút", penalty: "Khấu trừ 3 INJ", reputation: 94, verified: true, logo: "VNPT" },
  { id: "p-07", name: "Microsoft Azure", service: "Azure Kubernetes (AKS)", kpi: "Uptime 99.95%", response: "< 15 phút", penalty: "Hoàn 10% phí/tháng", reputation: 99, verified: true, logo: "MS" },
  { id: "p-08", name: "Google Cloud", service: "BigQuery & Vertex AI", kpi: "Uptime 99.99%", response: "< 15 phút", penalty: "Credit 15% bill", reputation: 98, verified: true, logo: "GCP" },
  { id: "p-09", name: "BizFly Cloud", service: "CDN & Load Balancing", kpi: "Latency < 50ms", response: "< 20 phút", penalty: "Khấu trừ 5 INJ", reputation: 93, verified: true, logo: "BIZ" },
  { id: "p-10", name: "Tiki Logistics Ops", service: "E-commerce Fulfillment", kpi: "Xử lý đơn < 2h", response: "< 15 phút", penalty: "Hoàn 15% phí/ngày", reputation: 95, verified: true, logo: "TIKI" },
  { id: "p-11", name: "HPT Vietnam", service: "Security Audit", kpi: "Quét lỗ hổng < 24h", response: "< 30 phút", penalty: "Khấu trừ 4 INJ", reputation: 95, verified: true, logo: "HPT" },
  { id: "p-12", name: "Base.vn", service: "Enterprise SaaS API", kpi: "API Uptime 99.9%", response: "< 10 phút", penalty: "Hoàn 5% phí/tháng", reputation: 96, verified: true, logo: "BASE" },
  { id: "p-13", name: "VSEC", service: "Pentest & Red Teaming", kpi: "Phát hiện zero-day", response: "< 1 giờ", penalty: "Khấu trừ 5 INJ", reputation: 97, verified: true, logo: "VSEC" },
  { id: "p-14", name: "Sao Bac Dau", service: "System Integration", kpi: "Deploy đúng hạn 100%", response: "< 2 giờ", penalty: "Hoàn 20% Hợp đồng", reputation: 91, verified: false, logo: "SBD" },
  { id: "p-15", name: "MISA", service: "ERP/Accounting Sync", kpi: "Data Sync < 5 phút", response: "< 30 phút", penalty: "Khấu trừ 2 INJ", reputation: 94, verified: true, logo: "MISA" },
  { id: "p-16", name: "Mat Bao", service: "Web Hosting & Domain", kpi: "Uptime 99.9%", response: "< 45 phút", penalty: "Tặng 1 tháng host", reputation: 89, verified: false, logo: "MB" },
  { id: "p-17", name: "KDATA", service: "Bare Metal Server", kpi: "Network 99.99%", response: "< 15 phút", penalty: "Khấu trừ 3 INJ", reputation: 90, verified: true, logo: "KDT" },
  { id: "p-18", name: "MobiFone Global", service: "SIP Trunking / VoIP", kpi: "Voice drop < 0.1%", response: "< 20 phút", penalty: "Hoàn 10% cước", reputation: 92, verified: true, logo: "MOBI" },
]

export default function MarketplacePage() {
  const router = useRouter()
  const [username, setUsername] = useState("Administrator")
  const [searchTerm, setSearchTerm] = useState("")

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

  const handleSelectProvider = (providerName: string) => {
    alert(`Bạn đã chọn nhà cung cấp ${providerName}.\nHệ thống sẽ chuyển sang màn hình đàm phán hợp đồng.`)
    router.push("/create-sla")
  }

  const filteredProviders = PROVIDERS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.service.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            
            {/* NÚT MARKETPLACE (Đang active) */}
            <Link href="/marketplace" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-100 text-slate-900 font-medium text-sm transition-colors">Marketplace SLA</Link>
            
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

      {/* --- NỘI DUNG CHÍNH --- */}
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Marketplace Nhà Cung Cấp</h2>
              <p className="text-slate-500 text-sm mt-1">Lựa chọn đối tác dịch vụ dựa trên cam kết SLA và hồ sơ uy tín on-chain.</p>
            </div>
            <div className="w-72">
              <input 
                type="text" 
                placeholder="Tìm kiếm dịch vụ, nhà cung cấp..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 h-10 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 text-sm bg-white shadow-sm" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="p-5 border-b border-slate-100 flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
                    {provider.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 truncate pr-2">{provider.name}</h3>
                      {provider.verified && (
                        <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 truncate">{provider.service}</p>
                  </div>
                </div>
                
                <div className="p-5 flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Điểm Uy Tín</span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${provider.reputation >= 95 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                      {provider.reputation} / 100
                    </span>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Mục tiêu KPI:</span>
                      <span className="font-semibold text-slate-900">{provider.kpi}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Phản hồi:</span>
                      <span className="font-semibold text-slate-900">{provider.response}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Đền bù:</span>
                      <span className="font-semibold text-red-600">{provider.penalty}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-auto">
                  <button 
                    onClick={() => handleSelectProvider(provider.name)}
                    className="w-full h-10 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition-colors text-sm"
                  >
                    Chọn Nhà Cung Cấp
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}