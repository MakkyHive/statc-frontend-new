// src/lib/notify.js

export function notify(message, type = "info") {
  switch (type) {
    case "success":
      alert("✅ Success: " + message);
      break;
    case "error":
      alert("❌ Error: " + message);
      break;
    case "info":
    default:
      alert("ℹ️ Info: " + message);
      break;
  }
}
