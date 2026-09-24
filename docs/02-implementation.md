# 02 — Quy trình triển khai từ đầu đến cuối

## Bước 1. Chốt đo cái gì

Lập measurement plan: domain, trang, form ID, hành động, bằng chứng thành công, event, nơi nhận dữ liệu, Primary/Secondary, người kiểm thử. Chốt nguồn xác nhận lead: CMS/CRM hoặc backend. Không coi email thông báo đến chậm là bằng chứng form thất bại.

| Hành động | Event đề xuất | Điều kiện | Mục tiêu Ads mặc định đề xuất |
|---|---|---|---|
| Gửi hỏi dịch vụ/báo giá/khóa học | `generate_lead` | Backend/nền tảng xác nhận lưu thành công, đúng form | Primary nếu đó là mục tiêu campaign |
| Tải roadmap/tài liệu | `resource_download` | Tài liệu được cung cấp theo flow đã xác nhận | Secondary; chỉ đổi khi chủ dự án chọn đây là mục tiêu chính |
| Click WhatsApp | `click_whatsapp` | Click đúng link/widget WhatsApp | Secondary; không phải tin nhắn đã gửi |
| Click số điện thoại | `click_to_call` | Click liên kết tel: | Secondary; không phải cuộc gọi hoàn thành |
| Click booking ngoài website | `booking_click` | Mở nền tảng booking | Secondary; không phải booking đã xác nhận |
| Booking thành công | `booking_complete` | Booking provider xác nhận được | Chọn theo mục tiêu dự án |

Các tên trên là chuẩn đề xuất cho triển khai mới. Không đổi tên event đang dùng của J.Aesthetic trước khi kiểm kê các tag/report phụ thuộc.

## Bước 2. Tạo GA4 nếu thiếu

Vào Google Analytics → Admin → tạo account nếu cần → tạo property đúng dự án → chọn timezone/currency → tạo Web data stream cho domain chính. Lưu numeric Property ID và Measurement ID `G-…` riêng biệt vào register. Kiểm tra Enhanced Measurement đang bật gì, nhất là page view, form interaction và outbound click để tránh đo hai lần.

Trong GTM tạo **Google tag** dùng ID của stream. Chọn trigger khởi tạo phù hợp và cấu hình consent theo cơ chế website. Không mặc định bật thêm một Google tag nếu theme/plugin/native integration đã gửi về cùng stream. Tạo GA4 Event tag cho các event trong plan, map tham số cần thiết. Chỉ đăng ký custom dimensions phục vụ báo cáo như `form_id`, `lead_type`; không đăng ký mã submission duy nhất làm dimension có cardinality cao.

## Bước 3. Tạo/cấu hình GTM nếu thiếu

Vào Tag Manager → tìm account dự án → Create Container → Web. Copy hai snippet do chính container cung cấp: script càng cao trong `<head>` càng tốt, noscript ngay sau mở `<body>` nếu CMS hỗ trợ. Cả hai phải cùng container ID.

- WordPress: chọn một cách cài được duy trì (integration/plugin hoặc child theme); kiểm tra mã đã cài ở plugin, theme và header/footer trước khi thêm.
- Shopify: kiểm tra theme, Customer events/pixels và app integration. Theme storefront không tự bao phủ checkout hoặc pixel sandbox. Dùng cơ chế nền tảng hỗ trợ cho vùng tương ứng; không thêm theme snippet để giả định track được toàn bộ checkout.
- Snapps/Duda hoặc CMS tương tự: kiểm tra Google Tools/native integration và Custom HTML; không gắn cùng tag ở cả hai nơi. Nếu chỉ có Body End, ghi rõ giới hạn placement của noscript và QA. Save và Republish website theo quy trình CMS.

Không đặt `<meta>` trong `<script>`, không lồng `<script>`, không để comment `-->` thành text trên trang.

## Bước 4. Gắn tín hiệu thành công

Dùng callback/sự kiện thành công đã xác minh của form hoặc backend. Push dataLayer theo [mẫu](../templates/data-layer-contract.js) sau khi lưu thành công. Giới hạn theo form ID và loại lead; giữ mã submission ổn định để xử lý callback lặp. Mẫu chỉ là hợp đồng dữ liệu, **không phải listener có thể dán lên mọi website**.

Trong GTM tạo Data Layer Variables cho `form_id`, `lead_type`, `submission_id`. Tạo Custom Event trigger với event đúng và điều kiện form/lead được phép. Tạo GA4 Event tag và, nếu có Ads, conversion tag tương ứng. Transaction ID của Ads nhận mã submission ổn định nếu integration hỗ trợ; QA cả chống đếm trùng tại integration. Tham số tùy ý `submission_id` không tự làm GA4 deduplicate mọi event.

Không truyền tên, email, điện thoại, nội dung form vào GA4/dataLayer dùng cho analytics. Nếu bật Enhanced Conversions, làm theo triển khai riêng của Google và consent phù hợp; không coi hashing là lý do được gửi PII vào GA4.

## Bước 5. Google Ads nếu dự án cần Ads

Vào đúng customer account → Goals/Conversions → tạo website conversion cho hành động thực sự mới; chọn category, Count = One cho lead, value theo giá trị đã được thống nhất (không tự bịa doanh thu), Primary/Secondary và attribution phù hợp. Ghi Conversion ID và Label từ action đó vào register.

Tạo Google Ads Conversion Tracking tag trong GTM, điền đúng ID/Label và trigger success. Kiểm tra Google tag/destination và Conversion Linker theo cấu hình hiện có, chỉ bổ sung phần thiếu. Link GA4–Ads khi cần và kiểm tra auto-tagging/click ID có được giữ qua redirect.

Chọn một nguồn Primary cho cùng hành động: native Ads hoặc GA4 import. Nếu có cả hai, nguồn phụ để quan sát; kiểm tra cả campaign goal và custom goal vì action Secondary trong custom goal vẫn có thể dùng cho bidding. Không cần tạo Ads account/campaign hoặc bật ngân sách chỉ để có GA4.

## Bước 6. SEO và dashboard

GSC: ưu tiên tái sử dụng property đã xác minh; chỉ tạo Domain property và DNS verification nếu thực sự thiếu. GSC không thay thế GA4 hoặc đo form submit.

Looker: kết nối đúng GA4/GSC/Ads của dự án; ghi timezone và nguồn mỗi chỉ số. Phân biệt website leads (GA4/CMS) với Ads-attributed conversions. Click-to-call không gộp thành lead đã xác nhận. Có thể bàn giao dashboard sau khi dữ liệu đủ; dashboard không phải điều kiện để tag gửi dữ liệu.

## Bước 7. Preview → Publish → QA live

Export/backup GTM version cũ và đoạn cài đặt website. Preview kiểm tra positive/negative cases theo checklist. Sau khi đạt, Publish với tên version mô tả thay đổi. Xác minh live ở phiên ngoài Preview. Nếu lỗi, quay về GTM version đã ổn định và restore phần website đã thay đổi; ghi lại thời điểm rollback và ảnh hưởng dữ liệu.

Không tắt consent để làm Realtime tăng. Kiểm tra cả chấp nhận và từ chối theo CMP và Consent Mode thực tế; thiếu dữ liệu có thể do consent, ad blocker, độ trễ hoặc sai tag.
