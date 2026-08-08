import { siteConfig, siteUrl } from '@/constants/site';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const OpenGraphImage = () =>
  new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#ffffff',
        borderBottom: '24px solid #7c3aed',
      }}
    >
      <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: '#111827' }}>
        {siteConfig.name}
      </div>
      <div style={{ display: 'flex', marginTop: 12, fontSize: 48, color: '#7c3aed' }}>
        {siteConfig.jobTitle}
      </div>
      <div style={{ display: 'flex', marginTop: 32, fontSize: 30, color: '#4b5563' }}>
        TypeScript · React · Next.js · NestJS · AWS
      </div>
      <div style={{ display: 'flex', marginTop: 'auto', fontSize: 28, color: '#6b7280' }}>
        {siteUrl.replace(/^https?:\/\//, '')}
      </div>
    </div>,
    size
  );

export default OpenGraphImage;
