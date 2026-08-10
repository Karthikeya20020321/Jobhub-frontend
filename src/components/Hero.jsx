const Hero = () => {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "100px 20px",
      }}
    >
      <h1 style={{ fontSize: "48px" }}>
        Find Your Dream Job
      </h1>

      <p style={{ marginTop: "20px" }}>
        Search thousands of jobs from top companies.
      </p>

      <input
        type="text"
        placeholder="Search Jobs..."
        style={{
          padding: "12px",
          width: "300px",
          marginTop: "30px",
        }}
      />

      <button
        style={{
          padding: "12px 20px",
          marginLeft: "10px",
        }}
      >
        Search
      </button>
    </section>
  );
};

export default Hero;