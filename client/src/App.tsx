import Header from "./components/common/header/Header";
import CallsContainer from "./components/containers/callsContainer/CallsContainer";
import Chat from "./components/layout/chat/Chat";
import Message from "./components/layout/chat/Message";
const App: React.FC = () => {


  return (
    <>
      <Header />
      <main>
        <CallsContainer />
        <Chat />

      </main>
    </>
  )
}

export default App;
