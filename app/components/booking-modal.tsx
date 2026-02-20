import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface BookingModalProps {
  children: React.ReactNode;
}

export function BookingModal({ children }: BookingModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const existing = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]',
    );
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-center text-xl">
            Book a Discovery Call
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-6">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/JBb4ASYOSl1ZM8wqg4X2"
            style={{
              width: "100%",
              border: "none",
              overflow: "hidden",
              scrollbarWidth: "none",
              minHeight: "620px",
            }}
            id="JBb4ASYOSl1ZM8wqg4X2_modal"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            title="Book a Discovery Call"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
