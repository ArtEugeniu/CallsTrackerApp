import './CallsContainer.scss';
import { useState, useEffect } from 'react';
import type { Call } from '../../../types/call';
import * as API from '../../../api/calls';
import CallsFormWrapper from './CallsFormWrapper';
import CallsListWrapper from './CallsListWrapper';
import Pagination from './Pagination';
import Stats from '../../layout/stats/Stats';

const CallsContainer: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadCalls = async (pageNumber = page) => {
    try {
      const data = await API.fetchCalls(pageNumber);
      setCalls(data.calls);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching calls:", err);
    }
  };

  useEffect(() => {
    loadCalls(page);
  }, [page]);

  const goNext = () => setPage(p => Math.min(p + 1, totalPages));
  const goPrev = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div className="callsContainer">
      <div className="callsContainer__form">
        <h2>Add Call</h2>
        <CallsFormWrapper onCallAdded={() => loadCalls(page)} />
      </div>

      <div className="callsContainer__list">
        <h2>Calls List</h2>
        <CallsListWrapper calls={calls} reloadCalls={() => loadCalls(page)} />
        <Pagination page={page} totalPages={totalPages} onPrev={goPrev} onNext={goNext} />
      </div>
      <Stats />
    </div>
  );
};

export default CallsContainer;