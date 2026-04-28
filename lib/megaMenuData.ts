export interface SubCategory {
  label: string;
  slug: string;
}

export interface Category {
  label: string;
  slug: string;
  subcategories?: SubCategory[];
}

export interface NavItem {
  label: string;
  slug?: string;
  type: "mega" | "link" | "dropdown";
  categories?: Category[];
  links?: { label: string; href: string }[];
}

export const megaMenuData: NavItem[] = [
  {
    label: "MENS",
    type: "mega",
    categories: [
      { label: "New Arrivals", slug: "new-arrivals" },
      { label: "Shop All", slug: "mens" },
      {
        label: "Shirts",
        slug: "mens-shirts",
        subcategories: [
          { label: "Checks", slug: "checks-shirts" },
          { label: "Striped", slug: "striped-shirts" },
          { label: "Printed", slug: "printed-shirts" },
          { label: "Linen", slug: "linen-shirts" },
          { label: "Formal", slug: "formal-shirts" },
          { label: "Casual", slug: "casual-shirts" },
          { label: "Plain", slug: "plain-shirts" },
          { label: "Oxford", slug: "oxford-shirts" },
          { label: "Full Sleeve Shirts", slug: "full-sleeve-shirts" },
          { label: "Half Sleeve Shirts", slug: "half-sleeve-shirts" },
          { label: "Sale", slug: "shirts-sale" },
        ],
      },
      {
        label: "T-Shirts",
        slug: "mens-tshirts",
        subcategories: [
          { label: "Half Sleeves", slug: "half-sleeve-tshirts" },
          { label: "Long Sleeves", slug: "long-sleeve-tshirts" },
          { label: "Graphics", slug: "graphic-tshirts" },
          { label: "Basic", slug: "basic-tshirts" },
          { label: "Oversized", slug: "oversized-tshirts" },
        ],
      },
      {
        label: "Polos",
        slug: "mens-polos",
        subcategories: [
          { label: "Basic", slug: "basic-polos" },
          { label: "Printed", slug: "printed-polos" },
          { label: "Full Sleeves", slug: "full-sleeve-polos" },
        ],
      },
      {
        label: "Trousers",
        slug: "mens-trousers",
        subcategories: [
          { label: "Dress Pants", slug: "dress-pants" },
          { label: "Chino", slug: "chino-trousers" },
          { label: "Denim", slug: "denim-trousers" },
          { label: "Pajamas", slug: "pajama-trousers" },
        ],
      },
      {
        label: "Blazers",
        slug: "mens-blazers",
        subcategories: [
          { label: "Formal Blazers", slug: "formal-blazers" },
          { label: "Casual Blazers", slug: "casual-blazers" },
          { label: "Linen Blazers", slug: "linen-blazers" },
        ],
      },
      {
        label: "Jackets",
        slug: "mens-jackets",
        subcategories: [
          { label: "Bomber", slug: "bomber-jackets" },
          { label: "Puffer", slug: "puffer-jackets" },
          { label: "Quilted", slug: "quilted-jackets" },
          { label: "Sleeveless", slug: "sleeveless-jackets" },
          { label: "Full Sleeves", slug: "full-sleeve-jackets" },
          { label: "Long Coats", slug: "long-coats" },
        ],
      },
      {
        label: "Sweaters",
        slug: "mens-sweaters",
        subcategories: [
          { label: "Full Sleeves", slug: "full-sleeve-sweaters" },
          { label: "Sleeveless", slug: "sleeveless-sweaters" },
          { label: "V-Neck", slug: "vneck-sweaters" },
          { label: "Zipper", slug: "zipper-sweaters" },
          { label: "Sweatshirts", slug: "mens-sweatshirts" },
          { label: "Cardigans", slug: "cardigans" },
          { label: "Crew Neck", slug: "crew-neck-sweaters" },
        ],
      },
      {
        label: "Sweatshirts & Hoodies",
        slug: "sweatshirts-hoodies",
        subcategories: [
          { label: "Sweatshirts", slug: "sweatshirts" },
          { label: "Hoodies", slug: "hoodies" },
        ],
      },
      { label: "Tracksuits", slug: "mens-tracksuits" },
      { label: "Waistcoats", slug: "mens-waistcoats" },
      {
        label: "Shalwar Kameez",
        slug: "mens-shalwar-kameez",
        subcategories: [
          { label: "Cotton", slug: "cotton-shalwar-kameez" },
          { label: "Wash & Wear", slug: "wash-wear-shalwar-kameez" },
        ],
      },
      {
        label: "Accessories",
        slug: "mens-accessories",
        subcategories: [
          { label: "Socks", slug: "socks" },
          { label: "Caps", slug: "caps" },
          { label: "Vests", slug: "vests" },
        ],
      },
      { label: "Overshirts", slug: "overshirts" },
      { label: "Loungewear", slug: "loungewear" },
      { label: "SALE", slug: "sale" },
    ],
  },
  {
    label: "JUNIOR",
    type: "mega",
    categories: [
      { label: "New Arrivals", slug: "junior-new-arrivals" },
      { label: "Shop All", slug: "junior" },
      {
        label: "Shirts",
        slug: "junior-shirts",
        subcategories: [
          { label: "Full Sleeve", slug: "junior-full-sleeve-shirts" },
          { label: "Half Sleeve", slug: "junior-half-sleeve-shirts" },
        ],
      },
      { label: "Polos", slug: "junior-polos" },
      { label: "T-Shirts", slug: "junior-tshirts" },
      { label: "Blazers", slug: "junior-blazers" },
      { label: "Hoodies", slug: "junior-hoodies" },
      {
        label: "Jackets",
        slug: "junior-jackets",
        subcategories: [
          { label: "Bomber", slug: "junior-bomber-jackets" },
          { label: "Puffer", slug: "junior-puffer-jackets" },
          { label: "Quilted", slug: "junior-quilted-jackets" },
          { label: "Full Sleeve", slug: "junior-full-sleeve-jackets" },
          { label: "Sleeveless", slug: "junior-sleeveless-jackets" },
        ],
      },
      {
        label: "Sweaters",
        slug: "junior-sweaters",
        subcategories: [
          { label: "Full Sleeve", slug: "junior-full-sleeve-sweaters" },
          { label: "Sleeveless", slug: "junior-sleeveless-sweaters" },
          { label: "Sweatshirts", slug: "junior-sweatshirts" },
          { label: "Hoodies", slug: "junior-sweater-hoodies" },
        ],
      },
      { label: "Tracksuits", slug: "junior-tracksuits" },
      {
        label: "Trousers",
        slug: "junior-trousers",
        subcategories: [
          { label: "Cotton", slug: "junior-cotton-trousers" },
          { label: "Shorts", slug: "junior-shorts" },
          { label: "Denim", slug: "junior-denim" },
          { label: "Pajama", slug: "junior-pajama" },
        ],
      },
      { label: "Waistcoats", slug: "junior-waistcoats" },
      { label: "Pajama Set", slug: "junior-pajama-set" },
      { label: "SALE", slug: "sale" },
    ],
  },
  {
    label: "SALE",
    type: "link",
    slug: "sale",
  },
  {
    label: "MORE",
    type: "dropdown",
    links: [
      { label: "Track Order", href: "/track-order" },
      { label: "Our Stores", href: "/stores" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Reviews", href: "/reviews" },
      { label: "Corporate Orders", href: "/corporate-orders" },
    ],
  },
];

// Helper: get all category slugs for generating routes
export function getAllCategorySlugs(): string[] {
  const slugs: string[] = [];
  megaMenuData.forEach((nav) => {
    if (nav.categories) {
      nav.categories.forEach((cat) => {
        slugs.push(cat.slug);
        cat.subcategories?.forEach((sub) => slugs.push(sub.slug));
      });
    }
  });
  return [...new Set(slugs)];
}

// Helper: find a category label by slug
export function getCategoryLabel(slug: string): string {
  for (const nav of megaMenuData) {
    if (nav.categories) {
      for (const cat of nav.categories) {
        if (cat.slug === slug) return cat.label;
        if (cat.subcategories) {
          for (const sub of cat.subcategories) {
            if (sub.slug === slug) return sub.label;
          }
        }
      }
    }
  }
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Helper: find parent category for breadcrumbs
export function getCategoryBreadcrumb(slug: string): { parent?: { label: string; slug: string }; grandparent?: { label: string } } {
  for (const nav of megaMenuData) {
    if (nav.categories) {
      for (const cat of nav.categories) {
        if (cat.slug === slug) {
          return { grandparent: { label: nav.label } };
        }
        if (cat.subcategories) {
          for (const sub of cat.subcategories) {
            if (sub.slug === slug) {
              return {
                parent: { label: cat.label, slug: cat.slug },
                grandparent: { label: nav.label },
              };
            }
          }
        }
      }
    }
  }
  return {};
}
