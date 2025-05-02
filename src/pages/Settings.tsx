import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Bell, Shield, Smartphone, UserCog, ChevronRight } from 'lucide-react'

function Settings() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <UserCog className="text-primary" size={24} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Account Settings Section */}
        <section className="bg-white rounded-2xl shadow-lg shadow-primary/5 p-6 border border-primary/10">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Account Settings</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/changeEmail')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Change Email</p>
                  <p className="text-sm text-gray-500">Update your email address</p>
                </div>
              </div>
              <ChevronRight className="text-primary" size={20} />
            </button>

            <button
              onClick={() => navigate('/changePassword')}
              className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="text-primary" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Change Password</p>
                  <p className="text-sm text-gray-500">Update your password</p>
                </div>
              </div>
              <ChevronRight className="text-primary" size={20} />
            </button>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white rounded-2xl shadow-lg shadow-primary/5 p-6 border border-primary/10">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Preferences</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Notifications</p>
                  <p className="text-sm text-gray-500">Manage notification preferences</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Smartphone className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mobile Notifications</p>
                  <p className="text-sm text-gray-500">Push notifications to your device</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Settings