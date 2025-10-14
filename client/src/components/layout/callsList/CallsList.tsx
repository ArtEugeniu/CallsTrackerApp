import { useState } from "react";
import "./CallsList.scss";

type Call = {
  id: number | string;
  phone_number: string;
  contact_name: string;
  call_date: string;
  duration_seconds: number;
  status: "completed" | "missed" | "scheduled";
  outcome: "qualified" | "not_qualified" | "callback" | "not_interested";
  notes: string;
};

type Props = {
  calls: Call[];
  onDelete: (id: number | string) => void;
  onUpdate: (call: Call) => void;
};

const CallsList: React.FC<Props> = ({ calls, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editData, setEditData] = useState<Partial<Call>>({});

  const handleEditClick = (call: Call) => {
    setEditingId(call.id);
    setEditData({
      ...call,
      call_date: new Date(call.call_date).toISOString().slice(0, 16)
    });
  };

  const handleChange = (field: keyof Call, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(editData as Call);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  if (calls.length === 0) return <p className="calls-list__empty">No calls yet.</p>;

  return (
    <table className="calls-list">
      <thead className="calls-list__head">
        <tr>
          <th>Phone</th>
          <th>Name</th>
          <th>Date</th>
          <th>Duration</th>
          <th>Status</th>
          <th>Outcome</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="calls-list__body">
        {calls.map(call => (
          <tr key={call.id} className="calls-list__row">
            {editingId === call.id ? (
              <>
                <td>
                  <input
                    value={editData.phone_number}
                    onChange={e => handleChange("phone_number", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={editData.contact_name}
                    onChange={e => handleChange("contact_name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    value={editData.call_date || ""}
                    onChange={e => handleChange("call_date", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={editData.duration_seconds}
                    onChange={e => handleChange("duration_seconds", e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={editData.status}
                    onChange={e => handleChange("status", e.target.value)}
                  >
                    <option value="completed">Completed</option>
                    <option value="missed">Missed</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </td>
                <td>
                  <select
                    value={editData.outcome}
                    onChange={e => handleChange("outcome", e.target.value)}
                  >
                    <option value="qualified">Qualified</option>
                    <option value="not_qualified">Not Qualified</option>
                    <option value="callback">Callback</option>
                    <option value="not_interested">Not Interested</option>
                  </select>
                </td>
                <td>
                  <textarea
                    value={editData.notes}
                    onChange={e => handleChange("notes", e.target.value)}
                  />
                </td>
                <td>
                  <button className="calls-list__button" onClick={handleSave}>Save</button>
                  <button className="calls-list__button" onClick={handleCancel}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{call.phone_number}</td>
                <td>{call.contact_name}</td>
                <td>{new Date(call.call_date).toLocaleString()}</td>
                <td>{call.duration_seconds}</td>
                <td>{call.status}</td>
                <td>{call.outcome}</td>
                <td>{call.notes}</td>
                <td>
                  <button className="calls-list__button" onClick={() => handleEditClick(call)}>Edit</button>
                  <button className="calls-list__button" onClick={() => onDelete(call.id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CallsList;