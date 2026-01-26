"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface SummaryCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    href: string;
    className?: string;
}

export default function SummaryCard({ title, value, icon, href, className }: SummaryCardProps) {
    return (
        <Link href={href} className="block">
            <Card className={cn("hover:bg-muted/50 transition-colors", className)}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                </CardContent>
            </Card>
        </Link>
    )
}
