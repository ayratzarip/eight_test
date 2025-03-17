"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/test");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setDbData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  if (status === "loading") {
    return <div className="p-8">Loading session...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Not logged in</h1>
        <Link href="/auth/signin">
          <Button>Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Session</CardTitle>
          <CardDescription>Currently logged in as</CardDescription>
        </CardHeader>
        <CardContent>
          {session?.user?.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || "User"}
              className="w-20 h-20 rounded-full mb-4" 
            />
          )}
          <div className="mb-4">
            <p><strong>Name:</strong> {session?.user?.name}</p>
            <p><strong>Email:</strong> {session?.user?.email}</p>
            <p><strong>ID:</strong> {session?.user?.id}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/api/auth/signout">
            <Button variant="outline">Sign out</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Data</CardTitle>
          <CardDescription>Users stored in the database</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading database data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : !dbData ? (
            <p>No data available</p>
          ) : (
            <div>
              <h3 className="font-medium mb-2">All Users ({dbData.allUsers.length}):</h3>
              <div className="space-y-4">
                {dbData.allUsers.map((user: any) => (
                  <div key={user.id} className="p-4 border rounded">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Providers:</strong> {user.accounts.map((a: any) => a.provider).join(", ") || "None"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={fetchData} disabled={loading}>
            Refresh Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}