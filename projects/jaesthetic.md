# J.Aesthetic — Bổ sung, giữ hệ thống hiện có

**Account vận hành thấy trong lịch sử:** hello@hiagency.au. Ads customer: **207-008-5892 — J.Aesthetic Australia**, AUD, Australia/Sydney.

| Asset | Bằng chứng |
|---|---|
| GTM `GTM-58NSJDGR` | UI audit 07/09, public HTML 21/09 và 24/09 |
| GA4 `G-Y2GZ91EPKT` | Tham chiếu trong public container 24/09; chưa đối chiếu Admin/stream |
| Ads tag `AW-18339592382` | Public container 24/09 và audit 07/09 |
| Action `Nail Course Enquiry Submitted`, ID `7692572769` | Audit 07/09; enabled Primary trong snapshot 21/09 |
| Conversion ID `18339592382`, Label `wD57COGwjdQcEL7x_6hE` | Đối chiếu GTM/Ads 07/09 |
| Custom event `jaesthetic_nail_course_lead` | Trigger lịch sử; có tên trong public container 24/09 |
| Shopify Forms `1072562` | Lịch sử landing; cần xác định đúng mục đích hiện tại |

Đây là ID đã quan sát theo ngày nguồn, không phải xác nhận admin toàn bộ ngày 24/09. Theme archive tháng 7 có `GTM-WDDFBJQ9`; không dùng container cũ này để hướng dẫn cài lại.

## Phạm vi đã chốt: click WhatsApp và gọi điện

Người dùng xác nhận ngày 24/09: “tạo thêm” là theo dõi khách click WhatsApp hoặc gọi điện. **Tái sử dụng GTM/GA4 hiện hữu; không tạo Google account, Analytics property hoặc GTM container mới.**

| Cần thêm | WhatsApp | Điện thoại |
|---|---|---|
| GA4 event | `click_whatsapp` | `click_to_call` |
| Trigger GTM | Click đúng liên kết WhatsApp | Click liên kết `tel:` |
| Event tag | GA4 Event → stream hiện hữu | GA4 Event → stream hiện hữu |
| Parameters | `contact_channel=whatsapp`, `cta_location` nếu có mapping | `contact_channel=phone`, `cta_location` nếu có mapping |
| GA4 key event | Tùy nhu cầu báo cáo, không tự bật | Tùy nhu cầu báo cáo, không tự bật |
| Ads conversion | Chỉ tạo nếu cần xem click này trong Ads | Chỉ tạo nếu cần xem click này trong Ads |
| Ads optimization đề xuất | Secondary, Count One | Secondary, Count One |

### Cấu hình từng bước trong GTM

1. Export phiên bản cũ. Tạo workspace `J.Aesthetic | WhatsApp & Phone Clicks`.
2. Bật Built-in Variables: Click URL, Click Text, Click Classes, Click ID. Các biến này dùng để kiểm tra/trigger; không mặc định gửi Click Text hay Click URL thô sang GA4.
3. Preview website, xác định CTA thật trên header, footer, mobile floating button và các landing. Ghi phần tử, link đích, vị trí. Chưa kiểm kê runtime CTA trong lần tổng hợp này.
4. Tạo trigger `Click | WhatsApp | Links`: Just Links → Some Link Clicks → Click URL matches RegEx (ignore case) `^(https?://(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/|whatsapp://send)`. Đối chiếu URL thực tế; nếu dùng shortlink/redirect khác, whitelist chính xác URL đã xác minh, không match mọi URL có chữ whatsapp.
5. Tạo trigger `Click | Phone | tel`: Just Links → Some Link Clicks → Click URL matches RegEx (ignore case) `^tel:`.
6. Tạo `GA4 | click_whatsapp` và `GA4 | click_to_call`, gắn Google tag/Measurement ID hiện hữu sau khi xác minh `G-Y2GZ91EPKT` là đúng stream. Gắn trigger tương ứng; chỉ thêm parameters trong bảng trên.
7. Nếu button/widget không phải thẻ `<a href>`: Just Links không đủ. Dùng callback click của widget hoặc Custom Event/dataLayer có kiểm soát; chỉ dùng một đường đo cho mỗi CTA để tránh đếm đôi. Không dùng generic All Elements trigger bắt mọi nút.
8. Nếu team cần Ads reporting: trong customer `207-008-5892`, kiểm tra action tương đương đã có chưa. Nếu thiếu, tạo website conversion `WhatsApp Click` và `Phone Click`, Secondary, Count One; lấy ID/Label riêng cho mỗi action rồi tạo Ads tags với trigger tương ứng. **Không dùng lại Label form inquiry cho các click này.** Không đổi form action Primary. Kiểm tra campaign/custom goals không vô tình đưa click vào bidding.
9. Nếu chọn GA4 import thay native Ads cho click, chỉ chọn một nguồn đo trong Ads; không tạo cả hai bản sao cho cùng mục đích. Tracking GA4 đơn thuần không bắt buộc có Ads action.
10. Preview: mỗi click → một event tương ứng; form lead action không fire; GA4 đúng đích nhận event. Click CTA khác không fire; test desktop và mobile, nhất là mở app WhatsApp/dialer.
11. Publish có version name; kiểm tra live ngoài Preview và lưu biên bản. Không cần gửi tin nhắn WhatsApp hoặc thực hiện cuộc gọi thật để kiểm tra click event.

### Diễn giải trong report

Hiển thị ba nhóm riêng: **Form leads**, **WhatsApp clicks**, **Phone clicks**. Không cộng click vào “lead thật”. Muốn đo cuộc gọi kết nối hoặc cuộc hội thoại WhatsApp thực tế cần tích hợp/provider phù hợp, nằm ngoài phạm vi click tracking vừa chốt. Tự động outbound click của GA4 (nếu đang bật) có thể cùng phản ánh một thao tác; không cộng event generic `click` và `click_whatsapp` thành hai liên hệ.

Không gửi WhatsApp URL có query `text=` hoặc số điện thoại/email vào parameters. Nếu cần vị trí CTA, dùng label cố định như `header`, `footer`, `floating_mobile`.

## Điểm cần revise từ lịch sử

Tháng 8 người dùng từng xác nhận lead tracking chuẩn. Nhưng audit cụ thể 07/09 và 21/09 ghi nhận listener native submit/Shopify shadow root push event trước khi xác nhận server lưu thành công, nhận mọi Shopify form và cooldown 5 giây. Điều này tạo rủi ro false positives hoặc đếm sai form; không chứng minh toàn bộ conversion cũ là giả.

Khi bổ sung: xác minh callback success của Shopify Forms đang dùng; whitelist đúng form; phân biệt roadmap và inquiry; chống callback lặp theo submission. Không copy listener universal cũ sang dự án khác. QA phần thay đổi và logic liên quan, không tự sửa attribution/historical reporting.

## Thứ tự thực hiện

Export container/version → kiểm kê CTA WhatsApp/tel → thêm variables/trigger/tag cho click → Ads Secondary nếu cần → QA → publish → xác minh live. Form success là hạng mục theo dõi riêng từ audit, không âm thầm sửa trong gói thêm click. Giữ data lịch sử; không xóa action/property cũ để làm lại từ đầu.
