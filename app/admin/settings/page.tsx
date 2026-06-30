"use client";

import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Upload, User, Lock, Globe, Image as ImageIcon, Clock } from "lucide-react";

export default function SettingsPage() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
        <p className="text-slate-500 font-medium text-base mt-1">Manage your platform and account preferences.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        
        {/* General Settings Section */}
        <Card className="flex flex-col border-slate-200 shadow-sm overflow-hidden h-full">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-500" />
              General
            </CardTitle>
            <CardDescription className="text-base text-slate-500">
              Configure basic information about your crossword platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6 flex-1">
            
            {/* Website Name */}
            <div className="flex flex-col gap-3">
              <label htmlFor="website-name" className="text-sm font-semibold text-slate-700">Website Name</label>
              <Input 
                id="website-name" 
                defaultValue="Daily Crossword Platform" 
                className="max-w-md h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
              />
            </div>

            {/* Logo */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700 block">Platform Logo</label>
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleLogoChange} />
                  <Button variant="outline" className="border-slate-200 hover:bg-slate-50 h-10 w-fit" asChild>
                    <label htmlFor="logo-upload" className="cursor-pointer flex items-center">
                      <Upload className="h-4 w-4 mr-2 text-slate-500" /> Upload New Logo
                    </label>
                  </Button>
                  <span className="text-xs text-slate-400">Recommended size: 256x256px. Max 2MB.</span>
                </div>
              </div>
            </div>

            {/* Support Email */}
            <div className="flex flex-col gap-3">
              <label htmlFor="support-email" className="text-sm font-semibold text-slate-700">Support Email</label>
              <Input 
                id="support-email" 
                type="email"
                defaultValue="support@crossword.com" 
                className="max-w-md h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
              />
            </div>

          </CardContent>
          <CardFooter className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
            <Button onClick={() => toast.success("General settings saved successfully!")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6">
              <Save className="h-4 w-4 mr-2" />
              Save General Changes
            </Button>
          </CardFooter>
        </Card>


        {/* Admin Account Section */}
        <Card className="flex flex-col border-slate-200 shadow-sm overflow-hidden h-full">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <User className="h-5 w-5 text-emerald-500" />
              Admin Account
            </CardTitle>
            <CardDescription className="text-base text-slate-500">
              Update your personal profile and security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-8 flex-1">
            
            {/* Profile */}
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  Profile Details
                </h3>
              </div>
              
              <div className="flex flex-col gap-5">
                {/* Profile Image */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-slate-700 block">Profile Image</label>
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                      {profileUrl ? (
                        <img src={profileUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-8 w-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleProfileChange} />
                      <Button variant="outline" className="border-slate-200 hover:bg-slate-50 h-10 w-fit" asChild>
                        <label htmlFor="profile-upload" className="cursor-pointer flex items-center">
                          <Upload className="h-4 w-4 mr-2 text-slate-500" /> Upload Profile Image
                        </label>
                      </Button>
                      <span className="text-xs text-slate-400">Recommended size: 256x256px. Max 2MB.</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="admin-name" className="text-sm font-semibold text-slate-700">Full Name</label>
                  <Input 
                    id="admin-name" 
                    defaultValue="Admin User" 
                    className="h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="admin-email" className="text-sm font-semibold text-slate-700">Email Address</label>
                  <Input 
                    id="admin-email" 
                    type="email"
                    defaultValue="admin@example.com" 
                    className="h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="pt-2">
                  <Button onClick={() => toast.success("Profile updated successfully!")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 w-fit">
                    <Save className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Security Settings Section */}
        <Card className="flex flex-col border-slate-200 shadow-sm overflow-hidden h-full">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
              <Lock className="h-5 w-5 text-rose-500" />
              Security Settings
            </CardTitle>
            <CardDescription className="text-base text-slate-500">
              Manage your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-8 flex-1">
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  Change Password
                </h3>
              </div>
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label htmlFor="current-password" className="text-sm font-semibold text-slate-700">Current Password</label>
                  <Input 
                    id="current-password" 
                    type="password"
                    placeholder="••••••••" 
                    className="h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-rose-500"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="new-password" className="text-sm font-semibold text-slate-700">New Password</label>
                  <Input 
                    id="new-password" 
                    type="password"
                    placeholder="••••••••" 
                    className="h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-rose-500"
                  />
                </div>
                <div className="pt-2">
                  <Button onClick={() => toast.success("Password updated successfully!")} className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 w-fit">
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
