# BIABnails — Thiết lập mới

Domain trong hồ sơ dự án: `https://biabnails.au/` (không dùng nhầm biabnails.com.au).

**Hiện trạng:** người dùng xác nhận chưa có tracking. Kiểm tra HTML homepage ngày 24/09 không thấy GTM/GA4/Ads ID; chưa kiểm tra runtime hoặc account nên không chứng minh tuyệt đối asset chưa tồn tại.

**Account:** đề xuất vận hành bằng hello@hiagency.au sau khi có quyền; chưa xác minh owner tài sản.

## Việc cần tạo/gắn

1. Kiểm kê trong GTM/GA4/GSC dưới account đúng. Chưa có thì tạo account dự án khi cần, GTM Web container, GA4 property và Web stream.
2. Điền toàn bộ ID vào register; gắn container đúng website production theo CMS thực tế (hồ sơ local có theme WordPress, cần xác minh theme đang live).
3. Tạo Google tag trong GTM hoặc tái sử dụng integration được chọn; bảo đảm page_view không trùng.
4. Chốt flow tạo lead: form inquiry, điện thoại, booking/directory nếu có. Tạo success event cho form thật; click booking ngoài site chỉ là booking_click cho đến khi có xác nhận booking.
5. Tạo Ads account/action chỉ khi dự án cần chạy Ads và chưa có; không coi đây là bắt buộc để triển khai analytics.
6. GSC property nếu thiếu; dashboard dự án khi nguồn dữ liệu sẵn sàng.
7. QA, publish và bàn giao theo SOP.

**Chưa có để điền:** GTM/GA4/Ads owner, Property ID, Measurement ID, form ID và booking provider. Không copy ID J.Aesthetic dù hai dự án cùng ngành nails.
