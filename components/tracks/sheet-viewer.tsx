"use client";

import { Maximize, ZoomIn } from "lucide-react";
import { Component, Suspense, useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

class SheetErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type SheetLabels = {
  sheetLabel: string;
  sheetLoading: string;
  sheetError: string;
  sheetOpen: string;
  sheetTools: string;
  sheetZoom: string;
  sheetFitWidth: string;
  sheetPage: string;
};

function subscribeToScreenSize(notify: () => void) {
  const query = window.matchMedia("(min-width: 1024px)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function ZoomControl({ zoom, disabled, label, onCommit }: { zoom: number; disabled: boolean; label: string; onCommit: (value: number) => void }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<number | null>(null);
  const dragging = useRef(false);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  const preview = draft ?? zoom;
  const commit = (value: number) => {
    onCommit(value);
    setDraft(null);
  };

  return (
    <div
      className="relative"
      onPointerEnter={(event) => { if (event.pointerType === "mouse" && !disabled) setOpen(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse" && !dragging.current) setOpen(false); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } }}
    >
      <button ref={button} type="button" aria-label={label} aria-expanded={open} aria-controls={id} disabled={disabled} onClick={() => setOpen(!open)} className="flex h-10 cursor-pointer items-center gap-2 rounded-md px-2 hover:bg-track-highlight focus-visible:outline-2 focus-visible:outline-track-accent disabled:cursor-default disabled:opacity-40">
        <ZoomIn className="h-4 w-4" aria-hidden="true" />
        <span className="w-10 tabular-nums">{zoom}%</span>
      </button>
      <div id={id} hidden={!open} className="absolute left-0 top-full z-20 w-20 pt-3">
        <div className="flex flex-col items-center rounded-md bg-track-background px-4 py-3 text-center text-track-ink shadow-lg">
          <label htmlFor={`${id}-range`} className="sr-only">{label}</label>
          <input
            id={`${id}-range`}
            type="range"
            min={50}
            max={200}
            step={5}
            value={preview}
            onChange={(event) => setDraft(Number(event.target.value))}
            onPointerDown={(event) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); }}
            onPointerUp={(event) => { dragging.current = false; commit(Number(event.currentTarget.value)); }}
            onPointerCancel={() => { dragging.current = false; setDraft(null); }}
            onKeyUp={(event) => {
              if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(event.key)) commit(Number(event.currentTarget.value));
            }}
            onBlur={(event) => { if (draft !== null) commit(Number(event.currentTarget.value)); }}
            aria-orientation="vertical"
            aria-valuetext={`${preview}%`}
            style={{ "--slider-progress": `${((preview - 50) / 150) * 100}%`, touchAction: "none" } as CSSProperties}
            className="track-player-range track-speed-range block h-32 w-6 cursor-pointer"
          />
          <output htmlFor={`${id}-range`} className="mt-1 block text-xs tabular-nums">{preview}%</output>
        </div>
      </div>
    </div>
  );
}

export default function SheetViewer({ file, title, labels }: { file: string; title: string; labels: SheetLabels }) {
  const frame = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const largeScreen = useSyncExternalStore(subscribeToScreenSize, () => window.matchMedia("(min-width: 1024px)").matches, () => false);
  const [customZoom, setZoom] = useState<number | null>(null);
  const zoom = customZoom ?? (largeScreen ? 75 : 100);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const updateCurrentPage = useCallback(() => {
    const element = viewport.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    let mostVisible = 0;
    let pageNumber = 1;
    element.querySelectorAll<HTMLElement>("[data-sheet-page]").forEach((page) => {
      const rect = page.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(rect.bottom, bounds.bottom) - Math.max(rect.top, bounds.top));
      if (visibleHeight > mostVisible) {
        mostVisible = visibleHeight;
        pageNumber = Number(page.dataset.sheetPage);
      }
    });
    if (mostVisible > 0) setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const navigation = document.querySelector<HTMLElement>("[data-site-nav]");
    const player = document.querySelector<HTMLElement>(".track-player-dock");
    const measureBars = () => {
      if (navigation) element.style.setProperty("--sheet-nav-height", `${navigation.getBoundingClientRect().bottom}px`);
      if (player) element.style.setProperty("--sheet-player-height", `${player.getBoundingClientRect().height}px`);
    };
    const observer = new ResizeObserver(measureBars);
    if (navigation) observer.observe(navigation, { box: "border-box" });
    if (player) observer.observe(player, { box: "border-box" });
    measureBars();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const loading = <p role="status" className="p-4 text-sm text-track-ink/65">{labels.sheetLoading}</p>;
  const error = (
    <div role="alert" className="p-4 text-sm text-track-ink/65">
      <p>{labels.sheetError}</p>
      <a href={file} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">{labels.sheetOpen}</a>
    </div>
  );
  const controlClass = "flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-md px-2 hover:bg-track-highlight focus-visible:outline-2 focus-visible:outline-track-accent disabled:cursor-default disabled:opacity-40";

  return (
    <div ref={frame} className="track-sheet-viewer flex h-[600px] min-h-0 flex-col overflow-hidden rounded-md bg-track-surface lg:h-full">
      <div role="group" aria-label={labels.sheetTools} className="flex shrink-0 flex-wrap items-center gap-1 border-b border-track-ink/10 bg-track-background px-2 py-1 text-sm text-track-ink">
        <ZoomControl zoom={zoom} disabled={!totalPages} label={labels.sheetZoom} onCommit={setZoom} />
        <button type="button" disabled={!totalPages} onClick={() => { setZoom(100); if (viewport.current) viewport.current.scrollLeft = 0; }} className={`${controlClass} gap-2`}>
          <Maximize className="h-4 w-4" aria-hidden="true" />
          {labels.sheetFitWidth}
        </button>
        <span className="ml-auto whitespace-nowrap px-2 tabular-nums">
          {labels.sheetPage} {totalPages ? currentPage : "–"} / {totalPages || "–"}
        </span>
      </div>
      <div ref={viewport} role="region" aria-label={`${labels.sheetLabel}: ${title}`} tabIndex={0} onScroll={updateCurrentPage} className="min-h-0 flex-1 overflow-auto p-2 focus-visible:outline-2 focus-visible:outline-track-accent">
        <div ref={container} className="w-full">
          {width > 0 && (
            <SheetErrorBoundary key={file} fallback={error}>
              <Suspense fallback={loading}>
                <Document file={file} onLoadSuccess={({ numPages }) => setTotalPages(numPages)} className="flex w-max min-w-full flex-col items-center gap-4">
                  {({ pdf }) => pdf && Array.from({ length: pdf.numPages }, (_, index) => (
                    <div key={index + 1} data-sheet-page={index + 1}>
                      <Suspense fallback={loading}>
                        <Page pageNumber={index + 1} width={width} scale={zoom / 100} onRenderSuccess={updateCurrentPage} devicePixelRatio={Math.min(window.devicePixelRatio || 1, 2)} />
                      </Suspense>
                    </div>
                  ))}
                </Document>
              </Suspense>
            </SheetErrorBoundary>
          )}
        </div>
      </div>
    </div>
  );
}
