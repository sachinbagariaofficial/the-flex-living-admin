import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Star,
  Settings,
  BarChart3,
  Menu,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";

// Defines the navigation items for the sidebar.

const navigationItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

//  * A simple component to display a heading and some text for each page.

const PageContent = ({ title }: { title: string }) => (
  <div className="p-8">
    <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
    <p className="mt-2 text-slate-600">
      This is the content for the {title} page.
    </p>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // This function determines what content to display based on the current page state.
  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "settings":
        return <PageContent title="Settings" />;

      default:
        return <div className="p-8">Page Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans antialiased text-slate-900 bg-slate-50/30">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 md:relative md:w-auto md:translate-x-0 transform -translate-x-full transition-transform duration-300 ease-in-out md:flex md:flex-col
          border-r border-slate-200/60 bg-slate-10/30 z-30 ${
            isSidebarOpen ? "translate-x-0 bg-white" : ""
          }`}
      >
        {/* Sidebar Header */}
        <div className="border-b border-slate-200/60 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg tracking-tight">Flex Living</h2>
              <p className="text-xs text-slate-500 font-medium">
                Review Management
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <nav className="p-4 flex-1 overflow-y-auto">
          {/* Management Group */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 py-3">
              Management
            </h3>
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <button
                    onClick={() => {
                      setCurrentPage(item.url);
                      setIsSidebarOpen(false);
                    }}
                    className={`group relative w-full text-left !p-0 hover:bg-slate-100 transition-colors duration-200 rounded-xl
                      ${
                        currentPage === item.url
                          ? "bg-slate-900 text-white shadow-lg hover:bg-slate-800"
                          : "text-slate-400 hover:text-slate-900"
                      }`}
                  >
                    <span className="flex items-center gap-3 px-4 py-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </span>
                    {currentPage === item.url && (
                      <div className="absolute right-0 w-1 h-6 bg-white rounded-l-full opacity-80" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Stats Group */}
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 py-3">
              Quick Stats
            </h3>
            <div className="px-3 space-y-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Avg Rating
                    </p>
                    <p className="text-lg font-bold">9.1</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Total Reviews
                    </p>
                    <p className="text-lg font-bold">4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-200/60 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">M</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Manager</p>
              <p className="text-xs text-slate-500">Property Management</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header for mobile */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-4 py-4 md:hidden sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Flex Living</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto">{renderPageContent()}</div>
      </main>
    </div>
  );
}
