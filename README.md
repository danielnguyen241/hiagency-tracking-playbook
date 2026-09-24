# HiAgency — Quy trình triển khai tracking

Bản revise: **24/09/2026** · Tài liệu nội bộ để triển khai và bàn giao cho team.

## Bắt đầu từ đây

1. Đọc [Account & quyền sở hữu](docs/01-accounts.md).
2. Chọn đúng dự án trong bảng dưới.
3. Thực hiện [Quy trình triển khai](docs/02-implementation.md).
4. Nghiệm thu bằng [QA & bàn giao](docs/03-qa-handover.md).
5. Điền [asset register](templates/asset-register.csv) và [biên bản QA](templates/qa-checklist.md).

| Dự án | Nhánh công việc | Đã biết | Cần làm |
|---|---|---|---|
| [BIABnails](projects/biabnails.md) | Thiết lập mới | Người dùng xác nhận chưa có; chưa thấy tag trong HTML homepage | Kiểm kê account → tạo asset còn thiếu → gắn → QA |
| [J.Aesthetic](projects/jaesthetic.md) | Bổ sung trên hệ thống hiện có | GTM, GA4, Ads và conversion hiện hữu | Thêm click WhatsApp và gọi điện trên GTM/GA4 cũ; Ads Secondary nếu cần |
| [Everyday Clean](projects/everydayclean.md) | Double-check | GTM, GA4 và Ads ID xuất hiện trên website | Kiểm tra quyền, firing, đếm trùng, form success và báo cáo |
| [HiAgency](projects/hiagency.md) | Hoàn thiện thiết lập | Người dùng nói chưa có; website có GTM nhưng endpoint trả 404 | Kiểm tra container cũ trước; chỉ tạo mới phần thực sự thiếu |

**Kết luận không đồng nghĩa đã triển khai:** bộ này là SOP và source bàn giao. Chưa tạo account/property/conversion, chưa publish GTM, chưa sửa website và chưa gửi form thật.

## Quy tắc chung

- Account đăng nhập là danh tính quản trị; GA4 property, GTM container và Ads account là các tài sản riêng. Không tạo Gmail mới cho từng event/campaign.
- Mỗi dự án có asset riêng. Không tái sử dụng Measurement ID, Conversion Label hoặc container của khách khác.
- Mỗi hành động kinh doanh chỉ có một nguồn conversion Primary dùng để tối ưu trong cùng mục tiêu; tránh native Ads và GA4 import cùng đếm hành động đó.
- Submit thành công mới là lead. Click CTA, click điện thoại, mở form và tải tài liệu phải phân loại riêng.
- ID nhìn thấy trong source chỉ chứng minh có cấu hình tham chiếu; không chứng minh quyền sở hữu hoặc dữ liệu đã được nhận.

## Nội dung repo

`docs/`: SOP chung. `projects/`: hướng dẫn từng dự án. `templates/`: bảng điền và mẫu dataLayer. `evidence/`: bằng chứng công khai đã rút gọn và nguồn lịch sử.

Tài liệu không chứa mật khẩu, OAuth token, webhook, dữ liệu lead hoặc export nguyên cuộc trò chuyện. Giữ repo private khi còn tên dự án và account nội bộ. Chia sẻ qua quyền repo cho thành viên được phép.
