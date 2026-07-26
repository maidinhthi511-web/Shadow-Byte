# User Flow (Luồng Người Dùng) - Dự án INJECTIVE SLA-DEX

Tài liệu này mô tả chi tiết các bước trong luồng người dùng (User Flow) của hệ thống INJECTIVE SLA-DEX, phục vụ cho quá trình phát triển (Development).

## Bước 1: Đăng ký và Thiết lập tài khoản
*   Các doanh nghiệp và nhà cung cấp dịch vụ tiến hành tạo tài khoản tổ chức trên nền tảng.
*   Người dùng lựa chọn gói dịch vụ phù hợp với nhu cầu của mình.
*   Doanh nghiệp thực hiện phân quyền người dùng theo các vai trò cụ thể như: quản trị, pháp chế, vận hành, quản lý dự án.

## Bước 2: Tạo lập, Thương lượng và Ký kết SLA
*   Phía doanh nghiệp lựa chọn một mẫu SLA theo ngành và cấu hình KPI, SLO thành các chỉ tiêu có thể đo lường được.
*   Hai bên tiến hành thương lượng điều khoản, chốt mức KPI, mức xử lý vi phạm và nguyên tắc nghiệm thu.
*   Sau khi thống nhất, hai bên sẽ ký kết hợp đồng điện tử.
*   Hệ thống tạo ra phiên bản SLA cuối cùng, sinh ra "dấu vân tay SLA" (hash của nội dung SLA và metadata quan trọng) để định danh và ghi nhận dấu thời gian.
*   Nền tảng thiết lập và triển khai một hợp đồng thông minh (smart contract) đại diện cho SLA để theo dõi trạng thái.
*   *(Lưu ý hệ thống: Tại bước này, mỗi khi SLA được tạo, ký kết hoặc gia hạn sẽ phát sinh phí).*

## Bước 3: Kết nối dữ liệu đo lường KPI (Oracle Hub)
*   Doanh nghiệp hoặc nhà cung cấp cấu hình "Oracle Hub" để hệ thống lấy dữ liệu từ các công cụ sẵn có (ví dụ: ticketing, monitoring, hệ thống quản lý dự án).
*   Dữ liệu KPI từ các hệ thống đo lường này sẽ được Oracle Hub thu thập theo chu kỳ.
*   *(Lưu ý hệ thống: Tùy thuộc vào mức độ tích hợp, bước này có thể phát sinh thêm phí API hoặc phí triển khai).*

## Bước 4: Giám sát, Cảnh báo và Xử lý vi phạm
*   Mỗi khi có dữ liệu mới, Oracle Hub tạo một sự kiện SLA (SLA event) để đưa vào hệ thống và cập nhật trạng thái SLA: đạt, cảnh báo, vi phạm nhẹ, vi phạm nghiêm trọng.
*   Toàn bộ quá trình theo dõi trạng thái và KPI sẽ được phản ánh trực tiếp trên Dashboard theo thời gian thực.
*   Khi có vi phạm xảy ra, hợp đồng thông minh tự động kích hoạt quy tắc xử lý: ghi nhận vi phạm, tính mức phạt và khấu trừ theo điều khoản.
*   Hệ thống tự động tạo thông báo và phiếu xử lý để hai bên phối hợp khắc phục.

## Bước 5: Nghiệm thu, Đối soát và Cập nhật uy tín
*   Khi kết thúc kỳ, nền tảng tự động tiến hành xuất báo cáo đối soát KPI minh bạch.
*   Hệ thống hỗ trợ quá trình thanh toán và thực hiện khấu trừ dựa theo hợp đồng.
*   Nếu nhà cung cấp đạt KPI tốt, hệ thống ghi nhận điểm uy tín và lịch sử thực thi để xếp hạng trên Marketplace.
*   Trường hợp không đạt KPI, điểm uy tín của nhà cung cấp đó sẽ bị trừ.
