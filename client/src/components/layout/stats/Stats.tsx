import { fetchCallsStats } from '../../../api/calls';
import { useState, useEffect } from 'react';
import type { StatsData } from '../../../types/call';
import './Stats.scss';

const Stats: React.FC = () => {

  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchCallsStats();
        setStats(data);
      } catch (err) {
        alert("Не удалось загрузить статистику");
        console.error(err);
      }
    };

    loadStats();
  }, []);

  return (
     <div className="stats">
      <h2 className="stats__title">Statistics</h2>
      <ul className="stats__list">
        <li className="stats__item">
          <span className="stats__label">Total calls:</span>
          <span className="stats__value">{stats?.total}</span>
        </li>
        <li className="stats__item">
          <span className="stats__label">Qualified:</span>
          <span className="stats__value">{stats?.qualified}</span>
        </li>
        <li className="stats__item">
          <span className="stats__label">Not qualified:</span>
          <span className="stats__value">{stats?.notQualified}</span>
        </li>
        <li className="stats__item">
          <span className="stats__label">Completed:</span>
          <span className="stats__value">{stats?.completed}</span>
        </li>
        <li className="stats__item">
          <span className="stats__label">Missed:</span>
          <span className="stats__value">{stats?.missed}</span>
        </li>
        <li className="stats__item">
          <span className="stats__label">Average Duration:</span>
          <span className="stats__value">{stats?.avgDuration}</span>
        </li>
        <li className="stats__item">
          <span className="stats__label">Total Duration:</span>
          <span className="stats__value">{stats?.totalDuration}</span>
        </li>
      </ul>
    </div>
  )
}

export default Stats;