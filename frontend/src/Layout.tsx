import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { ThemeProvider } from "./hooks/ThemeContext";
import Footer from "./components/footer/Footer";

export default function Layout() {
  return (
    <>
      {" "}
      <ThemeProvider>
        <div className="w-full">
          <Header />
          <div className="mt-[100px] min-h-[calc(100vh-100px)]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
