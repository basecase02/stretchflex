"use client";

import QRCode from "qrcode";
import { useMemo } from "react";
import { landscapeSvg, portraitSvg, type CertificateFields } from "@/lib/gift/certificate";

const PLATE = "/images/gift/certificate-plate.jpg";

/** The certificate, drawn from the same master design as the emailed PNG and the PDF. */
export function CertificateFace({ fields, layout = "landscape", qrUrl, label }: { fields: CertificateFields; layout?: "landscape" | "portrait"; qrUrl?: string; label: string }) {
  const svg = useMemo(() => {
    let qr = null;
    if (qrUrl) {
      const q = QRCode.create(qrUrl, { errorCorrectionLevel: "M" });
      qr = { size: q.modules.size, modules: Array.from(q.modules.data, Boolean) };
    }
    return layout === "landscape" ? landscapeSvg(fields, { plate: PLATE, qr }) : portraitSvg(fields, { plate: PLATE, qr });
  }, [fields, layout, qrUrl]);
  return <div role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />;
}
