'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
    variant?: 'text' | 'card' | 'avatar' | 'image';
    className?: string;
    width?: string | number;
    height?: string | number;
    lines?: number;
}

export function Skeleton({
    variant = 'text',
    className,
    width,
    height,
    lines = 1,
}: SkeletonProps) {
    const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';

    const variantClasses = {
        text: 'h-4 rounded',
        card: 'rounded-xl',
        avatar: 'rounded-full',
        image: 'rounded-lg',
    };

    const style: React.CSSProperties = {
        width: width ?? (variant === 'avatar' ? 48 : '100%'),
        height: height ?? (variant === 'avatar' ? 48 : variant === 'card' ? 200 : variant === 'image' ? 160 : undefined),
    };

    // For text variant with multiple lines
    if (variant === 'text' && lines > 1) {
        return (
            <div className={cn('space-y-2', className)}>
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(baseClasses, variantClasses.text)}
                        style={{
                            width: i === lines - 1 ? '70%' : '100%',
                            ...style,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(baseClasses, variantClasses[variant], className)}
            style={style}
        />
    );
}

// Preset skeleton compositions
export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white rounded-xl overflow-hidden shadow-sm', className)}>
            <Skeleton variant="image" height={180} />
            <div className="p-4 space-y-3">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" lines={2} />
            </div>
        </div>
    );
}

export function SkeletonSpeakerCard({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white rounded-xl overflow-hidden shadow-sm', className)}>
            <Skeleton variant="image" className="aspect-square" height="auto" />
            <div className="p-4 space-y-2">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" height={12} />
            </div>
        </div>
    );
}
