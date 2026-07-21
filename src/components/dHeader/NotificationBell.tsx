"use client";

import { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/api/pioneerxApi";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";

const NotificationBell = () => {
  const token = useAppSelector(selectToken);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [] } = useGetNotificationsQuery(undefined, {
    skip: !token,
    pollingInterval: 60_000,
  });
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const unread = notifications.filter((n) => !n.isRead);
  const unreadCount = unread.length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleTap = async (id: string, isRead: boolean) => {
    if (!isRead) {
      try {
        await markRead(id).unwrap();
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        title="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-9 h-9 bg-[#18191d] border border-[#2c2d32] rounded-md text-[#8a8a96] hover:bg-[#202126] hover:border-[#3c3d44] hover:text-white transition-all duration-150 cursor-pointer relative"
      >
        <IoNotificationsOutline size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#6c5ce7] text-white text-[9px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-72 sm:w-80 bg-[#14141c] border border-[#2c2d32] rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#2c2d32]">
            <span className="text-[13px] font-semibold text-white">
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllRead()}
                className="text-[11px] text-[#7c6ff7] hover:text-[#a78bfa]"
              >
                Mark all read
              </button>
            )}
          </div>

          <ul className="max-h-72 overflow-y-auto">
            {notifications.length === 0 && (
              <li className="px-3 py-6 text-center text-[12px] text-[#666]">
                No notifications yet
              </li>
            )}
            {notifications.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => handleTap(n.id, n.isRead)}
                  className={`w-full text-left px-3 py-2.5 border-b border-[#1e1e28] hover:bg-[#1a1a24] transition-colors ${
                    !n.isRead ? "bg-[#6c5ce7]/5" : ""
                  }`}
                >
                  <p
                    className={`text-[12px] leading-relaxed ${
                      !n.isRead ? "text-[#ddd]" : "text-[#888]"
                    }`}
                  >
                    {n.message}
                  </p>
                  <p className="text-[10px] text-[#555] mt-1 capitalize">
                    {String(n.type).replace(/_/g, " ")} ·{" "}
                    {new Date(n.createdAt).toLocaleDateString()}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
