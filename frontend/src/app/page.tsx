"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Upload,
  FileText,
  ShieldCheck,
  BarChart3,
  FileOutput,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { name: "Active Analysis", value: "12", icon: TrendingUp, color: "text-blue-500" },
  { name: "Pending Documents", value: "3", icon: AlertCircle, color: "text-amber-500" },
  { name: "Reports Generated", value: "48", icon: FileOutput, color: "text-emerald-500" },
];

const steps = [
  { id: 1, name: "Onboarding", icon: Search, desc: "Entity & Loan Details", href: "/onboarding", status: "complete" },
  { id: 2, name: "Upload", icon: Upload, desc: "Financial Documents", href: "/upload", status: "current" },
  { id: 3, name: "AI Extraction", icon: FileText, desc: "Structural Extraction", href: "/extraction", status: "pending" },
  { id: 4, name: "Review", icon: ShieldCheck, desc: "Human confirmation", href: "/review", status: "pending" },
  { id: 5, name: "Risk Analysis", icon: BarChart3, desc: "Credit Scoring", href: "/analysis", status: "pending" },
];

export default function DashboardHome() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Credit Underwriting Dashboard</h1>
        <p className="text-slate-400 mt-2">Welcome back. Here is an overview of your current credit assessment pipeline.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className={stat.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Assessment Pipeline</h2>
        <div className="grid grid-cols-5 gap-4">
          {steps.map((step) => (
            <Link
              href={step.href}
              key={step.id}
              className={cn(
                "group relative p-6 rounded-2xl border transition-all duration-300",
                step.status === "complete" ? "bg-emerald-500/10 border-emerald-500/20" :
                  step.status === "current" ? "bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-900/10" :
                    "bg-slate-900/50 border-slate-800 opacity-60 hover:opacity-100"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors",
                step.status === "complete" ? "bg-emerald-500 text-white" :
                  step.status === "current" ? "bg-blue-600 text-white" :
                    "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
              )}>
                <step.icon size={20} />
              </div>
              <h3 className="font-semibold text-white">{step.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{step.desc}</p>

              {step.status === "complete" && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Continue Assessment</h2>
          <p className="text-blue-100 mb-6">You have an active underwriting application for "Techflow Solutions Ltd" awaiting document upload.</p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            Go to Document Upload
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none">
          <Upload size={240} className="text-white -mr-20 -mt-20" />
        </div>
      </div>
    </div>
  );
}

// Minimal CheckCircle2 since it wasn't in original Lucide imports for this file
function CheckCircle2({ size, className }: { size: number, className: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
