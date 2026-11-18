"use client";

import QRCode from "qrcode";
import { useMemo } from "react";
import { landscapeSvg, portraitSvg, type CertificateFields } from "@/lib/gift/certificate";

const LOGO = "/images/gift/logo-gold.png";

/** The certificate, drawn from the same master design as the emailed PNG and the PDF. */
export function CertificateFace({ fields, layout = "landscape", qrUrl, label }: { fields: CertificateFields; layout?: "landscape" | "portrait"; qrUrl?: string; label: string }) {
  const svg = useMemo(() => {
    let qr = null;
    if (qrUrl) {
      const q = QRCode.create(qrUrl, { errorCorrectionLevel: "M" });
      qr = { size: q.modules.size, modules: Array.from(q.modules.data, Boolean) };
    }
    return layout === "landscape" ? landscapeSvg(fields, { logo: LOGO, qr }) : portraitSvg(fields, { logo: LOGO });
  }, [fields, layout, qrUrl]);
  return <div role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />;
}
