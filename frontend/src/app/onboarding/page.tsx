"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Building2,
    CreditCard,
    MapPin,
    Globe,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    PieChart,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 1, name: "Company Info", icon: Building2 },
    { id: 2, name: "Loan Details", icon: CreditCard },
    { id: 3, name: "Review", icon: CheckCircle2 },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        // Company Details
        name: "",
        cin: "",
        pan: "",
        sector: "",
        subsector: "",
        turnover: "",
        address: "",
        website: "",
        // Loan Details
        loan_type: "Term Loan",
        amount: "",
        tenure: "",
        interest_rate: "",
        purpose: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Mock API call
            console.log("Submitting form data:", formData);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Navigate to upload page after success
            router.push("/upload");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Entity Onboarding</h1>
                <p className="text-slate-400 mt-2">Enter company details and loan requirements to start the underwriting process.</p>
            </div>

            {/* Stepper */}
            <div className="mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
                <div className="relative z-10 flex justify-between">
                    {STEPS.map((step) => (
                        <div key={step.id} className="flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                                    currentStep >= step.id
                                        ? "bg-blue-600 border-blue-900 text-white"
                                        : "bg-slate-900 border-slate-800 text-slate-500"
                                )}
                            >
                                <step.icon size={20} />
                            </div>
                            <span className={cn(
                                "mt-2 text-sm font-medium transition-colors",
                                currentStep >= step.id ? "text-blue-400" : "text-slate-500"
                            )}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                            <Building2 className="text-blue-500" size={20} />
                            Company Information
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Acme Corp India Pvt Ltd"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">CIN (Corporate ID Number)</label>
                                <input
                                    type="text"
                                    name="cin"
                                    value={formData.cin}
                                    onChange={handleInputChange}
                                    placeholder="U12345MH2023PTC123456"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">PAN</label>
                                <input
                                    type="text"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleInputChange}
                                    placeholder="ABCDE1234F"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Turnover (in Cr.)</label>
                                <input
                                    type="number"
                                    name="turnover"
                                    value={formData.turnover}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 150"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Sector</label>
                                <select
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                >
                                    <option value="">Select Sector</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Services">Services</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Retail">Retail</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Registered Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-slate-500" size={16} />
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Full registered office address..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                            <CreditCard className="text-blue-500" size={20} />
                            Loan Requirements
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Loan Type</label>
                                <select
                                    name="loan_type"
                                    value={formData.loan_type}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                >
                                    <option value="Term Loan">Term Loan</option>
                                    <option value="Working Capital">Working Capital</option>
                                    <option value="Line of Credit">Line of Credit</option>
                                    <option value="Equipment Financing">Equipment Financing</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Requested Amount (Lakhs)</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 500"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Tenure (Months)</label>
                                <input
                                    type="number"
                                    name="tenure"
                                    value={formData.tenure}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 36"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Expected Interest Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="interest_rate"
                                    value={formData.interest_rate}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 10.5"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Purpose of Loan</label>
                            <textarea
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Briefly describe what the loan will be used for..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                                required
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                            <CheckCircle2 className="text-blue-500" size={20} />
                            Review Information
                        </h2>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Company Details</h3>
                                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Name</span>
                                        <span className="text-slate-200 font-medium">{formData.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">CIN</span>
                                        <span className="text-slate-200 font-medium">{formData.cin}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">PAN</span>
                                        <span className="text-slate-200 font-medium">{formData.pan}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Sector</span>
                                        <span className="text-slate-200 font-medium">{formData.sector}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Turnover</span>
                                        <span className="text-slate-200 font-medium">{formData.turnover} Cr.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Loan Details</h3>
                                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Type</span>
                                        <span className="text-slate-200 font-medium">{formData.loan_type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Amount</span>
                                        <span className="text-slate-200 font-medium">{formData.amount} L.</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Tenure</span>
                                        <span className="text-slate-200 font-medium">{formData.tenure} Months</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Interest Rate</span>
                                        <span className="text-slate-200 font-medium">{formData.interest_rate}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 items-start">
                            <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-blue-200/80">
                                By submitting this form, you initiate the risk assessment pipeline for <strong>{formData.name}</strong>.
                                Next step will require document uploads for financial verification.
                            </p>
                        </div>
                    </div>
                )}

                <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1 || isSubmitting}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-medium transition-all hover:bg-slate-800",
                            (currentStep === 1 || isSubmitting) && "opacity-0 pointer-events-none"
                        )}
                    >
                        <ChevronLeft size={18} />
                        Back
                    </button>

                    {currentStep < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-900/40"
                        >
                            Next Step
                            <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-10 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg shadow-emerald-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Complete Onboarding
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
