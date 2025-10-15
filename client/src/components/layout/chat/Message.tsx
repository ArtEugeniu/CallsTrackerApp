import "./Message.scss";
import type { Role } from "../../../types/call";

interface Props {
  role: Role;
  content: string;
}

const Message: React.FC<Props> = ({ role, content }) => {
  return (
    <div className={`message ${role}`}>
      <b>{role === "user" ? "You: " : "GPT: "}</b>
      <pre>{content}</pre>
    </div>
  );
};

export default Message;