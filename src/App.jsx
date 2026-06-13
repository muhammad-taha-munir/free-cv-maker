import React, { useRef } from 'react';

import Layout from './components/Layout';
import EditorPanel from './components/editor/EditorPanel';
import PreviewPanel from './components/preview/PreviewPanel';
import Header from './components/Header';

function App() {
  const componentRef = useRef();

  const [isGenerating, setIsGenerating] = React.useState(false);

  const handlePrint = async () => {
    setIsGenerating(true);
    const element = componentRef.current;

    if (!element) {
      console.error("Component ref is null");
      setIsGenerating(false);
      return;
    }

    const normalizeColorsForHtml2Canvas = (root) => {
      // html2canvas (via its internal SVG serialization) can choke on modern
      // CSS color functions like oklab/oklch. To avoid this, we rewrite
      // key color-related inline styles using getComputedStyle results.
      const affectedProps = [
        'color',
        'backgroundColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor',
        'borderLeftColor',
        'outlineColor'
      ];

      const originals = new Map(); // el -> { prop: originalInlineValue }

      const all = root.querySelectorAll('*');
      const nodes = [root, ...all];

      for (const el of nodes) {
        const originalInline = {};
        let changed = false;

        const computed = window.getComputedStyle(el);

        for (const prop of affectedProps) {
          const inlineVal = el.style[prop] || '';
          const computedVal = computed[prop];

          // Only override if there's a meaningful computed value.
          // getComputedStyle returns rgb(...) or similar that html2canvas can parse.
          if (computedVal && computedVal !== 'transparent') {
            if (inlineVal !== '') {
              originalInline[prop] = inlineVal;
            } else {
              originalInline[prop] = undefined;
            }
            el.style[prop] = computedVal;
            changed = true;
          }
        }

        if (changed) {
          originals.set(el, originalInline);
        }
      }

      return () => {
        for (const [el, originalInline] of originals.entries()) {
          for (const prop of Object.keys(originalInline)) {
            const originalVal = originalInline[prop];
            if (originalVal === undefined) {
              el.style[prop] = '';
            } else {
              el.style[prop] = originalVal;
            }
          }
        }
      };
    };

    let restoreColors = null;

    // Temporarily remove shadow for cleaner capture
    const originalShadow = element.style.boxShadow;
    element.style.boxShadow = 'none';

    try {
      restoreColors = normalizeColorsForHtml2Canvas(element);

      // Dynamically import libraries to ensure they are loaded
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 4, // High quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Restore shadow
      element.style.boxShadow = originalShadow;

      if (restoreColors) restoreColors();

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Calculate height based on A4 width to maintain aspect ratio
      const finalHeight = (imgHeight * pdfWidth) / imgWidth;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalHeight);
      pdf.save('my-cv.pdf');

    } catch (err) {
      console.error("PDF Generation Error:", err);
      alert(`Failed to generate PDF: ${err.message || err}`);
    } finally {
      // Always restore UI changes
      element.style.boxShadow = originalShadow;
      if (restoreColors) restoreColors();
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header handlePrint={handlePrint} isGenerating={isGenerating} />
      <div className="flex-1 overflow-hidden">
        <Layout
          editor={<EditorPanel />}
          preview={<PreviewPanel ref={componentRef} />}
        />
      </div>
    </div>
  );
}

export default App;
