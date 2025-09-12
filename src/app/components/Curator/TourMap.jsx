'use client';
import { Card, CardContent } from '../../components/ui/card';

export default function TourMap({ mapEmbed }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold mb-6'>Location & Map</h2>

      <Card className='border border-card-border'>
        <CardContent className='p-6'>
          <div
            className='w-full rounded-lg overflow-hidden'
            data-testid='tour-map'
            dangerouslySetInnerHTML={{ __html: mapEmbed }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
