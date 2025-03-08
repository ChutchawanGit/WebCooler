// src/utils.js
// Utility functions for image processing, storage management, etc.

/**
 * Resize and compress an image to reduce storage size
 * @param {string} base64Image - The base64 string of the image
 * @param {number} maxWidth - Maximum width of the resized image
 * @param {number} quality - Quality of the compressed image (0-1)
 * @returns {Promise<string>} - Promise that resolves with the compressed base64 image
 */
export function resizeAndCompressImage(base64Image, maxWidth = 800, quality = 0.7) {
      // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      try {
        // Check if input is valid
        if (!base64Image || typeof base64Image !== 'string' || !base64Image.startsWith('data:image')) {
          console.log('Invalid image input, returning original');
          resolve(base64Image);
          return;
        }
  
        // Create image element
        const img = new Image();
        
        // Set up onload handler before setting src
        img.onload = () => {
          console.log(`Original image size: ${img.width}x${img.height}`);
          
          // Calculate new dimensions
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = Math.floor(height * ratio);
          }
          
          console.log(`Resized dimensions: ${width}x${height}`);
          
          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          // Draw image on canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to compressed JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          
          console.log(`Original size: ~${Math.round(base64Image.length / 1024)}KB, Compressed: ~${Math.round(compressedBase64.length / 1024)}KB`);
          
          resolve(compressedBase64);
        };
        
        // Set up error handler
        img.onerror = (error) => {
          console.error('Error loading image for compression:', error);
          resolve(base64Image); // Return original on error
        };
        
        // Set src to trigger loading (must be after setting onload)
        img.src = base64Image;
      } catch (error) {
        console.error('Error in image compression:', error);
        resolve(base64Image); // Return original on error
      }
    });
  }
  
  /**
   * Convert file size from bytes to human-readable format
   * @param {number} bytes - File size in bytes
   * @returns {string} - Human-readable file size
   */
  export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  /**
   * Check total localStorage usage
   * @returns {Object} - Storage information
   */
  export function checkStorageUsage() {
    let totalSize = 0;
    let items = {};
    
    // Measure each item
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const size = (key.length + value.length) * 2; // UTF-16 uses 2 bytes per char
      
      totalSize += size;
      items[key] = size;
    }
    
    // Format for output
    const result = {
      totalSize: formatFileSize(totalSize),
      items: {}
    };
    
    for (const key in items) {
      result.items[key] = formatFileSize(items[key]);
    }
    
    return result;
  }
  
  /**
   * Clear specific content from localStorage
   * @param {string} prefix - Prefix of keys to clear (e.g., 'siteContent_')
   */
  export function clearStorageByPrefix(prefix) {
    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return keysToRemove.length;
  }