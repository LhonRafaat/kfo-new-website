import { NavbarMenu } from "@/components/NavbarMenu";
import { getGlobal } from "@/lib/strapi";

/**
 * Site header. A server component so both menus come straight from Strapi's
 * `global` single type — every page renders `<Navbar />` and gets whatever the
 * admin panel currently holds. The interactive half is `NavbarMenu`.
 */
export async function Navbar({
  variant = "overlay",
  backHref,
}: {
  variant?: "overlay" | "solid";
  /** Renders a back arrow to the left of the lockup (location detail pages). */
  backHref?: string;
}) {
  const site = await getGlobal();

  return (
    <NavbarMenu
      variant={variant}
      backHref={backHref}
      siteName={site.siteName}
      primaryNav={site.primaryNav}
      secondaryNav={site.secondaryNav}
    />
  );
}
