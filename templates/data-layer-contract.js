/**
 * MẪU HỢP ĐỒNG, KHÔNG TỰ CHẠY / KHÔNG PHẢI UNIVERSAL FORM LISTENER.
 * Chỉ gọi sau callback đã xác nhận backend lưu thành công.
 * Integration phải whitelist form, kiểm tra consent và chống callback lặp.
 * submission_id: mã opaque ổn định từ backend, tuyệt đối không là email/phone.
 * GA4 không tự deduplicate generate_lead nhờ submission_id.
 * Không dùng mẫu để thay event J.Aesthetic hiện tại mà chưa kiểm kê phụ thuộc.
 */
function exampleAfterVerifiedSuccess(opaqueSubmissionId) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    form_id: 'REPLACE_WITH_APPROVED_FORM_ID',
    lead_type: 'quote_request',
    submission_id: opaqueSubmissionId
  });
}
