"use client";

import React, { useState, useEffect } from "react";
import {
    FileText,
    Download,
    Share2,
    Printer,
    ChevronRight,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    CheckCircle2,
    ArrowLeft,
    Loader2,
    FileOutput
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ReportPage() {
    const router = useRouter();
    const [report, setReport] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch for report
        const timer = setTimeout(() => {
            setReport(`
# INVESTMENT CREDIT REPORT: ACME CORP INDIA PVT LTD
**Date:** 2024-03-10
**Classification:** Internal / Confidential

## 1. Executive Summary
Acme Corp India Pvt Ltd is a growth-stage enterprise in the manufacturing sector. The current credit assessment indicates a **72/100** financial health score. Based on the analysis of Asset Liability Management and Annual Reports, the entity demonstrates stable operations with a recommendation for **Approved**.

## 2. Financial Analysis
- **Revenue Performance:** Average revenue recorded at 450.5 Cr.
- **Profitability:** Net profit margin is approximately 7.8%.
- **Liquidity:** Current assets of 1200.0 Cr against liabilities of 800.0 Cr.
- **Debt Profile:** Total debt standing at 250.0 Cr with a leverage of 0.21.

## 3. SWOT Analysis
### Strengths
- Strong asset backing relative to industry peers.
- Positive cash flow from operations.
### Weaknesses
- Tight interest coverage during expansion phases.
### Opportunities
- Significant upside from South East Asia expansion signals.
### Threats
- Potential regulatory headwinds in environmental compliance.

## 4. Market & Sector Insights
The sector is currently experiencing moderate growth (4.2% YoY). The company is positioned well despite local raw material volatility.
      `);
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const downloadReport = () => {
        const element = document.createElement("a");
        const file = new Blob([report || ""], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "Credit_Report_Acme_Corp.txt";
        document.body.appendChild(element);
        element.click();
    };

    if (isLoading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin" />
                    <FileOutput className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={32} />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Synthesizing Report...</h2>
                    <p className="text-slate-400 mt-2">LLM is aggregating financial data and risk signals into a final document.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white">Final Investment Report</h1>
                    <p className="text-slate-400 mt-2">Review and export the AI-generated credit underwriting report.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={downloadReport}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                    >
                        <Download size={16} />
                        Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40">
                        <Share2 size={16} />
                        Share Report
                    </button>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
                {/* Report Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-10 border-b border-slate-800">
                    <div className="flex justify-between items-start">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tight leading-none">AltCredit AI</h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Intelligence Platform</p>
                                </div>
                            </div>
                            <div className="pt-4">
                                <h3 className="text-4xl font-bold text-white">Credit Underwriting Verdict</h3>
                                <div className="flex items-center gap-4 mt-4">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Recommended</span>
                                    <span className="text-slate-500 text-sm">Case #CR-2024-1029</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-slate-500 text-xs font-bold uppercase">Prepared For</p>
                            <p className="text-white font-bold text-lg">Senior Credit Committee</p>
                            <p className="text-slate-400 text-sm">Vivriti Finance Corporate Banking</p>
                        </div>
                    </div>
                </div>

                {/* Report Body */}
                <div className="p-12 prose prose-invert max-w-none">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Table of Contents / Quick Links */}
                        <div className="lg:col-span-1 space-y-6">
                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Contents</h4>
                            <nav className="space-y-4">
                                <button className="block text-sm font-semibold text-blue-400 transition-colors hover:text-white">1. Executive Summary</button>
                                <button className="block text-sm font-semibold text-slate-400 transition-colors hover:text-white">2. Financial Analysis</button>
                                <button className="block text-sm font-semibold text-slate-400 transition-colors hover:text-white">3. SWOT Analysis</button>
                                <button className="block text-sm font-semibold text-slate-400 transition-colors hover:text-white">4. Market Insights</button>
                                <button className="block text-sm font-semibold text-slate-400 transition-colors hover:text-white">5. Final Recommendation</button>
                            </nav>

                            <div className="mt-12 bg-slate-950/50 rounded-2xl p-6 border border-slate-800">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Risk Heatmap</p>
                                <div className="grid grid-cols-3 gap-2 h-20">
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md" />
                                    <div className="bg-emerald-500/40 border border-emerald-500/50 rounded-md" />
                                    <div className="bg-amber-500/20 border border-amber-500/20 rounded-md" />
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md" />
                                    <div className="bg-red-500/20 border border-red-500/20 rounded-md" />
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md" />
                                </div>
                                <p className="text-[10px] text-slate-600 mt-4 leading-normal">Visual representation of weighted risk vectors across documents.</p>
                            </div>
                        </div>

                        {/* Markdown Viewer */}
                        <div className="lg:col-span-3 bg-white/5 rounded-2xl p-10 font-serif leading-relaxed text-slate-300">
                            {report?.split('\n').map((line, i) => {
                                if (line.startsWith('# ')) return <h2 key={i} className="text-3xl font-bold text-white mt-0 mb-8 border-b border-slate-800 pb-6 font-sans">{line.replace('# ', '')}</h2>;
                                if (line.startsWith('## ')) return <h3 key={i} className="text-xl font-bold text-blue-400 mt-10 mb-4 font-sans uppercase tracking-wide">{line.replace('## ', '')}</h3>;
                                if (line.startsWith('### ')) return <h4 key={i} className="text-lg font-bold text-white mt-6 mb-2 font-sans">{line.replace('### ', '')}</h4>;
                                if (line.startsWith('**')) return <p key={i} className="my-2"><strong className="text-white">{line.replace(/\*\*/g, '')}</strong></p>;
                                if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-2">{line.replace('- ', '')}</li>;
                                return <p key={i} className="mb-4">{line}</p>;
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="bg-slate-950/50 p-10 border-t border-slate-800 flex justify-between items-center mt-0">
                    <div className="flex items-center gap-4 text-slate-500">
                        <BarChart3 size={20} />
                        <div className="text-xs font-medium">
                            Certified by AltCredit AI Model v1.4.2<br />
                            Integrity Hash: 8b29f0...92a1
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/")}
                        className="text-sm font-bold text-blue-400 hover:text-white transition-colors"
                    >
                        Finish Process & Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
