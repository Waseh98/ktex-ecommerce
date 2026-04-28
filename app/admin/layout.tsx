export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages use their own sidebar/header — no website Header/Footer
  return <>{children}</>;
}
