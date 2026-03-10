"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    Upload,
    File,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    FileText,
    PieChart,
    BarChart3,
    Building2,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CATEGORIES = [
    { id: "ALM", name: "Asset Liability Management", icon: BarChart3, required: true },
    { id: "Shareholding", name: "Shareholding Pattern", icon: PieChart, required: true },
    { id: "Borrowing", name: "Borrowing Profile", icon: Building2, required: true },
    { id: "AnnualReports", name: "Annual Reports (B/S, P&L)", icon: FileText, required: true },
    { id: "Portfolio", name: "Portfolio Performance", icon: File, required: true },
];

interface UploadedFile {
    id: string;
    file: File;
    category: string;
    progress: number;
    status: "uploading" | "completed" | "error";
}

export default function UploadPage() {
    const router = useRouter();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], category: string) => {
        const newFiles = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            category,
            progress: 0,
            status: "uploading" as const,
        }));

        setFiles(prev => [...prev, ...newFiles]);

        // Simulate upload for each file
        newFiles.forEach(fileObj => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(prev => prev.map(f =>
                        f.id === fileObj.id ? { ...f, progress: 100, status: "completed" } : f
                    ));
                } else {
                    setFiles(prev => prev.map(f =>
                        f.id === fileObj.id ? { ...f, progress } : f
                    ));
                }
            }, 500);
        });
    }, []);

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const getFilesByCategory = (category: string) => {
        return files.filter(f => f.category === category);
    };

    const allRequiredUploaded = CATEGORIES.filter(c => c.required).every(c =>
        files.some(f => f.category === c.id && f.status === "completed")
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Document Repository</h1>
                <p className="text-slate-400 mt-2">Upload the required financial documents to trigger AI extraction.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Zones */}
                <div className="lg:col-span-2 space-y-4">
                    {CATEGORIES.map((cat) => (
                        <CategoryUploadZone
                            key={cat.id}
                            category={cat}
                            onDrop={(files) => onDrop(files, cat.id)}
                            uploadedCount={getFilesByCategory(cat.id).length}
                        />
                    ))}
                </div>

                {/* Status & Actions */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sticky top-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Upload Status</h3>

                        <div className="space-y-4 mb-8">
                            {CATEGORIES.map(cat => {
                                const count = getFilesByCategory(cat.id).length;
                                const isDone = count > 0;
                                return (
                                    <div key={cat.id} className="flex items-center justify-between text-sm">
                                        <span className={cn(isDone ? "text-slate-300" : "text-slate-500")}>{cat.name}</span>
                                        {isDone ? (
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border border-slate-700" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {files.length > 0 && (
                            <div className="space-y-3 mb-8">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Uploads</h4>
                                <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {files.map(f => (
                                        <div key={f.id} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center gap-3">
                                            <div className="shrink-0">
                                                {f.status === "uploading" ? (
                                                    <Loader2 className="animate-spin text-blue-500" size={16} />
                                                ) : f.status === "completed" ? (
                                                    <CheckCircle2 className="text-emerald-500" size={16} />
                                                ) : (
                                                    <AlertCircle className="text-red-500" size={16} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-slate-200 truncate">{f.file.name}</p>
                                                <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                                                    <div
                                                        className="bg-blue-600 h-full transition-all duration-300"
                                                        style={{ width: `${f.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFile(f.id)}
                                                className="text-slate-500 hover:text-white transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => router.push("/extraction")}
                            disabled={!allRequiredUploaded}
                            className={cn(
                                "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                                allRequiredUploaded
                                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40"
                                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                            )}
                        >
                            Confirm & Start AI Pipeline
                            <ChevronRight size={18} />
                        </button>
                        {!allRequiredUploaded && (
                            <p className="text-[10px] text-slate-500 mt-3 text-center">
                                Please upload at least one document for each required category.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoryUploadZone({ category, onDrop, uploadedCount }: {
    category: any,
    onDrop: (files: File[]) => void,
    uploadedCount: number
}) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv'],
            'image/*': ['.png', '.jpg', '.jpeg']
        }
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "group cursor-pointer border-2 border-dashed rounded-2xl p-6 transition-all duration-200",
                isDragActive
                    ? "border-blue-500 bg-blue-500/5 shadow-inner"
                    : uploadedCount > 0
                        ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
                        : "border-slate-800 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50"
            )}
        >
            <input {...getInputProps()} />
            <div className="flex items-center gap-6">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    uploadedCount > 0 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                )}>
                    <category.icon size={24} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{category.name}</h3>
                        {category.required && (
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded uppercase">Required</span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        {isDragActive ? "Drop the files here" : "Drag & drop or click to upload PDF, Excel or CSV"}
                    </p>
                </div>
                {uploadedCount > 0 && (
                    <div className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold">
                        {uploadedCount} {uploadedCount === 1 ? 'file' : 'files'}
                    </div>
                )}
            </div>
        </div>
    );
}
