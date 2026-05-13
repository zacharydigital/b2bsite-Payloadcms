import config from "@payload-config";
import "@payloadcms/ui/scss/app.scss";
import { RootLayout } from "@payloadcms/next/layouts";
import type { ReactNode } from "react";
import { importMap } from "./importMap.js";
import { serverFunction } from "./serverFunction";

type Props = {
  children: ReactNode;
};

export { metadata } from "@payloadcms/next/layouts";

export default function Layout({ children }: Props) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
