import "./Message.scss";
import type { Role } from "../../../types/call";

interface Props {
  role: Role;
  content: string;
}

const Message: React.FC<Props> = ({ role, content }) => {
  const formatTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message message--${role}`}>
      <div className="message__bubble">
        <pre className="message__content">{content}</pre>
        <div className="message__timestamp">
          {formatTimestamp()}
        </div>
      </div>
    </div>
  );
};

export default Message;