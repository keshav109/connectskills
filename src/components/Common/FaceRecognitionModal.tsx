import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Scan, CheckCircle, AlertCircle, Camera } from 'lucide-react';

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FaceRecognitionModal: React.FC<FaceRecognitionModalProps> = ({ isOpen, onClose }) => {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setIsCameraOpen(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Failed to access camera. Please check your browser permissions.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw the image, applying a flip so it matches the mirrored preview
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage2(dataUrl);
        setSimilarity(null);
        setError(null);
      }
      stopCamera();
    }
  };

  useEffect(() => {
    if (!isOpen) stopCamera();
    return () => stopCamera();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageNumber: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imageNumber === 1) setImage1(reader.result as string);
        else setImage2(reader.result as string);
        // Reset results when new images are uploaded
        setSimilarity(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFaces = async () => {
    if (!image1 || !image2) {
      setError('Please upload both images first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('api_key', 'EEbgK0-GzsS1LexA709_hv_dcFub8Z6A');
      formData.append('api_secret', 'EpQN9ZH6Z5qQNOCg0qFD1nD-mb3Pn8Vj');
      formData.append('image_base64_1', image1.split(',')[1]);
      formData.append('image_base64_2', image2.split(',')[1]);

      const response = await fetch('https://api-us.faceplusplus.com/facepp/v3/compare', { 
        method: 'POST', 
        body: formData 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_message || 'API request failed.');
      }

      const data = await response.json();
      
      if (data.confidence !== undefined) {
        const rawConfidence = data.confidence;
        
        // Normalize the Face++ confidence score to a stricter percentage.
        // Face++ often returns ~70 for completely different people due to basic structural similarities.
        // For ID verification, we want scores below 75 to drop off sharply.
        let normalizedScore = 0;
        if (rawConfidence >= 80) {
          normalizedScore = rawConfidence; // 80-100 remains same
        } else if (rawConfidence >= 75) {
          normalizedScore = 50 + ((rawConfidence - 75) / 5) * 30; // 75-80 maps to 50-80%
        } else if (rawConfidence >= 65) {
          normalizedScore = ((rawConfidence - 65) / 10) * 35; // 65-75 maps to 0-35% (70 gives 17.5%)
        } else {
          normalizedScore = 0; // below 65 is practically 0% match
        }
        
        setSimilarity(Number(Math.min(100, Math.max(0, normalizedScore)).toFixed(1)));
      } else {
        throw new Error('No faces detected or match could not be determined.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze faces. Please ensure photos clearly show one face.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetModal = () => {
    setImage1(null);
    setImage2(null);
    setSimilarity(null);
    setError(null);
  };

  const closeAndReset = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Scan className="text-blue-600" />
            Face Recognition Verification
          </h2>
          <button onClick={closeAndReset} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6 text-sm">
            Upload two photos (e.g., your ID and a current selfie) to verify your identity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Image 1 Upload */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Reference Photo (ID)</span>
              <label className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all overflow-hidden relative group">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 1)} />
                {image1 ? (
                  <>
                    <img src={image1} alt="Reference" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        <Upload size={16} /> Change Photo
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload size={32} className="mb-2" />
                    <span className="text-sm">Click to upload</span>
                  </div>
                )}
              </label>
            </div>

            {/* Image 2 Capture */}
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Current Photo (Selfie)</span>
              <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center overflow-hidden relative group bg-gray-50">
                {isCameraOpen ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      <button onClick={capturePhoto} className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors">
                        Capture
                      </button>
                      <button onClick={stopCamera} className="bg-gray-600 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:bg-gray-700 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </>
                ) : image2 ? (
                  <>
                    <img src={image2} alt="Current" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setImage2(null)} className="text-white text-sm font-medium flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg hover:bg-black/70 transition-colors">
                        <Camera size={16} /> Retake Photo
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <button onClick={startCamera} className="flex flex-col items-center hover:text-blue-500 transition-colors">
                      <Camera size={32} className="mb-2" />
                      <span className="text-sm font-medium">Click to open camera</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="mb-6 h-20 flex items-center justify-center">
            {isAnalyzing ? (
              <div className="flex items-center gap-3 text-blue-600">
                <div className="animate-spin w-6 h-6 border-2 border-current border-t-transparent rounded-full" />
                <span className="font-medium animate-pulse">Analyzing facial embeddings for the two uploaded image</span>
              </div>
            ) : similarity !== null ? (
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${similarity >= 80 ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} w-full justify-center`}>
                {similarity >= 80 ? <CheckCircle size={24} className="text-green-600" /> : <AlertCircle size={24} className="text-red-600" />}
                <div>
                  <p className="font-bold text-lg">Similarity Match: {similarity}%</p>
                  <p className="text-sm opacity-90">
                    {similarity >= 80 ? 'High confidence match. Identity verified.' : 'Low confidence match. Please try again with clearer photos.'}
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Upload both photos to begin the analysis.</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 border-t border-gray-100 pt-6">
            <button
              onClick={resetModal}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              disabled={isAnalyzing}
            >
              Reset
            </button>
            <button
              onClick={analyzeFaces}
              disabled={!image1 || !image2 || isAnalyzing}
              className="flex-[2] flex justify-center items-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-md shadow-blue-200"
            >
              <Scan size={20} />
              {isAnalyzing ? 'Processing...' : 'Analyze Similarity'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognitionModal;
