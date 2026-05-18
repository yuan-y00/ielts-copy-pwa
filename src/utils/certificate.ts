import html2canvas from 'html2canvas';

export async function captureCertificate(
  element: HTMLElement
): Promise<Blob | null> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
    });
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  } catch {
    return null;
  }
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function saveCertificateImage(
  element: HTMLElement
): Promise<boolean> {
  const blob = await captureCertificate(element);
  if (!blob) return false;

  if (navigator.share && navigator.canShare) {
    const file = new File([blob], 'ielts-certificate.png', {
      type: 'image/png',
    });
    const shareData: ShareData = { files: [file], title: 'IELTS Certificate' };
    if (navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return true;
      } catch {
        // user cancelled, fall through to download
      }
    }
  }

  downloadBlob(blob, 'ielts-certificate.png');
  return true;
}
