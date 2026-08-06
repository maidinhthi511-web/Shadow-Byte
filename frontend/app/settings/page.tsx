"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function SettingsPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("Smart Contract Administrator")
  const [department, setDepartment] = useState("IT Infrastructure & Blockchain")
  const [walletAddress, setWalletAddress] = useState("inj1234567890abcdef...xyz789")
  
  const [currentPass, setCurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [toast, setToast] = useState({ show: false, message: "" })

  useEffect(() => {
    const user = localStorage.getItem("sla_logged_user") || "Administrator"
    setUsername(user)
    setEmail(localStorage.getItem("sla_user_email") || "admin@sladex.io")
  }, [])

  const showToast = (msg: string) => {
    setToast({ show: true, message: msg })
    setTimeout(() => setToast({ show: false, message: "" }), 3000)
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !email.trim()) {
      showToast("Vui lòng điền đầy đủ thông tin bắt buộc!")
      return
    }
    localStorage.setItem("sla_logged_user", username)
    localStorage.setItem("sla_user_email", email)
    showToast("Cập nhật hồ sơ doanh nghiệp thành công!")
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPass || !newPass) {
      showToast("Vui lòng nhập đầy đủ thông tin mật khẩu!")
      return
    }
    showToast("Đổi mật khẩu bảo mật thành công!")
    setCurrentPass("")
    setNewPass("")
  }

  const handleDeleteAccount = () => {
    if (confirm("Cảnh báo: Bạn có chắc chắn muốn xóa vĩnh viễn cấu hình tài khoản này khỏi hệ thống không?")) {
      localStorage.removeItem("sla_logged_user")
      localStorage.removeItem("sla_user_email")
      alert("Tài khoản đã được xóa.")
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 relative">
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold mb-6 inline-flex items-center gap-2">
          &larr; Quay lại Dashboard
        </Link>
        
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Cài Đặt Hồ Sơ Doanh Nghiệp</h1>
            <p className="text-slate-500 text-sm mt-1">Quản lý định danh quản trị viên, thông tin phòng ban và bảo mật chuỗi.</p>
          </div>

          {/* Form cập nhật hồ sơ doanh nghiệp chuẩn */}
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider border-b pb-2">Thông tin định danh</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Họ và Tên / Đại diện</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email Công Ty</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Chức Vụ (Role)</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Phòng Ban / Đơn vị</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Địa Chỉ Ví Injective (Web3 Public Key)</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50 font-mono text-xs"
              />
            </div>

            <button type="submit" className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md">
              Lưu Thay Đổi Hồ Sơ
            </button>
          </form>

          {/* Form đổi mật khẩu */}
          <form onSubmit={handleChangePassword} className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Bảo mật & Mật khẩu</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm bg-slate-50"
                />
              </div>
            </div>
            <button type="submit" className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md">
              Cập Nhật Mật Khẩu
            </button>
          </form>

          {/* Vùng nguy hiểm */}
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-red-600 text-sm">Hủy Kích Hoạt Tài Khoản</h4>
              <p className="text-xs text-slate-400">Thu hồi quyền truy cập và xóa vĩnh viễn định danh khỏi Node.</p>
            </div>
            <button onClick={handleDeleteAccount} className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-sm transition-all">
              Xóa Tài Khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}