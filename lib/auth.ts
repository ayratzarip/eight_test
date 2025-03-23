import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";

// Middleware for API routes to check authentication
export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  try {
    // Get the session using headers()
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return handler(req);
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: 'Authentication error' },
      { status: 500 }
    );
  }
}

export { prisma, PrismaAdapter };