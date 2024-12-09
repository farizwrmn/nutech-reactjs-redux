import StoreProvider from "@/components/layout/storeProvider";
import "./globals.css";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer
            position="top-center"
            theme="colored"
            toastStyle={{
              borderRadius: '20px',
            }}
            style={{ textAlign: 'center' }}
            limit={1}
            autoClose={800}
            closeButton={false}
            hideProgressBar
          />
        </StoreProvider>
      </body>
    </html>
  );
}
