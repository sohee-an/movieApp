import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import requests from "./api/requests";
import Row from "./components/Row";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="TRENDING NOW" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="TOP RATED" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="ATACTION MOVIES"
        id="TM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="COMEDY MOVIES"
        id="TM"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="DOCUMENTARIES"
        id="TM"
        fetchUrl={requests.fetchDocumentaries}
      />
      <Row
        title="HORROR MOVIES"
        id="TM"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title="ROMANCE MOVIES"
        id="TM"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Footer />
    </div>
  );
}

export default App;
