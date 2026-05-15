import { NOTIFICATION_POSITIONS } from "./Notifications.constants";
function buildNotificationContainerClasses(position, className) {
  return [
    "w3f-notification-container",
    NOTIFICATION_POSITIONS[position] || NOTIFICATION_POSITIONS["top-right"],
    className
  ].filter(Boolean).join(" ");
}
function generateNotificationId() {
  return Date.now() + Math.random();
}
function buildNotificationClasses(type, isExiting, className) {
  return [
    "w3f-notification",
    `w3f-notification--${type}`,
    isExiting && "w3f-notification--exit",
    className
  ].filter(Boolean).join(" ");
}
export {
  buildNotificationClasses,
  buildNotificationContainerClasses,
  generateNotificationId
};
//# sourceMappingURL=Notifications.utils.js.map
