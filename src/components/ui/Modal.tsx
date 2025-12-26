import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

export const Modal = ({ open, onClose, title, children, className }: ModalProps) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className={cn('glass relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6', className)}
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 10 }}
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 rounded-full border border-border bg-card/60 p-2 text-sm text-canvas-foreground hover:text-accent focus-ring"
          >
            <X size={16} />
          </button>
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.25em] text-accent/70">Project</p>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          {children}
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
