"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordRotateProps {
    words: string[];
    duration?: number;
    framerProps?: HTMLMotionProps<"span">;
    className?: string;
}

export function WordRotate({
    words,
    duration = 2500,
    framerProps = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.25, ease: "easeOut" },
    },
    className,
}: WordRotateProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, duration);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [words, duration]);

    return (
        <div className="overflow-hidden py-0 inline-flex align-top h-[1.2em] relative w-[130px]"> {/* Adjusted for inline flow */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    className={cn(className, "absolute left-0 top-0 whitespace-nowrap")}
                    {...framerProps}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
