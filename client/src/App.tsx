import Header from "./components/common/header/Header";
import CallsContainer from "./components/containers/callsContainer/CallsContainer";
import Chat from "./components/layout/chat/Chat";
const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <CallsContainer />
        <div className="chat-section">
          <Chat />
        </div>
      </main>
    </>
  )
}

export default App;
