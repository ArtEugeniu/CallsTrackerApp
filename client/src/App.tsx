import Header from "./components/common/header/Header";
import CallsContainer from "./components/containers/callsContainer/CallsContainer";
const App: React.FC = () => {


  return (
    <>
      <Header />
      <main>
        <CallsContainer />
      </main>
    </>
  )
}

export default App;
