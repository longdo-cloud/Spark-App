# Changelog

## 2026-11-27 — v2: code lại web app từ section Main flow (5 section đã chốt)

- **App · 4 tabs**: Video / Photo (before–after kéo được) / Tools / Gallery (Queue, Video, Image, Uploads, Bookmarks), tab bar Liquid Glass + Search.
- **Flow · Collection grid → Generate video**: grid 2 cột + chip + sheet Categories; feed full màn hình (cuộn dọc, thu gọn thành "Use this" + viền lime chạy); sheet More (mạng xã hội + Copy link / Report / Contact us); Create 1 ảnh và 2 ảnh; Generation settings + dialog Discard changes; Guidelines + Permission (checkbox tròn); Choose a photo (có / chưa có creations); picker; Crop; Checking → Looks good / No clear face; Making (viền phát sáng, toast Notify có chuông rung); Result (share row, Save to Album, Try again · coin) và Result lỗi (chip vàng hoàn coin).
- **Flow Generate image**: dùng chung flow, Ratio 4:5 / 1:1 / 9:16 + Resolution, 100 coin, kết quả 4:5.
- **Flow · Profile → Credits & Account**: Guest (hết / ít / còn coin), sheet Sign in, Signed in Free / Pro (thẻ Credits), Coin history (trống / Pro, lọc All·Spent·Added), Edit profile (đổi tên, username có báo trùng, bio, giới tính, sinh nhật dạng wheel, ảnh đại diện, Switch account, Sign out), Refill credits, Top-up success, Paywall.
- **Flow · Save to collection → Gallery › Bookmarks**: toast "Saved · Collections", sheet Save to collection, tạo collection mới (báo trùng tên), Bookmarks grid, chi tiết collection, menu ··· Rename / Delete (+ Undo), collection trống.
- Bản cũ chuyển vào `legacy/`.

## 2026-11-23 — Prototype theo Figma (3 section: 4 tab · Flow tạo video · Flow tạo ảnh)

### Flow tạo video & tạo ảnh
- **03 · Create**: template tràn màn hình, ✕ + tên template; thẻ "Add your photo" (nút + lime đập kèm 2 vòng toả), thanh cài đặt, nút Create · coin. Trạng thái Checking → Your photo · Looks good + Change, hoặc Rejected (không trừ coin).
- **03a · Generation settings**: đổi ngay tại chỗ (không mở sheet thứ hai), nút Save. Video: Sound / Duration / Resolution. Ảnh: Ratio / Quality (ghi chú thêm coin khi chọn 720p / HD).
- **05 · Choose a photo**: sheet mới (Take a selfie / Photo library / Recent), chạm ảnh Recent là chọn luôn; trạng thái **No recent photos**.
- **05a · Photo library**: dùng picker mặc định của iPhone.
- **05b · Crop photo** (mới): kéo góc để cắt, không chọn tỉ lệ, Save.
- **Create → làm luôn**, bỏ bước preview poster.
- **08 · Making**: viền phát sáng Twin comets (lavender) + card chờ (ảnh mờ "thở", cực quang, vệt sáng quét, hạt lấp lánh, chip đổi chữ), bỏ vòng %.
- **09 · Result**: video 9:16 có nút play / ảnh 4:5; Share / Save.

### Template detail (feed)
- Header: Back + tiêu đề căn giữa, bỏ Join Now; cuối hàng chip là icon filter.
- Khi lướt: ẩn hàng chip, filter nằm cạnh tiêu đề; thanh dưới gọn (giá · Use this · Save).
- Chọn category bằng **sheet iOS** (tiêu đề Categories, ✕, list có ✓ lime) — áp dụng cho feed và Collection grid.

### Thành phần chung
- Coin mới từ Figma (`img/spark-coin.png`, nền trong suốt; đổi tên để thoát cache cũ).
- Nút **Join Now** export từ Figma (`img/join-now.png`).
- Khung tutorial (coach mark) không còn tràn ra ngoài màn hình.

### Panel demo
- Thêm nút **Crop photo** và công tắc **No recent photos**; "Create image" mở template Lavender Birthday.
