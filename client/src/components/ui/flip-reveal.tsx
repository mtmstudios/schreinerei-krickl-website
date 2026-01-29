"use client";

import { ComponentProps, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

type FlipRevealItemProps = {
    flipKey: string;
} & ComponentProps<"div">;

export const FlipRevealItem = ({ flipKey, ...props }: FlipRevealItemProps) => {
    return <div data-flip={flipKey} {...props} />;
};

type FlipRevealProps = {
    keys: string[];
} & ComponentProps<"div">;

export const FlipReveal = ({ keys, ...props }: FlipRevealProps) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const ctxRef = useRef<gsap.Context | null>(null);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const isShow = (key: string | null) => !!key && (keys.includes("alle") || keys.includes(key));

    useLayoutEffect(() => {
        if (!wrapperRef.current) return;

        const items = gsap.utils.toArray<HTMLElement>("[data-flip]", wrapperRef.current);

        if (isFirstRender) {
            items.forEach((item) => {
                const key = item.getAttribute("data-flip");
                const shouldShow = isShow(key);
                item.style.display = shouldShow ? "" : "none";
                item.style.opacity = shouldShow ? "1" : "0";
            });
            setIsFirstRender(false);
            return;
        }

        if (ctxRef.current) {
            ctxRef.current.revert();
        }

        const state = Flip.getState(items);

        items.forEach((item) => {
            const key = item.getAttribute("data-flip");
            const shouldShow = isShow(key);
            item.style.display = shouldShow ? "" : "none";
        });

        ctxRef.current = gsap.context(() => {
            Flip.from(state, {
                duration: 0.5,
                scale: true,
                ease: "power1.inOut",
                stagger: 0.02,
                absolute: true,
                onEnter: (elements) => {
                    return gsap.fromTo(elements,
                        { autoAlpha: 0, scale: 0.8 },
                        { autoAlpha: 1, scale: 1, duration: 0.4 }
                    );
                },
                onLeave: (elements) => {
                    return gsap.to(elements, { 
                        autoAlpha: 0, 
                        scale: 0.8, 
                        duration: 0.3
                    });
                }
            });
        }, wrapperRef);

        return () => {
            if (ctxRef.current) {
                ctxRef.current.revert();
            }
        };
    }, [keys, isFirstRender]);

    return <div {...props} ref={wrapperRef} />;
};
