// 口コミアシストのルーティング
//   /kuchikomi      … 店舗オーナー向け管理画面
//   /r/:storeId     … お客様向けアンケート（QRコードの遷移先）
import Admin from "./Admin";
import Survey from "./Survey";
import "./kuchikomi.css";

export function isKuchikomiPath(pathname) {
  return pathname.startsWith("/kuchikomi") || pathname.startsWith("/r/");
}

export default function KuchikomiApp() {
  const path = window.location.pathname;
  const m = path.match(/^\/r\/([^/]+)/);
  if (m) return <Survey storeId={decodeURIComponent(m[1])} />;
  return <Admin />;
}
