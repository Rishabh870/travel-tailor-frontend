'use client';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

export default function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const mainImage = images[0];
  const sideImages = images.slice(1, 4); // Exactly 3 side images

  return (
    <>
      {/* Mobile-first responsive grid layout */}
      <div className='grid gap-2 sm:gap-3 mb-6'>
        {/* Mobile: Single column layout */}
        <div className='block sm:hidden'>
          <div
            className='group cursor-pointer relative overflow-hidden rounded-2xl h-[250px] hover-elevate'
            onClick={() => openModal(0)}
            data-testid='image-main'>
            <img
              src={mainImage}
              alt='Main tour image'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <Button
              size='icon'
              className='absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <Expand className='h-4 w-4' />
            </Button>
          </div>

          <div className='grid grid-cols-3 gap-2 mt-2'>
            {sideImages.map((image, index) => (
              <div
                key={index + 1}
                className='group cursor-pointer relative overflow-hidden rounded-lg h-[80px] hover-elevate'
                onClick={() => openModal(index + 1)}
                data-testid={`image-thumbnail-${index + 1}`}>
                <img
                  src={image}
                  alt={`Tour image ${index + 2}`}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className='hidden sm:grid grid-cols-12 grid-rows-8 gap-3 h-[400px] md:h-[500px]'>
          {/* Large main image */}
          <div
            className='col-span-8 md:col-span-7 row-span-8 group cursor-pointer relative overflow-hidden rounded-2xl hover-elevate'
            onClick={() => openModal(0)}
            data-testid='image-main'>
            <img
              src={mainImage}
              alt='Main tour image'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <Button
              size='icon'
              className='absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <Expand className='h-4 w-4' />
            </Button>
          </div>

          {/* Side images - exactly 3 */}
          {sideImages.map((image, index) => (
            <div
              key={index + 1}
              className={`col-span-4 md:col-span-5 group cursor-pointer relative overflow-hidden rounded-xl hover-elevate ${
                index === 2 ? 'row-span-8 sm:row-span-4' : 'row-span-4'
              }`}
              onClick={() => openModal(index + 1)}
              data-testid={`image-thumbnail-${index + 1}`}>
              <img
                src={image}
                alt={`Tour image ${index + 2}`}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <Button
                size='icon'
                className='absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-900 rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <Expand className='h-3 w-3' />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeModal}>
        <DialogContent className='max-w-full max-h-full w-screen h-screen p-0 bg-black border-0 overflow-hidden'>
          <div className='relative w-full h-full flex items-center justify-center'>
            {/* Close button - top right */}
            <Button
              variant='ghost'
              size='icon'
              className='absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all duration-200'
              onClick={closeModal}
              data-testid='button-close-modal'>
              <X className='h-6 w-6' />
            </Button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all duration-200'
                  onClick={prevImage}
                  data-testid='button-prev-image'>
                  <ChevronLeft className='h-6 w-6' />
                </Button>

                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all duration-200'
                  onClick={nextImage}
                  data-testid='button-next-image'>
                  <ChevronRight className='h-6 w-6' />
                </Button>
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full'>
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Main image */}
            {selectedImage !== null && (
              <img
                src={images[currentIndex]}
                alt={`Tour image ${currentIndex + 1}`}
                className='max-w-[90vw] max-h-[90vh] object-contain'
                data-testid='image-modal'
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
