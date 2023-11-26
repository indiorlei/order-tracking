import Image from "next/image";

import { AppBar, Toolbar } from "@mui/material";

export function Header() {
  return (
    <AppBar position="fixed" sx={{ display: "flex" }}>
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <Image
          src="/logo.svg"
          alt="acompanhar entrega"
          width={90}
          height={90}
        />
      </Toolbar>
    </AppBar>
  );
}
