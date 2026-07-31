Tài liệu Mô tả Sản phẩm & User Stories (MVP: FinChain DaNang)
1. Tổng quan mô tả ứng dụng (Product Overview)
Tên ứng dụng: FinChain DaNang

Mục tiêu sản phẩm: Cung cấp một nền tảng tài chính phi tập trung (DeFi) tối giản, ứng dụng công nghệ Blockchain nhằm minh bạch hóa giao dịch thanh toán, tự động hóa quy trình cho vay tín chấp/thế chấp, quản lý tài sản và kiểm soát rủi ro thời gian thực cho người dùng cá nhân.

Đối tượng sử dụng chính: Khách hàng cá nhân (người vay, người thanh toán) và Quản trị viên hệ thống (Risk Manager / Admin).

2. Danh sách User Stories (Được chia theo 4 phân hệ chính)
Phân hệ 1: Thanh toán (Payment)
US-01: Thanh toán hóa đơn / Chuyển tiền qua Smart Contract

Là một Người dùng,

Tôi muốn thực hiện lệnh chuyển tiền hoặc thanh toán dịch vụ bằng cách nhập thông tin người nhận và số tiền trên giao diện,

Để hệ thống tự động thực thi giao dịch thông qua hợp đồng thông minh (Smart Contract) mà không cần qua trung gian và nhận về mã định danh giao dịch (Transaction Hash) làm bằng chứng tức thì.

Tiêu chí nghiệm thu (Acceptance Criteria):

Giao diện cung cấp các trường nhập: Người gửi, Người nhận, Số tiền.

Khi bấm nút xác nhận, giao dịch được ghi nhận thành công và sinh ra một chuỗi Hash SHA-256 lưu trên sổ cái.

Phân hệ 2: Cho vay (Lending)
US-02: Đăng ký khoản vay tự động

Là một Người có nhu cầu vay vốn,

Tôi muốn nhập giá trị tài sản thế chấp và số tiền muốn vay để hệ thống tự động đánh giá hạn mức,

Để biết ngay lập tức khoản vay có được duyệt hay không dựa trên tỷ lệ tài sản thế chấp trên khoản vay (LTV - Loan-to-Value) mà không phải chờ duyệt thủ công.

Tiêu chí nghiệm thu (Acceptance Criteria):

Hệ thống tự động tính toán tỷ lệ LTV (LTV = Số tiền vay / Giá trị tài sản thế chấp * 100%).

Nếu LTV nhỏ hơn hoặc bằng 70%, khoản vay được trạng thái "Được duyệt". Nếu lớn hơn, hệ thống tự động từ chối.

Phân hệ 3: Kiểm soát rủi ro (Risk Control)
US-03: Giám sát và cảnh báo rủi ro biến động thị trường

Là một Quản trị viên rủi ro,

Tôi muốn giả lập các kịch bản biến động giảm giá của tài sản thế chấp trên thị trường,

Để theo dõi thời gian thực sự thay đổi của tỷ lệ LTV và nhận cảnh báo tự động khi khoản vay chạm ngưỡng nguy hiểm, kích hoạt cơ chế thanh lý.

Tiêu chí nghiệm thu (Acceptance Criteria):

Có thanh trượt (slider) mô phỏng mức giảm giá tài sản thế chấp (từ 0% đến 50%).

Khi LTV sau biến động vượt ngưỡng an toàn (ví dụ: > 80%), hệ thống hiển thị cảnh báo đỏ và thông báo kích hoạt cơ chế thanh lý tự động bằng Smart Contract.

Phân hệ 4: Quản lý (Management)
US-04: Theo dõi lịch sử sổ cái minh bạch (Blockchain Ledger)

Là một Người dùng hệ thống,

Tôi muốn xem danh sách toàn bộ các khối dữ liệu (Blocks) đã được ghi nhận trên chuỗi,

Để tra cứu lại lịch sử các giao dịch thanh toán và khoản vay một cách minh bạch, tuyệt đối không thể bị chỉnh sửa hay xóa bỏ.

Tiêu chí nghiệm thu (Acceptance Criteria):

Hiển thị tổng số lượng Block hiện có trên chuỗi.

Người dùng có thể mở rộng (expand) từng Block để xem chi tiết: Chỉ số Block (Index), Thời gian (Timestamp), Dữ liệu giao dịch (Data), Mã băm hiện tại (Current Hash) và Mã băm của khối trước (Previous Hash).