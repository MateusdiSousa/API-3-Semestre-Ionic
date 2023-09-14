import { Link, useLocation } from "react-router-dom";
import { LayoutList, Network, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "../lib/utils";
import { ModeToggle } from "./mode-toggle";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Processos",
    icon: LayoutList,
    href: "/processos",
    color: "text-violet-500",
  },
  {
    label: "Equipes",
    icon: Network,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = useLocation();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link to={'/dashboard'} className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <img src="./logo.svg" />
          </div>
          <h1 className={'text-2xl font-bold'}>
            BERMUDA
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              to={route.href}
              key={route.href}
              className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathname.pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400')}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <ModeToggle />
      </div>
    </div>
  )
}