"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"

interface ImageItem {
  id: string
  src: string
  alt: string
  title?: string
  location?: string
}

interface VerticalImageStackProps {
  images: ImageItem[]
}

export function VerticalImageStack({ images }: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentIndex(0)
  }, [images])

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [images.length])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const [isHovering, setIsHovering] = useState(false)
  const isHoveringRef = useRef(false)
  const currentIndexRef = useRef(currentIndex)
  
  useEffect(() => {
    isHoveringRef.current = isHovering
  }, [isHovering])
  
  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleContainerWheel = (e: WheelEvent) => {
      if (!isHoveringRef.current) return
      
      const isAtStart = currentIndexRef.current === 0
      const isAtEnd = currentIndexRef.current === images.length - 1
      const scrollingUp = e.deltaY < 0
      const scrollingDown = e.deltaY > 0
      
      if ((isAtStart && scrollingUp) || (isAtEnd && scrollingDown)) {
        return
      }
      
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault()
        e.stopPropagation()
        if (scrollingDown) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    }
    
    container.addEventListener("wheel", handleContainerWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleContainerWheel)
  }, [navigate, images.length])

  const getCardStyle = (index: number) => {
    const total = images.length
    if (total === 0) return { y: 0, scale: 1, opacity: 0, zIndex: 0, rotateX: 0 }
    
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -120, scale: 0.85, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: -200, scale: 0.72, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: 120, scale: 0.85, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: 200, scale: 0.72, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 300 : -300, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    if (total === 0) return false
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] text-muted-foreground">
        Keine Projekte in dieser Kategorie
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="relative flex h-[500px] md:h-[600px] w-full items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div 
        className="relative flex h-[380px] md:h-[450px] w-[260px] md:w-[320px] items-center justify-center" 
        style={{ perspective: "1200px" }}
      >
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
              data-testid={`stack-card-${index}`}
            >
              <div
                className="relative h-[340px] md:h-[400px] w-[240px] md:w-[300px] overflow-hidden rounded-2xl bg-card ring-1 ring-border/20"
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px hsl(var(--foreground) / 0.15), 0 0 0 1px hsl(var(--foreground) / 0.05)"
                    : "0 10px 30px -10px hsl(var(--foreground) / 0.1)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-foreground/10 via-transparent to-transparent" />

                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                  draggable={false}
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6">
                  {image.title && (
                    <h3 className="text-white font-semibold text-base md:text-lg mb-1">{image.title}</h3>
                  )}
                  {image.location && (
                    <p className="text-white/70 text-sm">{image.location}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="absolute right-4 md:right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-6 bg-primary" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Gehe zu Bild ${index + 1}`}
            data-testid={`dot-${index}`}
          />
        ))}
      </div>

      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7-7 7 7" />
            </svg>
          </motion.div>
          <span className="text-xs font-medium tracking-wide">Scrollen oder ziehen</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-light text-foreground tabular-nums">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-2 h-px w-8 bg-foreground/20" />
          <span className="text-sm text-muted-foreground tabular-nums">{String(images.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
