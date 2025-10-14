import CallsList from '../../layout/callsList/CallsList';
import type { Call } from '../../../types/call';
import * as API from '../../../api/calls';

type Props = {
  calls: Call[];
  reloadCalls: () => void;
};

const CallsListWrapper: React.FC<Props> = ({ calls, reloadCalls }) => {
  
  const handleDeleteCall = async (id: number | string) => {
    try {
      await API.deleteCall(id);
      reloadCalls();
    } catch (err) {
      console.error(err);
      alert("Error deleting call");
    }
  };

  const handleUpdateCall = async (updatedCall: Call) => {
    try {
      await API.updateCall(updatedCall);
      reloadCalls();
    } catch (err) {
      console.error(err);
      alert("Error updating call");
    }
  };

  return (
    <CallsList 
      calls={calls} 
      onDelete={handleDeleteCall} 
      onUpdate={handleUpdateCall} 
    />
  );
};

export default CallsListWrapper;