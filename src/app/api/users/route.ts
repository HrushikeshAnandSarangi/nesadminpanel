import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Collection1");
    
    if (!db) {
      return NextResponse.json(
        { error: 'Database connection failed' }, 
        { status: 500 }
      );
    }

    const users = await db.collection('Users').find({}).toArray();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch users', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}