"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Star, Upload, X, Image as ImageIcon } from "lucide-react";

// at top of MakeReview.jsx
const API_BASE = (process.env.NEXT_PUBLIC_URL_PREFIX || "").replace(/\/+$/, "");
const SIGN_ENDPOINT = `${API_BASE}/api/images/sign-upload`; // adjust if mounted differently

async function signUpload({ folder, filename, contentType }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_PREFIX}/api/images/sign-upload`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder, filename, contentType }),
    }
  );
  if (!res.ok) throw new Error(`Sign failed: ${res.status}`);
  return res.json(); // { path, uploadUrl, publicUrl }
}

async function uploadFileToGCS(file, folder) {
  const { uploadUrl, publicUrl } = await signUpload({
    folder,
    filename: `${Date.now()}-${file.name}`, // unique-ish
    contentType: file.type || "application/octet-stream",
  });

  // IMPORTANT: include both Content-Type and x-goog-acl
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "x-goog-acl": "public-read",
    },
    body: file,
  });
  if (!put.ok) throw new Error(`Upload failed: ${put.status}`);
  return publicUrl;
}

export default function MakeReview({ tourIdOrSlug }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = tourIdOrSlug
      ? `${API_BASE}/api/tour/${encodeURIComponent(tourIdOrSlug)}/reviews`
      : null;
    if (!endpoint) {
      alert("Missing tour id/slug");
      return;
    }

    // quick client guards (mirror server)
    const text = reviewContent.trim();
    if (text.length < 10) return alert("Review must be at least 10 chars.");
    if (rating < 1 || rating > 5) return alert("Pick 1–5 stars.");

    const payload = {
      name: reviewerName.trim(),
      heading: reviewTitle.trim(),
      review: text,
      stars: rating,
      img: uploadedImages.slice(0, 3), // GCS URLs
      // optionally: place, travelType, profileImg, date
    };

    try {
      setSubmitting(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      // success
      alert(
        "Thank you for your review! It will be published after moderation."
      );
      setRating(0);
      setReviewTitle("");
      setReviewContent("");
      setReviewerName("");
      setUploadedImages([]);
    } catch (err) {
      console.error("Review submit failed:", err);
      alert(err?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = 3 - uploadedImages.length;

    const toUpload = files
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining);

    if (!toUpload.length) return;

    try {
      // put tourIdOrSlug into MakeReview via props
      const folder = `reviews/tours/${tourIdOrSlug || "unknown"}`;

      const urls = await Promise.all(
        toUpload.map((file) => {
          // optional: size check (10 MB)
          if (file.size > 10 * 1024 * 1024)
            throw new Error(`${file.name} exceeds 10MB`);
          return uploadFileToGCS(file, folder);
        })
      );

      setUploadedImages((prev) => [...prev, ...urls]); // store GCS URLs
    } catch (err) {
      console.error("upload failed", err);
      alert(err.message || "Failed to upload image(s)");
    } finally {
      setShowImageUpload(false);
      // clear file input so re-selecting same file retriggers change
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        className="focus:outline-none"
        onMouseEnter={() => setHoveredRating(i + 1)}
        onMouseLeave={() => setHoveredRating(0)}
        onClick={() => setRating(i + 1)}
        data-testid={`star-${i + 1}`}
      >
        <Star
          className={`h-6 w-6 transition-colors ${
            i < (hoveredRating || rating)
              ? "fill-orange-500 text-primary"
              : "text-gray-300 hover:text-primary"
          }`}
        />
      </button>
    ));
  };

  return (
    <Card className="p-0 py-6 border border-gray-100 mb-8">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <p className="text-sm text-muted-foreground">
          Share your experience with other travelers
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col gap-4">
          {/* Rating */}
          <div>
            <label className="text-sm font-medium mb-2 block  ">
              Your Rating
            </label>
            <div
              className="flex gap-1 text-orange-500 [&_svg]:text-orange-500"
              onMouseLeave={() => setHoveredRating(0)}
            >
              {renderStarRating()}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-2 block">Your Name</label>
            <Input
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Enter your name"
              required
              data-testid="input-reviewer-name"
              className="py-3 px-4 border border-gray-100"
            />
          </div>

          {/* Review Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Review Title
            </label>
            <Input
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Summarize your experience"
              required
              data-testid="input-review-title"
              className="py-3 px-4 border border-gray-100"
            />
          </div>

          {/* Review Content */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Your Review
            </label>
            <Textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="Tell us about your experience on this tour..."
              rows={4}
              required
              data-testid="textarea-review-content"
              className="py-3 px-4 border border-gray-100"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Add Photos (Optional - Max 3 images)
            </label>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="flex gap-2 mb-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
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
                    type="button"
                    variant="outline"
                    className="w-full border-dashed border-gray-200"
                    data-testid="button-add-images"
                  >
                    <ImageIcon className="mr-2 h-5 w-5 text-orange-500" />
                    Add Photos ({uploadedImages.length}/3)
                  </Button>
                </DialogTrigger>
                <DialogContent className="border border-gray-100">
                  <DialogHeader>
                    <DialogTitle className="text-orange-600">
                      Upload Images
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover-elevate">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop images here, or click to select
                      </p>
                      <p className="text-xs text-gray-400 mb-4">
                        Maximum 3 images, up to 10MB each
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        data-testid="input-image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          type="button"
                          asChild
                          className="px-4 py-2 text-md"
                        >
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
            type="submit"
            className="w-full py-3 text-md bg-orange-600 hover:bg-orange-600/90"
            disabled={
              !rating ||
              !reviewTitle ||
              !reviewContent ||
              !reviewerName ||
              submitting
            }
            data-testid="button-submit-review"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
