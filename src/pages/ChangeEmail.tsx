import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ChangeEmail() {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { updateEmail, isEmailUpdating } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmail(newEmail, currentPassword);
  };

  if(isEmailUpdating) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6 sm:px-0">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-2">
      <button
        onClick={() => navigate("/settings")}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
      >
        <ArrowLeft size={20} />
        <span>Back to Settings</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 p-8 border border-primary/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="text-primary" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Change Email</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              New Email Address
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Enter your new email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="Enter your current password"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="flex-1 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              Update Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeEmail;
