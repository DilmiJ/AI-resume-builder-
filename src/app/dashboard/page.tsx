"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Resume {
  _id: string;
  title: string;
  personalInfo: {
    firstName: string;
    lastName: string;
  };
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && session) {
      fetchResumes();
    }
  }, [status, session, router]);

  const fetchResumes = async () => {
    try {
      // For now, we'll use a mock API call since we need to implement the session-based API
      // In a real implementation, you'd pass the session token to your API
      setResumes([]);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Resume Builder
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session.user.firstName}!
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Resume Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your resumes and create new ones with AI assistance.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-blue-600">📝</span>
                <span>Create New Resume</span>
              </CardTitle>
              <CardDescription>
                Start building a new professional resume from scratch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/builder">Create Resume</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-green-600">🎨</span>
                <span>Browse Templates</span>
              </CardTitle>
              <CardDescription>
                Explore our collection of professional resume templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/templates">View Templates</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-purple-600">🎯</span>
                <span>Job Matching</span>
              </CardTitle>
              <CardDescription>
                Find jobs that match your skills and experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <Link href="/job-matching">Find Jobs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Resumes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Resumes
          </h2>

          {resumes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resumes yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first resume to get started on your job search
                  journey.
                </p>
                <Button asChild>
                  <Link href="/builder">Create Your First Resume</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card
                  key={resume._id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="truncate">{resume.title}</CardTitle>
                    <CardDescription>
                      {resume.personalInfo.firstName}{" "}
                      {resume.personalInfo.lastName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Last updated:{" "}
                      {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" asChild>
                        <Link href={`/builder/${resume._id}`}>Edit</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/preview/${resume._id}`}>Preview</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
