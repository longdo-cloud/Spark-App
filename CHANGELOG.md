# Changelog

## 2026-11-27 — Vuốt, chuyển cảnh, Try now

- Hero banner, hàng category và các hàng thẻ kéo được bằng chuột (vuốt); hero tự trượt về đúng trang, tạm dừng tự chạy khi người dùng vuốt.
- Try now trên hero mở thẳng flow Generate video (Tiny Chefs, Granny Rush, Sky Pool Duo, Whale Wake-up, Game Day Glow — clip v/03, 12, 06, 14, 08).
- Feed: lăn chuột / kéo / phím ↑↓ chuyển đúng 1 cảnh mỗi lần, chuyển động mượt (ease-out) kèm parallax giữa 2 cảnh.
- Toast "Removed from Saved" nằm dưới cùng vị trí với toast "Saved".
- Mặc định không template nào được bookmark.

## 2026-11-27 — Tools → Hairstyle, Gallery → Queue & Library, quà tặng; dùng ảnh/video có sẵn

- **Ảnh & video**: dùng lại file đã có trong `img/`, `v/`, `p/` (banner_hair, beauty_1–3, selfie1–5, street, blackcat1/4, aivid02/16, cosmic, witchcat, tool_color/length/smooth). Chỉ thêm 12 ảnh Figma chưa có trong repo (hero Hairstyle, kết quả Wolf Cut, preset, Double Eyelids / V-Line / Brighten Skin, 4 ảnh tab Image).
- **Tab Video**: hero thành carousel 5 video (v/03, 12, 06, 14, 08) tự chạy, có chấm trang. Cosmic Night phát v/05.
- **Tab Tools** theo Figma flow Tools: banner Short Hair → Long Hair, các thẻ đúng ảnh; bấm Hairstyle / banner / thẻ Hairstyle mở flow mới.
- **Flow Tools → Hairstyle**: Hairstyle detail (before/after kéo được, preset Pixie Cut…Space Buns), Create (Full body…), Generation settings (Ratio + Quality), Guidelines lần đầu (I understand), Choose a photo (Recent / No recent photos), Crop, Checking, Looks good, Making, Photo result và Failed.
- **Flow Gallery**: Queue (Waiting / Making now / Didn’t work), Queue trống, Cancel creation (alert), Item ready (toast View), Video, Video trống, Video viewer (play, thanh tua, ⋯ Remake/Report/Delete), Image dạng grid 3 cột, chọn nhiều (nhấn giữ), Delete items (alert), Photo result.
- **Quà tặng**: Gift received (trên tab Tools), Top-up success theo Option 1 – Spotlight, thêm Option 2 – Receipt.
- Panel demo: thêm nhóm Tools → Hairstyle và Gallery → Queue & Library.

## 2026-11-27 — Khớp lại với Figma từng màn

- Generate video/image: feed (bỏ dòng category, nút Save/More), trạng thái thu gọn (Use this viền lime + nút lọc cạnh tiêu đề), lần đầu bấm Use This Style mở Guidelines ngay trên feed rồi vào Create; thẻ ảnh 152, nút + lime 48, Checking / Looks good (Change trắng) / No clear face (Change lime, viền đỏ); Making (thẻ 312×554, ngôi sao, toast Notify nằm trong thẻ); Result video/ảnh và Failed đúng kích thước; giá Try again 160 (video) / 100 (ảnh); giá template 100.
- More sheet: icon Messenger và chữ Other như Figma. Categories thêm Y2K Vibes.
- Profile: thẻ Credits Free/Pro đúng bố cục và chữ; Coin history đúng hàng 84, segmented control trắng.
- Bookmarks: ảnh bìa và số lượng như Figma, sheet Save to collection, sheet New collection (ô viền lime, nút xoá, dòng "… will be added"), collection trống, toast "Saved · Collections" ở dưới.
- Tab Video: khoảng cách giữa các hàng 40.

## 2026-11-27 — Icon theo Figma, bỏ Search ở tab bar

- Icon SF Symbols lấy trực tiếp từ Figma (tab bar, toolbar, settings bar, sheet, profile…). Icon nào Figma không có vẫn dùng Font Awesome.
- Tab bar chỉ còn 4 tab (Video · Photo · Tools · Gallery), bỏ nút Search, pill rộng 345 căn giữa như Figma.

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
