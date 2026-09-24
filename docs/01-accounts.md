# 01 — Dùng account nào, tạo asset ở đâu?

## Account vận hành

**Đề xuất chuẩn: `hello@hiagency.au` làm account vận hành HiAgency.** Email này đã xuất hiện trong lịch sử Google Ads J.Aesthetic. Chưa xác minh rằng email này là Owner/Admin của GTM, GA4, GSC và Ads cho cả bốn dự án. Không ghi là “đã có quyền” trước khi kiểm tra màn hình quản lý truy cập.

Khách hàng nên giữ quyền quản trị tài sản của mình; HiAgency được mời bằng email công việc. Với tài sản HiAgency, công ty giữ quyền quản trị. Nếu asset đã ở account khác, xin quyền vào asset cũ, không tạo bản sao chỉ vì account đang đăng nhập không nhìn thấy.

| Dịch vụ | Đăng nhập/quản lý | Tạo khi thiếu | Quyền cần kiểm tra |
|---|---|---|---|
| Google Tag Manager | Email công việc được mời vào account/container của dự án | Account dự án nếu chưa có; 1 Web container cho website | Quyền account và container riêng; người phát hành cần Publish |
| GA4 | Email công việc được mời vào Analytics | Analytics account nếu chưa có phạm vi phù hợp; property dự án; Web data stream | Editor để cấu hình, Administrator để quản lý truy cập |
| Google Ads | Account khách hàng; MCC HiAgency chỉ để quản lý liên kết | Customer account chỉ khi cần chạy Ads và chưa có; conversion action trong account đo lường đúng | Quyền chỉnh conversion; xác định account sở hữu conversion nếu dùng cross-account tracking |
| Search Console | Owner của domain, mời HiAgency | Domain property nếu chưa có, xác minh DNS | Owner cho xác minh/quản lý cần thiết |
| Looker Studio | Email công việc, chia sẻ viewer/editor phù hợp | Report và data source cho dự án | Quyền nguồn dữ liệu và credential của report |
| CMS/website | WordPress, Shopify hoặc nền tảng đang dùng | Không tạo website mới vì cần tracking | Quyền chỉnh integration/theme và phát hành đúng phạm vi |

Chưa có bằng chứng xác định MCC ID HiAgency trong bộ này. Không dùng Ads Customer ID `207-008-5892` của J.Aesthetic làm MCC hoặc làm account cho dự án khác.

## Checklist trước khi tạo

1. Đăng nhập đúng Google profile, ghi email hiện tại vào register.
2. Tìm theo tên dự án và domain trong GTM/Analytics/Ads/GSC. Kiểm tra cả asset đã được người khác quản lý.
3. Ghi ID, owner, vai trò, timezone, currency, domain/stream, nơi cài tag và version đang publish.
4. Nếu chưa thấy: xác nhận với owner trước khi kết luận “chưa có”.
5. Chỉ tạo asset còn thiếu; naming đề xuất: `Project | Production`, container theo hostname, stream `Project | Web`.
6. Timezone theo vận hành dự án; J.Aesthetic dùng Australia/Sydney và AUD theo lịch sử. Các dự án còn lại cần xác nhận trước khi tạo; không mặc định timezone máy nhân sự.

Không cần Google Cloud project, API key hoặc MCP để gắn GTM/GA4 cơ bản. API/MCP phục vụ đọc dữ liệu tự động là phần riêng, không phải bước bắt buộc của SOP.
