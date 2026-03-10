"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Search,
    Upload,
    FileText,
    ShieldCheck,
    BarChart3,
    FileOutput,
    LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { id: "onboarding", name: "1. Entity Onboarding", icon: Search, href: "/onboarding" },
    { id: "upload", name: "2. Document Upload", icon: Upload, href: "/upload" },
    { id: "extraction", name: "3. AI Document Processing", icon: FileText, href: "/extraction" },
    { id: "review", name: "4. Review Data", icon: ShieldCheck, href: "/review" },
    { id: "analysis", name: "5. Risk Analysis", icon: BarChart3, href: "/analysis" },
    { id: "report", name: "6. Generate Report", icon: FileOutput, href: "/report" },
];

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-blue-500" />
                    <span>AltCredit AI</span>
                </h1>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold font-mono">
                    Vivriti Intelligence
                </p>
            </div>

            <nav className="flex-1 mt-6 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon size={20} className={cn(
                                "transition-colors",
                                isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                            )} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Signed in as</div>
                    <div className="text-sm font-semibold text-slate-100 truncate">Credit Analyst Admin</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
