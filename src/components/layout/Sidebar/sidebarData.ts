export interface SidebarItem {
  label: string;
  icon: string;
  href: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "CUSTOMERS",
    items: [
      { label: "Users", icon: "user-friends", href: "/users" },
      { label: "Guarantors", icon: "users", href: "/guarantors" },
      { label: "Loans", icon: "sack", href: "/loans" },
      { label: "Decision Models", icon: "handshake", href: "/decision-models" },
      { label: "Savings", icon: "piggy-bank", href: "/savings" },
      { label: "Loan Requests", icon: "loan-request", href: "/loan-requests" },
      { label: "Whitelist", icon: "user-check", href: "/whitelist" },
      { label: "Karma", icon: "user-times", href: "/karma" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { label: "Organization", icon: "briefcase", href: "/organization" },
      { label: "Loan Products", icon: "loan-request", href: "/loan-products" },
      { label: "Savings Products", icon: "bank", href: "/savings-products" },
      { label: "Fees and Charges", icon: "coins", href: "/fees-and-charges" },
      { label: "Transactions", icon: "transactions", href: "/transactions" },
      { label: "Services", icon: "galaxy", href: "/services" },
      { label: "Service Account", icon: "user-cog", href: "/service-account" },
      { label: "Settlements", icon: "scroll", href: "/settlements" },
      { label: "Reports", icon: "chart-bar", href: "/reports" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Preferences", icon: "sliders", href: "/preferences" },
      { label: "Fees and Pricing", icon: "badge-percent", href: "/fees-and-pricing" },
      { label: "Audit Logs", icon: "clipboard-list", href: "/audit-logs" },
      { label: "Systems Messages", icon: "tire", href: "/systems-messages" },
    ],
  },
];

// TODO: switch organization could toggle between organiations and maybe affect the table as a filter?
// export as csv for the table?
// hide scroll bar on sidebar ? or make it only show on scroll or hover
// tanstack prefetch on haver view details with abort signals where neccessary, and skeleton loaders
// put meridian time in date joined
