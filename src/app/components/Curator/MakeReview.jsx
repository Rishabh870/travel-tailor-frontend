'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Star, Upload, X, Image as ImageIcon } from 'lucide-react';

export default function MakeReview() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', {
      rating,
      reviewTitle,
      reviewContent,
      reviewerName,
      images: uploadedImages,
    });
    alert('Thank you for your review! It will be published after moderation.');

    // Reset form
    setRating(0);
    setReviewTitle('');
    setReviewContent('');
    setReviewerName('');
    setUploadedImages([]);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = [];
      const remainingSlots = 3 - uploadedImages.length;

      for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          newImages.push(result);
          if (newImages.length === Math.min(files.length, remainingSlots)) {
            setUploadedImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
    setShowImageUpload(false);
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type='button'
        className='focus:outline-none'
        onMouseEnter={() => setHoveredRating(i + 1)}
        onMouseLeave={() => setHoveredRating(0)}
        onClick={() => setRating(i + 1)}
        data-testid={`star-${i + 1}`}>
        <Star
          className={`h-6 w-6 transition-colors ${
            i < (hoveredRating || rating)
              ? 'fill-orange-500 text-primary'
              : 'text-gray-300 hover:text-primary'
          }`}
        />
      </button>
    ));
  };

  return (
    <Card className='p-0 py-6 border border-gray-100 mb-8'>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <p className='text-sm text-muted-foreground'>
          Share your experience with other travelers
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-5 flex flex-col gap-4'>
          {/* Rating */}
          <div>
            <label className='text-sm font-medium mb-2 block  '>
              Your Rating
            </label>
            <div
              className='flex gap-1 text-orange-500 [&_svg]:text-orange-500'
              onMouseLeave={() => setHoveredRating(0)}>
              {renderStarRating()}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className='text-sm font-medium mb-2 block'>Your Name</label>
            <Input
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder='Enter your name'
              required
              data-testid='input-reviewer-name'
              className='py-3 px-4 border border-gray-100'
            />
          </div>

          {/* Review Title */}
          <div>
            <label className='text-sm font-medium mb-2 block'>
              Review Title
            </label>
            <Input
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder='Summarize your experience'
              required
              data-testid='input-review-title'
              className='py-3 px-4 border border-gray-100'
            />
          </div>

          {/* Review Content */}
          <div>
            <label className='text-sm font-medium mb-2 block'>
              Your Review
            </label>
            <Textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder='Tell us about your experience on this tour...'
              rows={4}
              required
              data-testid='textarea-review-content'
              className='py-3 px-4 border border-gray-100'
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className='text-sm font-medium mb-2 block'>
              Add Photos (Optional - Max 3 images)
            </label>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className='flex gap-2 mb-3'>
                {uploadedImages.map((image, index) => (
                  <div key={index} className='relative'>
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className='w-20 h-20 object-cover rounded-lg'
                    />
                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      className='absolute -top-2 -right-2 h-6 w-6'
                      onClick={() => removeImage(index)}>
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Images Button */}
            {uploadedImages.length < 3 && (
              <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
                <DialogTrigger asChild>
                  <Button
                    type='button'
                    variant='outline'
                    className='w-full border-dashed border-gray-200'
                    data-testid='button-add-images'>
                    <ImageIcon className='mr-2 h-5 w-5 text-orange-500' />
                    Add Photos ({uploadedImages.length}/3)
                  </Button>
                </DialogTrigger>
                <DialogContent className='border border-gray-100'>
                  <DialogHeader>
                    <DialogTitle className='text-orange-600'>
                      Upload Images
                    </DialogTitle>
                  </DialogHeader>
                  <div className='space-y-4'>
                    <div className='border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover-elevate'>
                      <Upload className='h-8 w-8 mx-auto mb-2 text-orange-500' />
                      <p className='text-sm text-gray-600 mb-2'>
                        Drag and drop images here, or click to select
                      </p>
                      <p className='text-xs text-gray-400 mb-4'>
                        Maximum 3 images, up to 10MB each
                      </p>
                      <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={handleImageUpload}
                        className='hidden'
                        id='image-upload'
                        data-testid='input-image-upload'
                      />
                      <label htmlFor='image-upload'>
                        <Button
                          type='button'
                          asChild
                          className='px-4 py-2 text-md'>
                          <span>Choose Images</span>
                        </Button>
                      </label>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <Button
            type='submit'
            className='w-full py-3 text-md bg-orange-600 hover:bg-orange-600/90'
            disabled={
              !rating || !reviewTitle || !reviewContent || !reviewerName
            }
            data-testid='button-submit-review'>
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
