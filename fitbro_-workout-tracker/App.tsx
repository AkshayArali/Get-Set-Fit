
import React, { useState, useEffect, useCallback } from 'react';
import { WorkoutPlan, WorkoutLog, AppSettings } from './types';
import * as storage from './services/storageService';
import WorkoutDashboard from './components/WorkoutDashboard';
import WorkoutCreator from './components/WorkoutCreator';
import WorkoutHistory from './components/WorkoutHistory';
import ActiveWorkout from './components/ActiveWorkout';
import Settings from './components/Settings';
import { ArrowLeftIcon, SettingsIcon, OfflineIcon } from './components/icons';

type View = 'DASHBOARD' | 'CREATE_WORKOUT' | 'HISTORY' | 'ACTIVE_WORKOUT' | 'SETTINGS';

const App: React.FC = () => {
  const [view, setView] = useState<View>('DASHBOARD');
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setPlans(storage.getWorkoutPlans());
    setLogs(storage.getWorkoutLogs());
    setSettings(storage.getSettings());
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const savePlans = useCallback((newPlans: WorkoutPlan[]) => {
    setPlans(newPlans);
    storage.saveWorkoutPlans(newPlans);
  }, []);
  
  const saveLogs = useCallback((newLogs: WorkoutLog[]) => {
    setLogs(newLogs);
    storage.saveWorkoutLogs(newLogs);
  }, []);

  const handleSavePlan = (plan: WorkoutPlan) => {
    const existingIndex = plans.findIndex(p => p.id === plan.id);
    let newPlans;
    if (existingIndex > -1) {
      newPlans = [...plans];
      newPlans[existingIndex] = plan;
    } else {
      newPlans = [...plans, plan];
    }
    savePlans(newPlans);
    setView('DASHBOARD');
  };

  const handleDeletePlan = (planId: string) => {
    if(window.confirm("Are you sure you want to delete this workout plan?")) {
        const newPlans = plans.filter(p => p.id !== planId);
        savePlans(newPlans);
    }
  };

  const handleStartWorkout = (plan: WorkoutPlan) => {
    setActivePlan(plan);
    setView('ACTIVE_WORKOUT');
  };

  const handleFinishWorkout = (log: WorkoutLog) => {
    saveLogs([...logs, log]);
    setView('DASHBOARD');
    setActivePlan(null);
  };
  
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to delete all workout history? This cannot be undone.")) {
        saveLogs([]);
    }
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    storage.saveSettings(newSettings);
  };

  const handleExportData = () => {
    const data = storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `get-set-fit-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;
      if (storage.importData(data)) {
        setPlans(storage.getWorkoutPlans());
        setLogs(storage.getWorkoutLogs());
        setSettings(storage.getSettings());
        alert('Data imported successfully!');
      } else {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };
  
  const renderHeader = () => {
    if (view !== 'DASHBOARD') {
        return (
            <header className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                        Back to Dashboard
                    </button>
                    <div className="flex items-center gap-2">
                        {!isOnline && (
                            <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                <OfflineIcon className="w-4 h-4" />
                                Offline
                            </div>
                        )}
                        <button onClick={() => setView('SETTINGS')} className="p-2 text-gray-300 hover:text-white transition-colors">
                            <SettingsIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>
        )
    }
    return (
        <header className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Get Set Fit</h1>
                <div className="flex items-center gap-2">
                    {!isOnline && (
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <OfflineIcon className="w-4 h-4" />
                            Offline
                        </div>
                    )}
                    <button onClick={() => setView('SETTINGS')} className="p-2 text-gray-300 hover:text-white transition-colors">
                        <SettingsIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'CREATE_WORKOUT':
        return <WorkoutCreator onSave={handleSavePlan} onCancel={() => setView('DASHBOARD')} />;
      case 'HISTORY':
        return <WorkoutHistory logs={logs} onClearHistory={handleClearHistory} />;
      case 'ACTIVE_WORKOUT':
        return activePlan ? <ActiveWorkout plan={activePlan} onFinish={handleFinishWorkout} onCancel={() => setView('DASHBOARD')} /> : null;
      case 'SETTINGS':
        return (
          <Settings
            settings={settings}
            onSave={handleSaveSettings}
            onExport={handleExportData}
            onImport={handleImportData}
            onCancel={() => setView('DASHBOARD')}
          />
        );
      case 'DASHBOARD':
      default:
        return (
          <WorkoutDashboard
            plans={plans}
            logs={logs}
            onStartWorkout={handleStartWorkout}
            onCreateWorkout={() => setView('CREATE_WORKOUT')}
            onViewHistory={() => setView('HISTORY')}
            onDeletePlan={handleDeletePlan}
          />
        );
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans">
      <div className="container mx-auto max-w-4xl">
        {renderHeader()}
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;
