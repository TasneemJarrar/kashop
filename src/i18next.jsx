import i18n from "i18next";
import { initReactI18next } from "react-i18next";
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
          Shopping_Bag: "Shopping Bag",
          Categories: "Categories",
          Logout: "Logout",
          Products: "Products",
          Shop: "Shop",
          Contact_Us: "Contact Us",
          About: "About",
          Edit_Profile: "Edit Profile",
          NEW_COLLECTION_2026: "NEW COLLECTION 2026",
          Order_Summary: "Order Summary",
          Proceed_to_checkout: "Proceed to checkout",
          continue_shopping: "Continue shopping",
          Clear_Cart: "Clear Cart",
          Remove: "Remove",
          Subtotal: "Subtotal",
          Total: "Total",
          Free_Delivery: "Delivery Free",
          Free: "Free",
          DISCOUNT_CODE: 'DISCOUNT CODE',
          Apply: "Apply",
          Grand_Total: "Grand Total",
          Including_VAT: "Including VAT",
          Secure_Encrypted_Checkout: "Secure Encrypted Checkout",


        },
      },
      ar: {
        translation: {
          Home: "الصفحة الرئيسية",
          Login: "تسجيل الدخول",
          Register: "إنشاء حساب",
          Cart: "السلة",
          Shopping_Bag: "حقيبة المشتريات",
          Categories: "التصنيفات",
          Logout: 'تسجيل الخروج',
          Products: "المنتجات",
          Shop: "تسوق",
          Contact_Us: "تواصل معنا",
          About: "عنّا",
          Edit_Profile: "تعديل الملف الشخصي",
          NEW_COLLECTION_2026: "التشكيلة الجديدة 2026",
          Order_Summary: "ملخص الطلب",
          Proceed_to_checkout: "إتمام الشراء",
          continue_shopping: "متابعة التسوق",
          Clear_Cart: "إفراغ السلة",
          Remove: "إزالة",
          Subtotal: "المجموع الفرعي",
          Total: "الإجمالي",
          Free_Delivery: "التوصيل المجاني",
          Free: "مجاني",
          DISCOUNT_CODE: "كود الخصم",
          Apply: "تطبيق",
          Grand_Total: "الإجمالي الكلي",
          Including_VAT: "شامل ضريبة القيمة المضافة",
          Secure_Encrypted_Checkout: "إتمام الدفع الآمن والمشفّر",



        },
      },
    },

    fallbackLng: "en",
  });


export default i18n;