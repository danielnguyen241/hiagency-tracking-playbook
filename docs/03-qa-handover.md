# 03 — Double-check, nghiệm thu và bàn giao

## Phân biệt ba mức bằng chứng

1. **Có mã:** source HTML/container có ID.
2. **Có gửi:** Tag Assistant/Network thấy request đúng đích và đúng số lần.
3. **Có nhận đúng:** GA4 DebugView/Realtime nhận event; CMS xác nhận lead; Ads diagnostics nhận signal. Ads-attributed conversion còn cần tương tác quảng cáo hợp lệ và thời gian xử lý.

Preview tag fired không tự chứng minh conversion được quy cho quảng cáo. Không click quảng cáo của mình để tạo attribution test. Không kết luận tracking hỏng chỉ vì một test truy cập trực tiếp không tăng Ads Conversions.

## Ma trận test bắt buộc cho phần thay đổi

| Test | Kết quả mong đợi |
|---|---|
| Page load | Một page_view theo chiến lược đo đã chọn; không gửi đôi từ plugin và GTM |
| Form đúng gửi thành công | CMS lưu một submission; analytics success một lần; Ads đúng action nếu được cấu hình |
| Thiếu trường bắt buộc | Không có lead success |
| Server báo lỗi | Không có lead success |
| Double-click, callback lặp, reload | Không đếm lại cùng submission; submission khác vẫn được xử lý |
| Form khác/roadmap | Không kích hoạt action hỏi khóa học nếu không được chọn |
| Điện thoại/booking link | Event click riêng; không giả thành cuộc gọi/booking hoàn thành |
| Consent accept/reject | Hành vi đúng cấu hình đã thống nhất, không cưỡng ép granted |
| Mobile/desktop, live ngoài Preview | Đúng form, event và destination; không chỉ hoạt động ở Preview |

Test form có thể gửi thông báo cho sales: phối hợp người phụ trách trước khi thử, dùng dữ liệu kiểm thử được phép và đánh dấu trong hệ thống để loại khỏi KPI. Không đưa dữ liệu cá nhân vào ảnh bàn giao.

## Biên bản đóng việc

Điền `templates/qa-checklist.md`; lưu thời điểm, hostname, GTM version, ID đích, test case, expected/actual, evidence link và người kiểm tra. Trạng thái mỗi mục: PASS / FAIL / BLOCKED / NOT RUN. Chỉ đánh DONE khi các mục bắt buộc đạt; mục bị chặn phải có người chịu trách nhiệm và bước tiếp theo.

Bàn giao: asset register, event map, GTM export không chứa bí mật, version publish/rollback, vị trí gắn tag, link dashboard, quyền truy cập và checklist. Review lại sau lần deploy website tiếp theo; thay đổi theme/form/CMP có thể làm tracking khác đi.
