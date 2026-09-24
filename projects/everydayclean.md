# Everyday Clean — Double-check hệ thống đang có

Domain: `https://www.everydayclean.com.au/`.

**Kiểm tra công khai 24/09:** HTML homepage tham chiếu `GTM-PWW5HZTT`, GA4 `G-NTR516955X`, Ads `AW-16656608515`. Public GTM endpoint trả 200 và có GA4 ID này. Đây chưa phải xác nhận form conversion chạy đúng.

**Account:** chưa có bằng chứng owner/login riêng cho dự án. Dùng hello@hiagency.au làm email được mời theo chuẩn đề xuất; đối chiếu quyền thực tế. Ads tag ID không phải Ads Customer ID.

## Double-check theo thứ tự

1. Mở GTM/GA4/Ads bằng account có quyền, đối chiếu đúng domain và ID ở trên; lấy numeric Property ID, Ads Customer ID, action/label còn thiếu.
2. Tìm nơi cài: native Google Tools, custom HTML, plugin hoặc GTM. Vì GA4 ID xuất hiện cả HTML và container, kiểm tra Network/Tag Assistant để biết có firing trùng không; chỉ trùng ID trong source chưa đủ kết luận gửi đôi.
3. Kiểm tra container published, Google tag, GA4 events, Ads destinations và conversion linker theo setup.
4. Homepage có form liên hệ và cả text success/error trong markup. Không dùng “text cảm ơn có trong DOM” làm bằng chứng đã submit. Phải dùng trạng thái thành công sau server response và đúng form.
5. Test positive/negative/duplicate cases; đối chiếu CMS lưu lead với GA4 success event và Ads request/diagnostics.
6. Kiểm tra click số điện thoại có tách khỏi lead; kiểm tra consent, mobile, redirect và UTMs.
7. Chốt PASS/FAIL/BLOCKED vào checklist. Chỉ tạo thêm phần thiếu sau khi audit; không tạo property/container mới mặc định.

**Kết quả lần này:** kiểm kê công khai hoàn thành; kiểm tra authenticated và end-to-end chưa thực hiện. GA4 API bị chặn bởi yêu cầu đăng nhập lại. Chưa có kết luận “tracking đã chuẩn”.
