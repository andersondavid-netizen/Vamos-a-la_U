
import React from 'react';
import { motion } from 'framer-motion';
import { TestResult } from '../types';
import { Button } from './Button';
import { Award, Target, Brain, TrendingUp } from 'lucide-react';

const MotionDiv = motion.div as any;

interface ResultsViewProps {
  result: TestResult;
  onClose: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onClose }) => {
  const categories = Object.keys(result.scores);
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex p-4 bg-blue-500/10 rounded-full mb-4">
          <Award size={48} className="text-blue-400" />
        </div>
        <h2 className="text-4xl font-bold text-white">¡Prueba Completada!</h2>
        <p className="text-slate-400 mt-2 text-lg">Aquí tienes el análisis detallado de tus resultados.</p>
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Gráfico de Barras Estilizado */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-blue-500" />
            <h3 className="text-xl font-bold">Desempeño por Categoría</h3>
          </div>
          
          <div className="space-y-6">
            {categories.map((cat, i) => {
              const score = result.scores[cat];
              const max = result.maxScores[cat];
              const percentage = (score / max) * 100;
              
              return (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300 font-medium uppercase">{cat}</span>
                    <span className="text-blue-400">{score} / {max}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </MotionDiv>

        {/* Resumen e Interpretación */}
        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-purple-500" />
            <h3 className="text-xl font-bold">Interpretación</h3>
          </div>
          
          <div className="flex-grow">
            <p className="text-slate-300 leading-relaxed text-lg italic">
              "{result.interpretation}"
            </p>
          </div>

          <div className="mt-8 p-4 bg-blue-600/10 rounded-xl border border-blue-500/20">
            <div className="flex items-center gap-3 text-blue-400">
              <TrendingUp size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Sugerencia Académica</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Tus resultados sugieren una alta afinidad con carreras que requieren {categories.join(', ')}.
            </p>
          </div>
        </MotionDiv>
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={onClose} className="px-12">
          Volver al Panel
        </Button>
      </div>
    </div>
  );
};
