"use client";
import { useState } from "react";
import CareerApplicationModal from "./CareerApplicationModal";
export default function CareerApplyButton({ careerId, careerTitle, className }: { careerId: string; careerTitle: string; className?: string }) { const [open, setOpen] = useState(false); return <>{<button onClick={() => setOpen(true)} className={className}>Apply Now</button>}{open && <CareerApplicationModal careerId={careerId} careerTitle={careerTitle} onClose={() => setOpen(false)} />}</> }
