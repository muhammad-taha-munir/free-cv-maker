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

    try {
      // Dynamically import libraries to ensure they are loaded
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Temporarily remove shadow for cleaner capture
      const originalShadow = element.style.boxShadow;
      element.style.boxShadow = 'none';

      const canvas = await html2canvas(element, {
        scale: 4, // High quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Restore shadow
      element.style.boxShadow = originalShadow;

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
