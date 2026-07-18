import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Products from "./components/products/Products";
import detector from "i18next-browser-languagedetector";


i18n
.use(detector)
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          Home: "Home",
          Login: "login",
          Register: "Register",
          Cart: "Cart",
          Categories: "Categories",
          Logout:"Logout",
          Products: "Products",
          Shop: "Shop",
          Contact_Us: "Contact Us",
          About:"About",
          Edit_Profile:"Edit Profile"
        },
      },
      ar: {
        translation: {
          Home: "الصفحة الرئيسية",
          Login: "تسجيل الدخول",
          Register: "إنشاء حساب",
          Cart: "السلة",
          Categories: "التصنيفات",
          Logout: 'تسجيل الخروج',
          Products:"المنتجات",
          Shop: "تسوق",
          Contact_Us: "تواصل معنا",
          About:"عنّا",
          Edit_Profile:"تعديل الملف الشخصي"
        },
      },
    },
     
    fallbackLng: "en",
  });


  export default i18n;