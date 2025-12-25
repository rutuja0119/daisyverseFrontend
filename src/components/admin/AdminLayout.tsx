import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-border px-4">
          <Link
            to="/admin"
            className={cn(
              "font-display font-semibold text-foreground transition-all",
              isSidebarOpen ? "text-xl" : "text-lg"
            )}
          >
            {isSidebarOpen ? (
              <>
                Daisy<span className="text-primary">Verse</span>
              </>
            ) : (
              <span className="text-primary">DV</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full text-left"
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-muted border-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-display text-sm font-semibold text-primary">
                  {admin?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <span className="font-body text-sm font-medium text-foreground hidden md:block">
                {admin?.name || 'Admin'}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
