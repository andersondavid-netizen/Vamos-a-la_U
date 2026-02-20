
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Test, Question, TestPart } from '../types';
import { Button } from './Button';
import { ChevronRight, AlertCircle, CheckCircle2, Clock, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MotionDiv = motion.div as any;

interface TestEngineProps {
  test: Test;
  onFinish: (answers: Record<string, any>) => void;
  onExit: () => void;
}

const QUESTIONS_PER_PAGE = 4;

export const TestEngine: React.FC<TestEngineProps> = ({ test, onFinish, onExit }) => {
  const [currentPartIdx, setCurrentPartIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState(1);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  const hasParts = !!test.parts && test.parts.length > 0;
  const currentPart: TestPart | null = hasParts ? test.parts![currentPartIdx] : null;
  const questions = currentPart ? currentPart.questions : test.questions;

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  useEffect(() => {
    if (currentPart?.timeLimit) {
      setTimeLeft(currentPart.timeLimit);
    } else {
      setTimeLeft(null);
    }
  }, [currentPartIdx]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev! - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft]);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isPageComplete = () => {
    return currentQuestions.every(q => answers[q.id] !== undefined && answers[q.id] !== '');
  };

  const handleNext = async () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hasParts && currentPartIdx < test.parts!.length - 1) {
      setDirection(1);
      setCurrentPartIdx(prev => prev + 1);
      setCurrentPage(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFinish(answers);
    }
  };

  const generateSpatialVisual = async (q: Question) => {
    if (generatedImages[q.id]) return;
    
    setIsGeneratingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: q.imagePrompt || "A simple black abstract 2D symbol for a cognitive test." }] }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImages(prev => ({ ...prev, [q.id]: `data:image/png;base64,${part.inlineData.data}` }));
          break;
        }
      }
    } catch (e) {
      console.error("Error generating image", e);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((Object.keys(answers).length) / (hasParts ? test.parts!.reduce((acc, p) => acc + p.questions.length, 0) : test.questions.length)) * 100;

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 md:px-6 max-w-4xl mx-auto relative z-10">
      <header className="fixed top-20 left-0 right-0 z-40 px-6 py-4 bg-slate-950/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold text-white">
                {test.title} {currentPart && <span className="text-blue-400 opacity-60 ml-2">| {currentPart.title}</span>}
              </h2>
              <p className="text-slate-400 text-sm">Página {currentPage + 1} de {totalPages}</p>
            </div>
            <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${timeLeft < 30 ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                  <Clock size={16} />
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
              )}
              <div className="text-right">
                <span className="text-blue-400 font-bold text-lg">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </div>
        </div>
      </header>

      <div className="mt-20">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={`${currentPartIdx}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {currentQuestions.map((q, idx) => (
              <div 
                key={q.id} 
                className="bg-slate-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-[2rem] hover:bg-slate-900/60 transition-all shadow-xl"
              >
                <div className="flex gap-4 mb-6">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    {idx + 1 + currentPage * QUESTIONS_PER_PAGE}
                  </span>
                  <div className="space-y-4 w-full">
                    <p className="text-xl text-slate-100 font-medium leading-relaxed">{q.text}</p>
                    
                    {q.subCategory === 'espacial' && (
                      <div className="relative aspect-video bg-slate-800/50 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
                        {generatedImages[q.id] ? (
                          <img src={generatedImages[q.id]} className="max-h-full object-contain" />
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => generateSpatialVisual(q)} disabled={isGeneratingImage}>
                            {isGeneratingImage ? "Generando visual..." : "Ver Figura de Prueba"}
                          </Button>
                        )}
                      </div>
                    )}

                    {q.type === 'fluency' && (
                      <textarea
                        className="w-full h-40 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 text-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        placeholder="Escribe todas las palabras aquí separadas por comas..."
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        value={answers[q.id] || ''}
                      />
                    )}

                    {(q.type === 'radio' || q.type === 'verification') && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {q.options?.map((opt) => (
                          <label 
                            key={opt.value}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${answers[q.id] === opt.value ? 'bg-blue-600/20 border-blue-500 shadow-lg' : 'bg-slate-800/30 border-white/5 hover:bg-slate-800/50'}`}
                          >
                            <input type="radio" className="hidden" onChange={() => handleAnswer(q.id, opt.value)} checked={answers[q.id] === opt.value} />
                            <span className={`text-sm uppercase tracking-widest font-bold ${answers[q.id] === opt.value ? 'text-white' : 'text-slate-500'}`}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </MotionDiv>
        </AnimatePresence>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
        <div className="max-w-4xl mx-auto flex justify-end">
          <Button 
            size="lg" 
            onClick={handleNext} 
            disabled={!isPageComplete() && timeLeft === null}
            className={`rounded-2xl px-10 py-4 shadow-2xl transition-all ${!isPageComplete() && timeLeft === null ? 'opacity-50' : 'shadow-blue-500/40'}`}
          >
            {currentPage === totalPages - 1 && currentPartIdx === (test.parts?.length || 1) - 1 ? (
              <span className="flex items-center gap-2">Finalizar Prueba <CheckCircle2 size={20} /></span>
            ) : (
              <span className="flex items-center gap-2">Siguiente <ChevronRight size={20} /></span>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};
