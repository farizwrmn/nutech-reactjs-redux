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
            style={{
              textAlign: 'center',
            }}
            limit={1}
            autoClose={800}
            closeButton={false}
            hideProgressBar
            className="sm:w-3/4 sm:max-w-[250px] sm:px-4 sm:py-2 sm:text-xs md:w-1/2 md:max-w-[300px] md:px-6 md:py-3 md:text-sm lg:w-1/3 lg:max-w-[400px] lg:px-8 lg:py-4 lg:text-base"
          />

        </StoreProvider>
      </body>
    </html>
  );
}
