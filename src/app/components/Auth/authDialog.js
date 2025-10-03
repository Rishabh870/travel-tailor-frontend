"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Chrome } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export function AuthDialog({ open, onOpenChange, onAuthSuccess }) {
  const { toast } = useToast();

  const [selectedTab, setSelectedTab] = useState("login"); // "login" | "signup"
  const [showOtp, setShowOtp] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [resendIn, setResendIn] = useState(0); // seconds until resend can happen
  const timerRef = useRef(null);

  const API_BASE = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "",
    []
  );

  const resetForm = () => {
    setEmail("");
    setName("");
    setProfileImg("");
    setOtp("");
    setShowOtp(false);
    setResendIn(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  useEffect(() => {
    const google = window.google;
    if (!google) return;

    // Initialize Google Sign-In client after loading the script
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    // Render Google One Tap (Optional, you can use either One Tap or button)
    google.accounts.id.prompt();
  }, []);

  const handleGoogleResponse = async (response) => {
    const idToken = response?.credential;
    if (!idToken) {
      toast({
        title: "Error",
        description: "Google sign-in failed: No credentials received",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Send the Google ID token to the backend for verification and session creation
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Google sign-in failed");
      }

      localStorage.setItem("token", data.token); // Store token in localStorage
      toast({
        title: "Success",
        description: data?.message || "Signed in successfully",
      });

      onAuthSuccess?.({ token: data.token, user: data.user });
      onOpenChange(false); // Close the authentication modal if it's open
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Google sign-in failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    if (selectedTab === "signup" && !name) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Check if email exists (optional step)
      const check = await fetch(`${API_BASE}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).then((r) => r.json());

      if (selectedTab === "login" && check?.exists === false) {
        toast({
          title: "Account not found",
          description: "Please sign up first",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      if (selectedTab === "signup" && check?.exists === true) {
        toast({
          title: "Account already exists",
          description: "Switch to Login tab to continue",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Request OTP for login/signup
      const res = await fetch(`${API_BASE}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: selectedTab }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(payload?.message || `Failed (${res.status})`);

      setShowOtp(true);
      startResendTimer(30);
      toast({
        title: "OTP sent",
        description: "Check your email for the code",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err?.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the 6-digit code",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          type: selectedTab, // "login" | "signup"
          name: selectedTab === "signup" ? name : undefined,
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          payload?.message || `OTP verification failed (${res.status})`
        );

      if (payload?.token) localStorage.setItem("token", payload.token);

      toast({
        title: "Success",
        description: payload?.message || "You're now logged in!",
      });
      onAuthSuccess?.({ token: payload.token, user: payload.user });
      resetForm();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err?.message || "OTP verification failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || !email) return;
    await handleEmailSubmit();
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setShowOtp(false);
    setOtp("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            {selectedTab === "login" ? "Welcome Back" : "Create your account"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Google */}
          <Button
            variant="outline"
            className="w-full gap-2 border-border hover:bg-accent transition-all duration-200 hover:scale-[1.02]"
            onClick={() => google.accounts.id.prompt()} // Trigger the Google One Tap prompt
            disabled={loading}
          >
            <Chrome className="h-5 w-5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Tabs for login/signup */}
          <Tabs value={selectedTab} onValueChange={handleTabChange}>
            <TabsList className="grid  w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent
              value="login"
              className="flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-300"
            >
              {!showOtp ? (
                <>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleEmailSubmit}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in-0 duration-300">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="otp">Enter 6-digit code</Label>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleOtpVerify}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={() => setShowOtp(false)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={handleResend}
                      disabled={resendIn > 0}
                    >
                      {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent
              value="signup"
              className="flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-300"
            >
              {!showOtp ? (
                <>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signup-img">
                      Profile Image URL (optional)
                    </Label>
                    <Input
                      id="signup-img"
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={profileImg}
                      onChange={(e) => setProfileImg(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleEmailSubmit}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in-0 duration-300">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="otp">Enter 6-digit code</Label>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleOtpVerify}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={() => setShowOtp(false)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={handleResend}
                      disabled={resendIn > 0}
                    >
                      {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
