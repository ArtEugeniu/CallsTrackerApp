import './CallsContainer.scss';
import { useState, useEffect } from 'react';
import CallsForm from '../../layout/callsForm/CallsForm';
import CallsList from '../../layout/callsList/CallsList';
import type { Call } from '../../../types/call';
import * as API from '../../../api/calls';

const CallsContainer: React.FC = () => {
  const [calls, setCalls] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageLimit: number = 10

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
    loadCalls(page)
  }, [page]);

  const handleSaveCall = async (call: Call) => {
    try {
      await API.addCall(call);
       if (calls.length >= pageLimit) {
      setPage(totalPages + 1); 
    } else {
      loadCalls(page); 
    }
    } catch (err) {
      console.error(err);
      alert("Error adding call");
    }
  };

  const handleDeleteCall = async (id: number | string) => {
    try {
      await API.deleteCall(id);
      if (calls.length === 1 && page > 1) setPage(p => p - 1);
      else loadCalls();
    } catch (err) {
      console.error(err);
      alert("Error deleting call");
    }
  };

  const handleUpdateCall = async (updatedCall: Call) => {
    try {
      await API.updateCall(updatedCall);
      loadCalls();;
    } catch (err) {
      console.error(err);
      alert("Error updating call");
    }
  };

  const goNext = () => setPage(p => Math.min(p + 1, totalPages));
  const goPrev = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div className="callsContainer">
      <div className="callsContainer__form">
        <h2>Add Call</h2>
        <CallsForm onSave={handleSaveCall} />
      </div>
      <div className="callsContainer__list">
        <h2>Calls List</h2>
        <CallsList calls={calls} onDelete={handleDeleteCall} onUpdate={handleUpdateCall} />
        <div className="callsContainer__pagination">
          <button onClick={goPrev} disabled={page === 1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={goNext} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default CallsContainer;