"use client";

import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SplashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const duration = 20000; // 20 sec

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) return <>{children}</>;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48, color: "#fff" }} spin />}
      />
    </div>
  );
}