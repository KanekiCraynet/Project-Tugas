import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculationHistory } from '../types/calculator';
import { Trash2, Clock, Copy, X } from 'lucide-react';

interface HistoryPanelProps {
  history: CalculationHistory[];
  onClearHistory: () => void;
  onSelectHistory: (expression: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onClearHistory,
  onSelectHistory,
  isOpen,
  onClose
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-l border-white/20 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Riwayat</h2>
              </div>
              <div className="flex items-center space-x-2">
                {history.length > 0 && (
                  <motion.button
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    onClick={onClearHistory}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
                <motion.button
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {history.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Clock className="w-12 h-12 text-gray-500 mb-4" />
                  <p className="text-gray-400 text-sm">
                    Belum ada riwayat perhitungan
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Mulai menghitung untuk melihat riwayat
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="history-item group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => onSelectHistory(item.expression)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-300 font-mono mb-1 break-all">
                            {item.expression}
                          </div>
                          <div className="text-lg font-bold text-white mb-2">
                            = {item.result}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{formatTime(item.timestamp)}</span>
                            <span>•</span>
                            <span>{formatDate(item.timestamp)}</span>
                          </div>
                        </div>
                        
                        <motion.button
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(`${item.expression} = ${item.result}`, item.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {copiedId === item.id ? (
                            <motion.div
                              className="text-green-400"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              ✓
                            </motion.div>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {history.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <div className="text-xs text-gray-500 text-center">
                  {history.length} perhitungan tersimpan
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
