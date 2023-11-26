import { ReactNode } from "react";

import ThemeRegistry from "@/components/theme-registry/ThemeRegistry";

import { Header } from "@/components/header";

export const metadata = {
  title: "Acompanhe suas Entregas em Tempo Real",
  description:
    "Monitore sua entrega e saiba exatamente quando seu pedido será entregue!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />

          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
