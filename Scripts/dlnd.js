const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var dlnd = {
  is_sandbox: !1,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2025-09-02T00:00:00Z",
  purchase_date: "2025-09-02T00:00:00Z",
  store: "app_store"
};

var dlnd_subscription = {
  grace_period_expires_date: null,
  purchase_date: "2025-09-02T00:00:00Z",
  product_identifier: "com.dlnd.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  s
    ? (dlnd_subscription.product_identifier = s,
       obj.subscriber.subscriptions[s] = dlnd)
    : obj.subscriber.subscriptions["com.dlnd.premium.yearly"] = dlnd;
  obj.subscriber.entitlements[e] = dlnd_subscription;
} else {
  obj.subscriber.subscriptions["com.dlnd.premium.yearly"] = dlnd;
  obj.subscriber.entitlements.pro = dlnd_subscription;
}


$done({ body: JSON.stringify(obj) });



