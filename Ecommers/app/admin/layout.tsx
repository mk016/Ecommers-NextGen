import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <Navbar />
        <main className="pt-20 px-6 pb-6">{children}</main>
      </div>
    </div>
  );
}
