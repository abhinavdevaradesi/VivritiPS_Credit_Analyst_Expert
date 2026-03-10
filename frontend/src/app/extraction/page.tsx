"use client";

import React, { useState, useEffect } from "react";
import {
    FileText,
    Play,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ChevronRight,
    Edit2,
    Save,
    Search,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Document {
    id: number;
    filename: string;
    category: string;
    status: "uploaded" | "processing" | "reviewed" | "error";
    upload_date: string;
}

interface FinancialData {
    revenue: number;
    profit: number;
    total_assets: number;
    total_liabilities: number;
    debt: number;
    cashflow: number;
}

export default function ExtractionPage() {
    const router = useRouter();
    const [documents, setDocuments] = useState<Document[]>([
        { id: 101, filename: "ALM_Report_Q4.pdf", category: "ALM", status: "uploaded", upload_date: "2024-03-10" },
        { id: 102, filename: "Ownership_Structure.xlsx", category: "Shareholding", status: "uploaded", upload_date: "2024-03-10" },
        { id: 103, filename: "Borrowing_Details.pdf", category: "Borrowing", status: "uploaded", upload_date: "2024-03-10" },
        { id: 104, filename: "Annual_Report_2023.pdf", category: "AnnualReports", status: "uploaded", upload_date: "2024-03-10" },
    ]);

    const [activeDoc, setActiveDoc] = useState<number | null>(null);
    const [extractedData, setExtractedData] = useState<FinancialData | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleProcess = async (docId: number) => {
        setActiveDoc(docId);
        setIsProcessing(true);
        setExtractedData(null);

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Mock extracted data
        const mockData: FinancialData = {
            revenue: 450.5,
            profit: 35.2,
            total_assets: 1200.0,
            total_liabilities: 800.0,
            debt: 250.0,
            cashflow: 42.1
        };

        setExtractedData(mockData);
        setIsProcessing(false);

        // Update document status
        setDocuments(prev => prev.map(d =>
            d.id === docId ? { ...d, status: "processing" as const } : d
        ));

        // Auto finish after a bit
        setTimeout(() => {
            setDocuments(prev => prev.map(d =>
                d.id === docId ? { ...d, status: "reviewed" as const } : d
            ));
        }, 1000);
    };

    const handleSaveData = () => {
        setIsEditing(false);
        // In a real app, send back to API
    };

    const allProcessed = documents.every(d => d.status === "reviewed");

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white">AI Extraction Engine</h1>
                    <p className="text-slate-400 mt-2">Process uploaded documents to extract structured financial metrics.</p>
                </div>
                <button
                    onClick={() => router.push("/upload")}
                    className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                    <ArrowLeft size={14} />
                    Back to Uploads
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Document List */}
                <div className="lg:col-span-5 space-y-4">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FileText className="text-blue-500" size={18} />
                        Queue
                    </h2>
                    <div className="space-y-3">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                onClick={() => doc.status === "reviewed" ? setExtractedData({
                                    revenue: 450.5, profit: 35.2, total_assets: 1200.0, total_liabilities: 800.0, debt: 250.0, cashflow: 42.1
                                }) : null}
                                className={cn(
                                    "p-4 rounded-xl border transition-all cursor-pointer",
                                    activeDoc === doc.id
                                        ? "bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-900/10"
                                        : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                                )}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center",
                                            doc.status === "reviewed" ? "bg-emerald-500/20 text-emerald-500" : "bg-slate-800 text-slate-400"
                                        )}>
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white text-sm">{doc.filename}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{doc.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                <span className="text-[10px] text-slate-500">{doc.upload_date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {doc.status === "uploaded" ? (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleProcess(doc.id); }}
                                            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                                        >
                                            <Play size={14} fill="currentColor" />
                                        </button>
                                    ) : doc.status === "processing" || (activeDoc === doc.id && isProcessing) ? (
                                        <Loader2 className="animate-spin text-blue-500" size={18} />
                                    ) : (
                                        <CheckCircle2 className="text-emerald-500" size={18} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Extraction Interface / Results */}
                <div className="lg:col-span-7">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl h-full flex flex-col min-h-[500px] overflow-hidden">
                        {isProcessing ? (
                            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-blue-600 animate-spin" />
                                    <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" size={32} />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white">Extracting Data...</h3>
                                    <p className="text-slate-400 mt-2">AI is parsing tables and identifying financial metrics.</p>
                                </div>
                            </div>
                        ) : extractedData ? (
                            <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
                                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-white">Extracted Metrics</h3>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                        >
                                            <Edit2 size={14} />
                                            Refine Data
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSaveData}
                                            className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                                        >
                                            <Save size={14} />
                                            Apply Changes
                                        </button>
                                    )}
                                </div>

                                <div className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="grid grid-cols-2 gap-8">
                                        <DataField
                                            label="Revenue / Turnover"
                                            value={extractedData.revenue}
                                            unit="Cr."
                                            isEditing={isEditing}
                                            onChange={(val) => setExtractedData({ ...extractedData, revenue: val })}
                                        />
                                        <DataField
                                            label="Net Profit"
                                            value={extractedData.profit}
                                            unit="Cr."
                                            isEditing={isEditing}
                                            onChange={(val) => setExtractedData({ ...extractedData, profit: val })}
                                        />
                                        <DataField
                                            label="Total Assets"
                                            value={extractedData.total_assets}
                                            unit="Cr."
                                            isEditing={isEditing}
                                            onChange={(val) => setExtractedData({ ...extractedData, total_assets: val })}
                                        />
                                        <DataField
                                            label="Total Liabilities"
                                            value={extractedData.total_liabilities}
                                            unit="Cr."
                                            isEditing={isEditing}
                                            onChange={(val) => setExtractedData({ ...extractedData, total_liabilities: val })}
                                        />
                                        <DataField
                                            label="Gross Debt"
                                            value={extractedData.debt}
                                            unit="Cr."
                                            isEditing={isEditing}
                                            onChange={(val) => setExtractedData({ ...extractedData, debt: val })}
                                        />
                                        <DataField
                                            label="Cash Flow"
                                            value={extractedData.cashflow}
                                            unit="Cr."
                                            isEditing={isEditing}
                                            onChange={(val) => setExtractedData({ ...extractedData, cashflow: val })}
                                        />
                                    </div>

                                    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6">
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">AI Verification Signal</h4>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-emerald-500 w-[94%]" />
                                                <div className="h-full bg-slate-700 w-[6%]" />
                                            </div>
                                            <span className="text-sm font-bold text-emerald-500">94% Confidence</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                                            Matches found in 3 document locations. Table structure identified on Page 4 of "ALM_Report_Q4.pdf".
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-slate-800">
                                    <button
                                        onClick={() => router.push("/review")}
                                        className={cn(
                                            "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                                            allProcessed
                                                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40"
                                                : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                        )}
                                    >
                                        Proceed to Risk Review
                                        <ChevronRight size={18} />
                                    </button>
                                    {!allProcessed && (
                                        <p className="text-[10px] text-slate-500 mt-3 text-center">
                                            Run extraction on all documents to proceed.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-600 mb-6 shrink-0 mr-0">
                                    <Play size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Ready for Extraction</h3>
                                <p className="text-slate-400 mt-2 max-w-sm">
                                    Select a document from the queue or click the play button to initiate the AI data extraction process.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DataField({ label, value, unit, isEditing, onChange }: {
    label: string,
    value: number,
    unit: string,
    isEditing: boolean,
    onChange: (val: number) => void
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">{label}</label>
            <div className="flex items-end gap-2">
                {isEditing ? (
                    <input
                        type="number"
                        step="0.01"
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="w-full bg-slate-950 border border-blue-500 rounded-lg px-3 py-2 text-white font-bold text-xl focus:outline-none"
                    />
                ) : (
                    <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
                )}
                <span className="text-sm font-semibold text-slate-500 mb-1.5">{unit}</span>
            </div>
        </div>
    );
}
