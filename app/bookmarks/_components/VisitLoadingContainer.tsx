"use client";

import { useVisitLoading } from "@/app/contexts/visitLoadingContext";
import { Spinner } from "@/components/ui/spinner";

import { motion, AnimatePresence } from "framer-motion";

function VisitLoadingContainer() {
  const { visitLoading } = useVisitLoading();

  return (
    <AnimatePresence>
      {visitLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50"
        >
          <div className="flex flex-col items-center gap-4 text-lg font-semibold text-primary-foreground drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
            <span>Redirecting...</span>
            <Spinner className="size-12" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VisitLoadingContainer;
