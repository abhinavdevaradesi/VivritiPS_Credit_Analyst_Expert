"use client";

import React from "react";
import {
    ShieldCheck,
    Table as TableIcon,
    Download,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

const confirmedData = [
    { metric: "Total Revenue / Turnover", value: "450.50", period: "FY 2023-24", source: "Annual Report" },
    { metric: "Net Profit After Tax", value: "35.20", period: "FY 2023-24", source: "P&L Statement" },
    { metric: "Total Assets", value: "1,200.00", period: "Current", source: "Balance Sheet" },
    { metric: "Total Liabilities", value: "800.00", period: "Current", source: "Balance Sheet" },
    { metric: "Gross Debt / Borrowings", value: "250.00", period: "Current", source: "Borrowing Profile" },
    { metric: "Operating Cash Flow", value: "42.10", period: "FY 2023-24", source: "Cashflow Statement" },
];

export default function ReviewPage() {
    const router = useRouter();

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white">Review Confirmed Data</h1>
                    <p className="text-slate-400 mt-2">Verified financial metrics aggregated from all processed documents.</p>
                </div>
                <button
                    onClick={() => router.push("/extraction")}
                    className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Back to Extraction
                </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <TableIcon className="text-blue-500" size={18} />
                        Aggregated Financial Statement
                    </h3>
                    <button className="text-xs font-bold text-blue-400 hover:text-white uppercase tracking-widest transition-colors">
                        Export to Excel
                    </button>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/30">
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest pl-8">Metric Name</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Value (INR Cr.)</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Reporting Period</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest pr-8 text-right">Primary Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {confirmedData.map((row, i) => (
                            <tr key={i} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors group">
                                <td className="p-4 text-sm font-medium text-slate-200 pl-8">{row.metric}</td>
                                <td className="p-4 text-sm font-black text-white">{row.value}</td>
                                <td className="p-4 text-sm text-slate-400">{row.period}</td>
                                <td className="p-4 text-sm text-slate-500 pr-8 text-right italic group-hover:text-slate-300 transition-colors">{row.source}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-10 bg-blue-600/5 flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg">Data Integrity Confirmed</h4>
                        <p className="text-slate-400 text-sm max-w-md mt-1">
                            All mandatory financial fields have been extracted and verified by the credit analyst.
                            The system is now ready to perform automated risk scoring.
                        </p>
                    </div>
                    <button
                        onClick={() => router.push("/analysis")}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2"
                    >
                        Proceed to Risk Analysis
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
