import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, AlertCircle } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function PdfViewerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // PDF.js State
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [pdf, setPdf] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [rendering, setRendering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Project data
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'portfolio', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProject({ id: docSnap.id, ...data });
        } else {
          setError('Trabalho não encontrado.');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Ocorreu um erro ao carregar o trabalho.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // 2. Load PDF.js script dynamically
  useEffect(() => {
    if ((window as any).pdfjsLib) {
      setPdfjsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.async = true;
    script.onload = () => {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      setPdfjsLoaded(true);
    };
    script.onerror = () => {
      console.error('Error loading PDF.js from cdnjs');
      setError('Erro ao carregar o motor de visualização de arquivos.');
    };
    document.body.appendChild(script);
  }, []);

  // 3. Load PDF Document once project and PDF.js are ready
  useEffect(() => {
    if (!project || !pdfjsLoaded) return;

    let active = true;
    const loadPdfDoc = async () => {
      if (!project.documentFile) {
        setError('Este trabalho não possui um arquivo para visualização.');
        return;
      }

      try {
        const pdfjs = (window as any).pdfjsLib;
        let loadingTask;

        if (project.documentFile.startsWith('data:')) {
          const parts = project.documentFile.split(';base64,');
          const base64 = parts[1] || parts[0];
          const raw = window.atob(base64);
          const uint8Array = new Uint8Array(raw.length);
          for (let i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
          }
          loadingTask = pdfjs.getDocument({ data: uint8Array });
        } else {
          loadingTask = pdfjs.getDocument(project.documentFile);
        }

        const pdfDoc = await loadingTask.promise;
        if (active) {
          setPdf(pdfDoc);
          setNumPages(pdfDoc.numPages);
          setPageNum(1);
        }
      } catch (err) {
        console.error('PDF.js loading error:', err);
        if (active) {
          setError('Este dispositivo ou navegador não suporta a visualização direta deste arquivo PDF. Sugerimos baixá-lo diretamente.');
        }
      }
    };

    loadPdfDoc();
    return () => {
      active = false;
    };
  }, [project, pdfjsLoaded]);

  // 4. Render PDF page on Canvas
  useEffect(() => {
    if (!pdf || !canvasRef.current || !containerRef.current) return;

    let active = true;
    let renderTask: any = null;

    const renderPage = async () => {
      if (rendering) return;
      setRendering(true);

      try {
        const page = await pdf.getPage(pageNum);
        if (!active) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!canvas || !context) return;

        // Dynamic viewport logic for extreme responsiveness
        const containerWidth = containerRef.current.clientWidth || 600;
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        
        // Fit PDF page exactly inside current screen width limits (subtracting pads)
        const outerPadding = window.innerWidth < 768 ? 16 : 48;
        const widthLimit = Math.min(containerWidth - outerPadding, 900);
        const autoScale = widthLimit / unscaledViewport.width;
        
        const finalScale = autoScale * scale;
        const viewport = page.getViewport({ scale: finalScale });

        // Standard crisp display with Device Pixel Ratio adjustment
        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.scale(dpr, dpr);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
      } catch (err) {
        console.error('Page render error:', err);
      } finally {
        if (active) {
          setRendering(false);
        }
      }
    };

    renderPage();

    return () => {
      active = false;
      if (renderTask && renderTask.cancel) {
        renderTask.cancel();
      }
    };
  }, [pdf, pageNum, scale]);

  // 5. Handle resize debounced re-render
  useEffect(() => {
    let timeoutId: any = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Trigger page re-render with a micro state adjustment
        setScale(s => s + 0.00001);
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#051325] flex flex-col select-none text-white font-sans">
      {/* Top Header Controls bar */}
      <header className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4 border-b border-brand-gold/30 bg-[#071B33] sticky top-0 z-50 shadow-md">
        <button
          onClick={() => {
            const hasHistory = window.history.state && window.history.state.idx > 0;
            if (hasHistory && document.referrer && document.referrer.includes(window.location.host)) {
              navigate(-1);
            } else {
              navigate(`/trabalho/${id}`);
            }
          }}
          className="flex items-center gap-2 hover:text-brand-gold text-white/90 text-xs md:text-sm font-bold uppercase tracking-widest transition-all p-2 rounded-sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Voltar</span>
        </button>

        <h1 className="font-serif text-sm md:text-base text-white/90 font-bold truncate max-w-[40%] md:max-w-[50%] text-center">
          {project?.documentName || 'Visualizar PDF'}
        </h1>

        {project?.documentFile ? (
          <a
            href={project.documentFile}
            download={project.documentName || 'documento'}
            className="flex items-center gap-1.5 px-3 py-2 bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-widest rounded-sm shadow-md hover:brightness-110 active:scale-95 transition-all text-center min-h-[40px] justify-center"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Baixar</span>
          </a>
        ) : (
          <div className="w-16" />
        )}
      </header>

      {/* Main Area with dynamic canvas rendering */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col items-center justify-start overflow-hidden">
        {loading || (!project && !error) ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-brand-gold mb-4" />
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest">Carregando trabalho...</p>
          </div>
        ) : error ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-white text-base font-medium mb-6 leading-relaxed">{error}</p>
            {project?.documentFile && (
              <a
                href={project.documentFile}
                download={project.documentName || 'documento'}
                className="px-5 py-3 bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 transition-all shadow-lg"
              >
                Baixar PDF Diretamente
              </a>
            )}
          </div>
        ) : (
          <div ref={containerRef} className="w-full flex-grow flex flex-col items-center justify-start">
            {/* Control Bar for navigation & scaling */}
            <div className="w-full max-w-lg mb-6 flex items-center justify-between bg-[#071B33] border border-brand-gold/20 p-2 md:p-3 rounded-sm shadow-md">
              <div className="flex items-center gap-1">
                <button
                  disabled={pageNum <= 1 || rendering}
                  onClick={() => setPageNum(p => Math.max(1, p - 1))}
                  className="p-2 text-white hover:text-brand-gold disabled:text-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Página Anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <span className="text-xs md:text-sm text-white/80 font-mono font-bold px-2 whitespace-nowrap">
                  Pág. {pageNum} de {numPages}
                </span>

                <button
                  disabled={pageNum >= numPages || rendering}
                  onClick={() => setPageNum(p => Math.min(numPages, p + 1))}
                  className="p-2 text-white hover:text-brand-gold disabled:text-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Próxima Página"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setScale(s => Math.max(0.6, s - 0.2))}
                  className="p-2 text-white/80 hover:text-brand-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Diminuir Zoom"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-[10px] md:text-xs text-white/55 font-mono w-10 text-center font-bold">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale(s => Math.min(2.5, s + 0.2))}
                  className="p-2 text-white/80 hover:text-brand-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Aumentar Zoom"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>

            {/* Document Canvas Holder */}
            <div className="w-full flex justify-center overflow-auto max-h-[70vh] bg-[#030c17] border border-brand-gold/10 p-3 md:p-6 rounded-md shadow-2xl">
              <canvas
                ref={canvasRef}
                className="bg-white shadow-xl transition-all duration-200"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
