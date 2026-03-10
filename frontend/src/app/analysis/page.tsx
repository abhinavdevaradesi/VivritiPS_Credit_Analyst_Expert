"use client";

import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import {
    ShieldCheck,
    TrendingUp,
    AlertTriangle,
    Info,
    ChevronRight,
    Newspaper,
    Globe,
    Scale,
    Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const mockFinancialData = [
    { name: "Revenue", value: 450.5, unit: "Cr." },
    { name: "Profit", value: 35.2, unit: "Cr." },
    { name: "Debt", value: 250.0, unit: "Cr." },
    { name: "Assets", value: 1200.0, unit: "Cr." },
];

const mockSignals = [
    { type: "news", sentiment: "positive", title: "Expansion into SE Asia confirmed", source: "Market Watch" },
    { type: "sector", sentiment: "neutral", title: "Manufacturing growth at 4.2% YoY", source: "Gov Statistics" },
    { type: "legal", sentiment: "negative", title: "New environmental compliance audit pending", source: "Gazette" },
];

export default function AnalysisPage() {
    const router = useRouter();
    const [score, setScore] = useState(72); // out of 100

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-white">Credit Risk Intelligence</h1>
                <p className="text-slate-400 mt-2">Quantitative and qualitative risk assessment for "Acme Corp India Pvt Ltd".</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Score & Recommendation */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />

                        <h3 className="text-lg font-semibold text-slate-400 mb-6">Aggregate Health Score</h3>

                        <div className="relative w-48 h-48 mb-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-slate-800"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88 * (1 - score / 100)}
                                    className={cn(
                                        "transition-all duration-1000",
                                        score > 70 ? "text-emerald-500" : score > 40 ? "text-amber-500" : "text-red-500"
                                    )}
                                />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 flex flex-col items-center">
                                <span className="text-5xl font-black text-white">{score}</span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Strong</span>
                            </div>
                        </div>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 text-emerald-500 font-bold text-sm mb-6 flex items-center gap-2">
                            <ShieldCheck size={16} />
                            Recommended for Approval
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed italic">
                            "Company shows robust asset base and positive revenue growth, offset slightly by high upcoming debt obligations."
                        </p>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-6">Key Risk Indicators</h3>
                        <div className="space-y-4">
                            <IndicatorItem
                                label="Leverage Ratio"
                                value="0.21"
                                status="positive"
                                desc="Below industry average of 0.45"
                            />
                            <IndicatorItem
                                label="Interest Coverage"
                                value="12.4x"
                                status="positive"
                                desc="Exceeds safety threshold of 4x"
                            />
                            <IndicatorItem
                                label="Revenue Growth"
                                value="+8.2%"
                                status="neutral"
                                desc="Stable growth in competitive sector"
                            />
                            <IndicatorItem
                                label="Debt/Equity"
                                value="1.8"
                                status="negative"
                                desc="Short-term borrowing increased by 15%"
                            />
                        </div>
                    </div>
                </div>

                {/* Financial Charts & Secondary Research */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <TrendingUp className="text-blue-500" size={22} />
                                Financial Profile (INR Cr.)
                            </h3>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockFinancialData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px" }}
                                        itemStyle={{ color: "#fff" }}
                                    />
                                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                <Globe className="text-purple-500" size={18} />
                                Secondary Signals
                            </h3>
                            <div className="space-y-4">
                                {mockSignals.map((sig, i) => (
                                    <div key={i} className="flex gap-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                            sig.sentiment === "positive" ? "bg-emerald-500/20 text-emerald-500" :
                                                sig.sentiment === "negative" ? "bg-red-500/20 text-red-500" : "bg-slate-800 text-slate-400"
                                        )}>
                                            {sig.type === "news" ? <Newspaper size={16} /> :
                                                sig.type === "sector" ? <Activity size={16} /> : <Scale size={16} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-200 leading-tight">{sig.title}</p>
                                            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{sig.source}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
                            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                                <AlertTriangle className="text-amber-500" size={18} />
                                Sector Health
                            </h3>
                            <div className="flex-1 flex flex-col items-center justify-center pb-4">
                                <div className="text-4xl font-black text-amber-500">68%</div>
                                <p className="text-sm text-slate-400 mt-2">Moderate Industry Risk</p>
                                <div className="w-full h-2 bg-slate-800 rounded-full mt-6 overflow-hidden">
                                    <div className="h-full bg-amber-500 w-[68%]" />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-800">
                                <p className="text-xs text-slate-500">
                                    Sector: <strong>Manufacturing (Chemicals)</strong>. Analysis reveals global raw material price volatility as a primary headwind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pb-10">
                <button
                    onClick={() => router.push("/report")}
                    className="flex items-center gap-3 px-10 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-95 group"
                >
                    Generate Final Investment Report
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}

function IndicatorItem({ label, value, status, desc }: {
    label: string,
    value: string,
    status: "positive" | "negative" | "neutral",
    desc: string
}) {
    return (
        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
            <div className={cn(
                "mt-1 w-2 h-2 rounded-full",
                status === "positive" ? "bg-emerald-500" : status === "negative" ? "bg-red-500" : "bg-amber-500"
            )} />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-300">{label}</span>
                    <span className={cn(
                        "text-sm font-bold",
                        status === "positive" ? "text-emerald-500" : status === "negative" ? "text-red-500" : "text-amber-500"
                    )}>{value}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
            </div>
        </div>
    );
}
