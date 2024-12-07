import StoreProvider from "@/components/layout/storeProvider";
import "./globals.css";

export const metadata = {
  title: "SIMS PPOB-Fariz",
  description: "Reactjs + Reduxjs",
};

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
