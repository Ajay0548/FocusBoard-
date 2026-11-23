import React, { useState } from 'react';
import styles from './FocusNotesCarousel.module.css';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from '../Icons';

interface Slide {
  id: string;
  tag: string;
  title: string;
  body: string;
}

const slides: Slide[] = [
  {
    id: 'slide-1',
    tag: 'Focus Note #1 — Prioritization',
    title: 'Tackle High-Impact Blockers First',
    body: 'Maintain team momentum by resolving high-priority critical path issues during the morning focus window. Eliminate ambiguity early in the sprint.',
  },
  {
    id: 'slide-2',
    tag: 'Focus Note #2 — Execution',
    title: 'Maintain Consistent Task Flow',
    body: 'Keep tasks moving steadily from "In progress" to "Completed". Regular status updates keep the dashboard synchronized and reflect real-time velocity.',
  },
  {
    id: 'slide-3',
    tag: 'Focus Note #3 — Retrospective',
    title: 'Review Completion Metrics & Refine',
    body: 'Analyze your completed deliverables to continuously improve effort estimation, surface recurring friction points, and strengthen overall code quality.',
  },
];

export const FocusNotesCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(slides.length - 1, prev + 1));
  };

  const currentSlide = slides[activeIndex];

  return (
    <section
      role="region"
      aria-label="Focus Notes"
      className={styles.carouselContainer}
    >
      <div className={styles.carouselCard}>
        <div className={styles.glowDecoration} aria-hidden="true" />

        {/* Slide Content */}
        <div
          key={currentSlide.id}
          className={styles.slideContent}
          aria-roledescription="slide"
          aria-label={`Slide ${activeIndex + 1} of ${slides.length}: ${currentSlide.title}`}
        >
          <span className={styles.slideBadge}>
            <SparklesIcon size={14} />
            <span>{currentSlide.tag}</span>
          </span>
          <h2 className={styles.slideTitle}>{currentSlide.title}</h2>
          <p className={styles.slideBody}>{currentSlide.body}</p>
        </div>

        {/* Carousel Controls */}
        <div className={styles.controlsRow}>
          {/* Indicators */}
          <div className={styles.indicators} role="tablist" aria-label="Slide indicators">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={
                  idx === activeIndex
                    ? `${styles.indicatorDot} ${styles.indicatorDotActive}`
                    : styles.indicatorDot
                }
                onClick={() => setActiveIndex(idx)}
                aria-current={idx === activeIndex ? 'true' : undefined}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className={styles.navigationButtons}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous focus note"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handleNext}
              disabled={activeIndex === slides.length - 1}
              aria-label="Next focus note"
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
