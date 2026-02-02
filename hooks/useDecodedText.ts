import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

export function useDecodedText(text: string, duration: number = 2000) {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (isInView && !hasStarted) {
            setHasStarted(true);
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3; // Controls speed of decoding
            }, 30);

            return () => clearInterval(interval);
        }
    }, [isInView, text, hasStarted]);

    return { displayText, ref };
}
