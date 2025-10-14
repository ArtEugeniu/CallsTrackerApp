import type { Call } from '../../../types/call';
import * as API from '../../../api/calls';
import CallsForm from '../../layout/callsForm/CallsForm';

type Props = {
  onCallAdded: () => void; 
};

const CallsFormWrapper: React.FC<Props> = ({ onCallAdded }) => {

  const handleSaveCall = async (call: Call) => {
    try {
      await API.addCall(call);
      onCallAdded(); 
    } catch (err) {
      console.error(err);
      alert("Error adding call");
    }
  };

  return <CallsForm onSave={handleSaveCall} />;
};

export default CallsFormWrapper;