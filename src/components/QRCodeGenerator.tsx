import { useEffect, useRef } from 'react';
import QRCode from 'easyqrcodejs';

interface QRCodeGeneratorProps {
  text: string;
}

export function QRCodeGenerator({
  text = '',
}: QRCodeGeneratorProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const auxRef = useRef(false);

  useEffect(() => {
    console.log(text);

    if (ref.current !== null && !auxRef.current) {
      new QRCode(ref.current, {
        text,
        logo: `/favicon.png`,
        logoWidth: 40,
        logoHeight: 40,
        width: 150,
        height: 150,
        logoBackgroundColor: '#ffffff',
      });

      auxRef.current = true;
    }
  }, [text]);

  return <div ref={ref} />;
}
