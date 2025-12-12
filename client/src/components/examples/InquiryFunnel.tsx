import { useState } from "react";
import InquiryFunnel from "../InquiryFunnel";
import { Button } from "@/components/ui/button";

export default function InquiryFunnelExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open Inquiry Funnel</Button>
      <InquiryFunnel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
