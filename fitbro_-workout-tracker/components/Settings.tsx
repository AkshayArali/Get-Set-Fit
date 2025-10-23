import React, { useState } from 'react';
import { AppSettings } from '../types';
import { SunIcon, MoonIcon, BellIcon, TimerIcon, DownloadIcon, UploadIcon } from './icons';

interface SettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSave, onExport, onImport, onCancel }) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  const handleSave = () => {
    onSave(localSettings);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setLocalSettings(prev => ({ ...prev, theme }));
  };

  const handleUnitsChange = (units: 'metric' | 'imperial') => {
    setLocalSettings(prev => ({ ...prev, units }));
  };

  const handleNotificationsChange = (notifications: boolean) => {
    setLocalSettings(prev => ({ ...prev, notifications }));
  };

  const handleAutoStartTimerChange = (autoStartTimer: boolean) => {
    setLocalSettings(prev => ({ ...prev, autoStartTimer }));
  };

  const handleDefaultRestTimeChange = (defaultRestTime: number) => {
    setLocalSettings(prev => ({ ...prev, defaultRestTime }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Theme Selection */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Theme</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleThemeChange('light')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                localSettings.theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <SunIcon className="w-5 h-5" />
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                localSettings.theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MoonIcon className="w-5 h-5" />
              Dark
            </button>
          </div>
        </div>

        {/* Units Selection */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Units</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleUnitsChange('metric')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                localSettings.units === 'metric'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Metric (kg, cm)
            </button>
            <button
              onClick={() => handleUnitsChange('imperial')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                localSettings.units === 'imperial'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Imperial (lbs, ft)
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BellIcon className="w-5 h-5 text-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <p className="text-sm text-gray-400">Get workout reminders and updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.notifications}
                onChange={(e) => handleNotificationsChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Auto Start Timer */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TimerIcon className="w-5 h-5 text-gray-300" />
              <div>
                <h3 className="text-lg font-semibold text-white">Auto Start Timer</h3>
                <p className="text-sm text-gray-400">Automatically start rest timer between sets</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.autoStartTimer}
                onChange={(e) => handleAutoStartTimerChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Default Rest Time */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Default Rest Time</h3>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="30"
              max="300"
              step="15"
              value={localSettings.defaultRestTime}
              onChange={(e) => handleDefaultRestTimeChange(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white font-mono w-16">
              {Math.floor(localSettings.defaultRestTime / 60)}:{(localSettings.defaultRestTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Data Management</h3>
          <div className="flex gap-4">
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <DownloadIcon className="w-4 h-4" />
              Export Data
            </button>
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <UploadIcon className="w-4 h-4" />
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={onImport}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Export your workout data as a backup or import previously exported data.
          </p>
        </div>

        {/* Offline Mode Info */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">Offline Mode</h3>
          <p className="text-sm text-blue-200">
            This app is designed to work offline. All your data is stored locally on your device, 
            ensuring your workouts are always accessible even without an internet connection.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Save Settings
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Settings;
