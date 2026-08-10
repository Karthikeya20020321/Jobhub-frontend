import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

     <div
    style={{
    textAlign: "center",
    margin: "50px 0",
  }}
>
    <h2>Browse the latest job opportunities</h2>
</div>

      <Footer />
    </>
  );
};

export default Home;