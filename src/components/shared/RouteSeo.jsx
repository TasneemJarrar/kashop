import { useMatches } from "react-router";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function RouteSeo() {
  const matches = useMatches();
  const { t, i18n } = useTranslation();

  const current = [...matches].reverse().find((m) => m.handle?.seoKey);
  if (!current) return null;

  const { seoKey } = current.handle;
  const title = t(`seo.${seoKey}.title`);
  const description = t(`seo.${seoKey}.description`);

  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.dir()} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={i18n.language === "ar" ? "ar_AR" : "en_US"} />
    </Helmet>
  );
}