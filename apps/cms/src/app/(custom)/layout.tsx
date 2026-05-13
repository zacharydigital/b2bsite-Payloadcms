import type { ReactNode } from "react";
import "./cms-login.css";

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "TitanLaser CMS Login",
  description: "TitanLaser CMS sign-in page"
};

export default function CustomLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
