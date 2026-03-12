import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'djgfpcxt7',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const arrayBuffer = file.arrayBuffer();

    arrayBuffer.then(buffer => {
      const base64String = Buffer.from(buffer).toString('base64');
      const dataUrl = `data:${file.type};base64,${base64String}`;

      cloudinary.uploader.upload(
        dataUrl,
        {
          folder: 'photo-gallery',
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );
    }).catch(reject);
  });
}
