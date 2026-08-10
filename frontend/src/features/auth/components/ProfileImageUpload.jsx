import { useState, useMemo, useEffect, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function ProfileImageUpload({
  value,
  onChange,
  error: customError,
  isDisabled = false,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return null;
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl && typeof value !== 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, value]);

  const validateAndProcessFile = (file) => {
    setValidationError(null);

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError('Invalid image format. Supported formats: JPG, JPEG, PNG, WEBP.');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setValidationError(`Image size exceeds ${MAX_SIZE_MB}MB limit.`);
      return;
    }

    if (onChange) {
      onChange(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    validateAndProcessFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onChange) {
      onChange(null);
    }
  };

  const displayError = customError || validationError;

  return (
    <div className="w-full text-left space-y-1.5 font-sans">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
        PROFILE IMAGE
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onClick={() => !isDisabled && fileInputRef.current?.click()}
        tabIndex={isDisabled ? -1 : 0}
        role="button"
        aria-label="Upload profile image"
        className={cn(
          'relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 text-center',
          dragActive && 'border-[#006B3C] bg-[#E8F7DF]/30',
          displayError ? 'border-red-500 bg-red-50/30' : 'border-slate-300',
          isDisabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleFileSelect}
          disabled={isDisabled}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative group">
            <Avatar className="w-20 h-20 border-2 border-white shadow-md">
              <AvatarImage src={previewUrl} alt="Profile preview" />
              <AvatarFallback className="bg-purple-100 text-purple-700 font-bold text-lg">
                IMG
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isDisabled}
              className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2 text-slate-500">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <Camera className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-[#006B3C]">Click to upload</span> or drag and drop
            </div>
            <p className="text-[11px] text-slate-400">
              JPG, JPEG, PNG or WEBP (Max {MAX_SIZE_MB}MB)
            </p>
          </div>
        )}
      </div>

      {previewUrl && (
        <div className="flex items-center justify-center gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            isDisabled={isDisabled}
            icon={<Upload className="w-3.5 h-3.5" />}
          >
            Change Image
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            isDisabled={isDisabled}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Remove
          </Button>
        </div>
      )}

      {displayError && (
        <p className="text-xs text-red-500 mt-1">{displayError}</p>
      )}
    </div>
  );
}

export default ProfileImageUpload;
