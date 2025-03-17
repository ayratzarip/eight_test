"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchUserData();
    }
  }, [status, session]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();
      setUserData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get user's initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (status === "loading") {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-muted-foreground">Loading your account information...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your account information</p>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile Summary */}
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                  <AvatarFallback className="text-lg">
                    {session?.user?.name ? getInitials(session.user.name) : <User />}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-center">{session?.user?.name}</CardTitle>
                <CardDescription className="text-center">{session?.user?.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="font-mono text-xs truncate max-w-[160px]" title={session?.user?.id}>
                    {session?.user?.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Type:</span>
                  <span>
                    {userData?.accounts?.length > 0 ? userData.accounts.map((a: any) => a.provider).join(", ") : "Email"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/api/auth/signout">Sign Out</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your personal information stored in our system</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground">Loading profile data...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : !userData ? (
                    <p className="text-muted-foreground">No detailed user data available</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <div className="font-medium">Name</div>
                        <div className="text-muted-foreground">{userData.name || "Not provided"}</div>
                      </div>
                      <div className="grid gap-2">
                        <div className="font-medium">Email</div>
                        <div className="text-muted-foreground">{userData.email || "Not provided"}</div>
                      </div>
                      <div className="grid gap-2">
                        <div className="font-medium">Email Verified</div>
                        <div className="text-muted-foreground">
                          {userData.emailVerified 
                            ? new Date(userData.emailVerified).toLocaleDateString() 
                            : "Not verified"}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent sessions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData?.sessions && userData.sessions.length > 0 ? (
                    <div className="space-y-4">
                      {userData.sessions.map((session: any) => (
                        <div key={session.id} className="border rounded-md p-4">
                          <div className="grid gap-1">
                            <div className="font-medium">Session</div>
                            <div className="text-sm text-muted-foreground">
                              Expires: {new Date(session.expires).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No recent activity to display</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <div className="font-medium">Connected Accounts</div>
                      {userData?.accounts && userData.accounts.length > 0 ? (
                        <div className="space-y-2">
                          {userData.accounts.map((account: any) => (
                            <div key={account.id} className="flex items-center gap-2 text-sm">
                              <div className="font-medium capitalize">{account.provider}</div>
                              <div className="text-muted-foreground">
                                Connected
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No connected accounts</p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled className="w-full">Update Settings (Coming Soon)</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}