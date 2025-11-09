import { NextRequest } from 'next/server';
import { writeFile, access, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return Response.json({ success: false, error: 'File is not an image' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      await access(uploadDir);
    } catch {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const fileName = `${randomUUID()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Convert blob to buffer and write to file
    const buffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));

    // Return public URL
    const url = `/uploads/${fileName}`;
    
    return Response.json({ 
      success: true, 
      url: url,
      name: file.name,
      type: file.type,
      size: file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ success: false, error: 'Upload failed' }, { status: 400 });
  }
}