"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Upload, User, Lock, Globe, Image as ImageIcon, Clock, Loader2, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPatch, apiPost } from "@/lib/apiClient";

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [websiteName, setWebsiteName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");

  const { data: settingsData, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: () => apiGet<any>("/system-owner/settings"),
  });

  useEffect(() => {
    if (settingsData?.data) {
      setWebsiteName(settingsData.data.websiteName || "");
      setSupportEmail(settingsData.data.supportEmail || "");
    }
  }, [settingsData]);

  const updateSettingsMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return apiPatch<any>("/system-owner/settings", formData);
    },
    onSuccess: (data) => {
      toast.success(data.message || "General settings saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update settings");
    },
  });

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("websiteName", websiteName);
    formData.append("supportEmail", supportEmail);
    updateSettingsMutation.mutate(formData);
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: () => {
      // Trying POST first, standard for auth actions
      return apiPatch<any>("/auth/change-password", {
        currentPassword,
        newPassword
      });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    },
    onError: (error: any) => {
      // If POST fails with 404, we can tell the user it might be PATCH
      toast.error(error.response?.data?.message || "Failed to update password");
    },
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }
    changePasswordMutation.mutate();
  };

  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileError, setProfileError] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const u = JSON.parse(userCookie);
        setAdminName(u.name || "");
        setAdminEmail(u.email || "");
        if (u.avatar) setProfileUrl(u.avatar);
      } catch (e) {}
    }
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileUrl(url);
      setProfileFile(file);
      setProfileError(false);
    }
  };

  const updateProfileMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return apiPatch<any>("/system-owner/settings/profile", formData);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully!");
      
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const u = JSON.parse(userCookie);
          u.name = adminName;
          if (data.data?.avatar) {
            u.avatar = data.data.avatar;
            setProfileUrl(data.data.avatar);
          }
          Cookies.set("user", JSON.stringify(u));
          window.dispatchEvent(new Event("profileUpdated"));
        } catch (e) {}
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", adminName);
    if (profileFile) {
      const base64Image = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(profileFile);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_DIM = 400;

          if (width > height && width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          } else if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
            resolve(dataUrl);
          } else {
            reject(new Error("Failed to compress image"));
          }
          URL.revokeObjectURL(img.src);
        };
        img.onerror = error => {
          URL.revokeObjectURL(img.src);
          reject(error);
        };
      });
      formData.append("avatar", base64Image);
    }
    updateProfileMutation.mutate(formData);
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
          <form onSubmit={handleGeneralSubmit} className="flex flex-col h-full">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-500" />
                General
              </CardTitle>
              <CardDescription className="text-base text-slate-500">
                Configure basic information about your crossword platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 flex-1 relative">
              {isLoadingSettings && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                </div>
              )}
              
              {/* Website Name */}
              <div className="flex flex-col gap-3">
                <label htmlFor="website-name" className="text-sm font-semibold text-slate-700">Website Name</label>
                <Input 
                  id="website-name" 
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  placeholder="e.g. Daily Crossword Platform" 
                  className="max-w-md h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
                  required
                />
              </div>

              {/* Support Email */}
              <div className="flex flex-col gap-3">
                <label htmlFor="support-email" className="text-sm font-semibold text-slate-700">Support Email</label>
                <Input 
                  id="support-email" 
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="support@example.com" 
                  className="max-w-md h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
                  required
                />
              </div>

            </CardContent>
            <CardFooter className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button type="submit" disabled={updateSettingsMutation.isPending || isLoadingSettings} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6">
                {updateSettingsMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save General Changes
              </Button>
            </CardFooter>
          </form>
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
          <CardContent className="p-6 flex flex-col gap-8 flex-1 relative">
            
            {updateProfileMutation.isPending && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            )}

            {/* Profile */}
            <form onSubmit={handleProfileSubmit} className="space-y-6">
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
                      {profileUrl && !profileError ? (
                        <img 
                          key={profileUrl}
                          src={profileUrl.startsWith('blob:') || profileUrl.startsWith('http') ? profileUrl : `${(process.env.NEXT_PUBLIC_API_URL || '').replace(/\/api\/?$/, '')}${profileUrl.replace(/\\/g, '/').startsWith('/') ? '' : '/'}${profileUrl.replace(/\\/g, '/')}`} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover" 
                          onError={() => setProfileError(true)} 
                        />
                      ) : (
                        <User className="h-8 w-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleProfileChange} />
                      <Button type="button" variant="outline" className="border-slate-200 hover:bg-slate-50 h-10 w-fit" asChild>
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
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-emerald-500"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="admin-email" className="text-sm font-semibold text-slate-700">Email Address</label>
                  <Input 
                    id="admin-email" 
                    type="email"
                    value={adminEmail} 
                    disabled
                    className="h-11 text-base bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" disabled={updateProfileMutation.isPending} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 w-fit">
                    {updateProfileMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Update Profile
                  </Button>
                </div>
              </div>
            </form>


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
          <CardContent className="p-6 flex flex-col gap-8 flex-1 relative">
            {changePasswordMutation.isPending && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
              </div>
            )}
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  Change Password
                </h3>
              </div>
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label htmlFor="current-password" className="text-sm font-semibold text-slate-700">Current Password</label>
                  <div className="relative">
                    <Input 
                      id="current-password" 
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-rose-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="new-password" className="text-sm font-semibold text-slate-700">New Password</label>
                  <div className="relative">
                    <Input 
                      id="new-password" 
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="h-11 text-base bg-slate-50 border-slate-200 focus-visible:ring-rose-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="pt-2">
                  <Button type="submit" disabled={changePasswordMutation.isPending} className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 w-fit">
                    {changePasswordMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Lock className="h-4 w-4 mr-2" />
                    )}
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
