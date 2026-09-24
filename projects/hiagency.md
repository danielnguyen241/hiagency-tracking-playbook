# HiAgency — Hoàn thiện tracking, kiểm tra container cũ trước

Domain: `https://hiagency.au/`; website WordPress theo hồ sơ dự án.

Người dùng xác nhận “chưa có”. Tuy nhiên HTML homepage ngày 24/09 có **`GTM-T5XHRL68`**; public URL gtm.js cho container trả **404** lúc kiểm tra. Không thấy GA4/Ads ID trực tiếp trong HTML. Không suy ra chắc container bị xóa hoặc chưa publish chỉ từ 404.

## Quy trình revise

1. Đăng nhập GTM bằng hello@hiagency.au (account vận hành đề xuất); tìm `GTM-T5XHRL68`, xác nhận quyền, owner, trạng thái và version.
2. Nếu container đúng dự án và có thể dùng: tái sử dụng, sửa/publish cấu hình cần thiết sau QA.
3. Nếu không có quyền: tìm owner để xin quyền. Nếu container không còn dùng được và đã quyết định thay thế: tạo container mới, ghi mapping cũ→mới và thay snippet có kiểm soát. Không gắn container mới song song một cách mù quáng.
4. Kiểm tra GA4 account/property sẵn có; chỉ tạo property/Web stream nếu thiếu. Việc cài Analytics MCP trước đây không chứng minh đã tạo GA4 hoặc có dữ liệu.
5. Tạo Google tag, form success events cho quote/contact/audit nếu các form đó hiện hữu; click điện thoại/email và calculator interaction tách khỏi lead thành công.
6. GSC: đã có lịch sử báo cáo SEO/GSC trong workspace, vì vậy tìm và tái sử dụng property trước khi tạo. “Chưa có tracking conversion” không có nghĩa chưa có GSC.
7. Ads chỉ bổ sung nếu cần; tạo action cho mục tiêu đã chốt. Hoàn tất QA và dashboard theo SOP.

**Đầu ra cần có:** quyền quản trị rõ ràng, GTM load được, GA4 đúng stream nhận event, form success một lần và failed submit không ghi lead, register + version publish + biên bản QA.
