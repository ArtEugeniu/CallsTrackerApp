import React, { useState } from "react";
import "./CallsForm.scss";

type Props = {
  onSave: (call: any) => void;
};

const CallsForm: React.FC<Props> = ({ onSave }) => {
const [phone, setPhone] = useState<string>("");
const [name, setName] = useState<string>("");
const [date, setDate] = useState<string>("");
const [duration, setDuration] = useState<string>('00:00');
const [status, setStatus] = useState<string>("completed");
const [outcome, setOutcome] = useState<string>("qualified");
const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !name || !date) {
      alert("Phone, Name and Date are required");
      return;
    }

    onSave({
      phone_number: phone,
      contact_name: name,
      call_date: date,
      duration_seconds: duration,
      status,
      outcome,
      notes,
      created_at: new Date(),
      updated_at: new Date(),
    });

    setPhone(""); setName(""); setDate(""); setDuration('00:00'); setStatus("completed"); setOutcome("qualified"); setNotes("");
  };

  return (
    <form className="calls-form" onSubmit={handleSubmit}>
      <label className="calls-form__label" htmlFor="phone">Phone Number:</label>
      <input
        id="phone"
        className="calls-form__input"
        placeholder="Enter phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />

      <label className="calls-form__label" htmlFor="name">Contact Name:</label>
      <input
        id="name"
        className="calls-form__input"
        placeholder="Enter contact name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <label className="calls-form__label" htmlFor="date">Call Date:</label>
      <input
        id="date"
        className="calls-form__input"
        type="datetime-local"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <label className="calls-form__label" htmlFor="duration">Duration:</label>
      <input
        id="duration"
        className="calls-form__input"
        type="time"
        placeholder="Enter call duration"
        value={duration}
        onChange={e => setDuration(e.target.value)}
      />

      <label className="calls-form__label" htmlFor="status">Status:</label>
      <select
        id="status"
        className="calls-form__select"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="completed">Completed</option>
        <option value="missed">Missed</option>
        <option value="scheduled">Scheduled</option>
      </select>

      <label className="calls-form__label" htmlFor="outcome">Outcome:</label>
      <select
        id="outcome"
        className="calls-form__select"
        value={outcome}
        onChange={e => setOutcome(e.target.value)}
      >
        <option value="qualified">Qualified</option>
        <option value="not_qualified">Not Qualified</option>
        <option value="callback">Callback</option>
        <option value="not_interested">Not Interested</option>
      </select>

      <label className="calls-form__label" htmlFor="notes">Notes:</label>
      <textarea
        id="notes"
        className="calls-form__textarea"
        placeholder="Enter additional notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      <button className="calls-form__button" type="submit">Add Call</button>
    </form>
  );
};

export default CallsForm;