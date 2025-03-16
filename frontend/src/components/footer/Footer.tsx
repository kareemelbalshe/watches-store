import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTheme } from "../../hooks/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`w-full fixed bottom-0 left-0 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center justify-center flex-col gap-2 text-lg md:text-2xl">
          <div className="flex items-center justify-center">
            © {new Date().getFullYear()} Watches Store by {" "}
            <a
              href="https://www.linkedin.com/in/kareemelbalshy/"
              target="_blank"
              className="text-amber-400 ml-2 font-bold underline"
            >
              Kareem Elbalshy
            </a>
          </div>
          
          <div className="flex items-center ml-4 gap-4">
            <p>links of seller</p>
            <a href="https://twitter.com/watches_store" target="_blank">
              <FaTwitter className="w-6 h-6 mr-2" />
            </a>
            <a href="https://www.facebook.com/watches.store" target="_blank">
              <FaFacebook className="w-6 h-6 mr-2" />
            </a>
            <a href="https://www.instagram.com/watches_store" target="_blank">
              <FaInstagram className="w-6 h-6 mr-2" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
