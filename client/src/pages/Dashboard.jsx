import { useState, useEffect } from 'react';
import {
  RiTeamLine, RiUserFollowLine, RiTaskLine, RiCheckboxCircleLine,
} from 'react-icons/ri';
import { dashboardService } from '../services/dashboardService';
import StatsCard from '../components/dashboard/StatsCard';
import { TaskStatusPieChart, DepartmentBarChart } from '../components/dashboard/TaskChart';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { PageSpinner } from '../components/common/Spinner';
import toast from 'react-hot-toast';

const STATS_CONFIG = [
  { key: 'totalEmployees',  title: 'Total Employees',   gradient: 'stat-gradient-blue',   icon: RiTeamLine },
  { key: 'activeEmployees', title: 'Active Employees',  gradient: 'stat-gradient-teal',   icon: RiUserFollowLine },
  { key: 'pendingTasks',    title: 'Pending Tasks',     gradient: 'stat-gradient-orange', icon: RiTaskLine },
  { key: 'completedTasks',  title: 'Completed Tasks',   gradient: 'stat-gradient-purple', icon: RiCheckboxCircleLine },
];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await dashboardService.getStats();
      setData(res.data);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <PageSpinner />;

  const { stats = {}, charts = {}, recentActivity = {} } = data || {};

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS_CONFIG.map(({ key, title, gradient, icon }) => (
          <StatsCard
            key={key}
            title={title}
            value={stats[key] ?? 0}
            gradient={gradient}
            icon={icon}
            subtitle={
              key === 'activeEmployees'
                ? `${stats.inactiveEmployees ?? 0} inactive`
                : key === 'pendingTasks'
                ? `${stats.totalTasks ?? 0} total tasks`
                : key === 'completedTasks'
                ? `${Math.round(((stats.completedTasks ?? 0) / Math.max(stats.totalTasks, 1)) * 100)}% completion rate`
                : `Across all departments`
            }
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskStatusPieChart data={charts.taskStatus || []} />
        <DepartmentBarChart data={charts.departmentBreakdown || []} />
      </div>

      {/* Activity Feed */}
      <ActivityFeed
        tasks={recentActivity.tasks || []}
        employees={recentActivity.employees || []}
      />
    </div>
  );
};

export default Dashboard;
