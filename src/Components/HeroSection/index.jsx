import React from "react";
import Zootpia from "../../assets/Zootopia.mp4";
import Moana from "../../assets/Moana.mp4";
import Boots from "../../assets/Boots.mp4";
import Jurrasic from "../../assets/Jurrasic.mp4";
import Avatar3 from "../../assets/Avatar3.mp4";

const HeroSection = () => {
  // Fungsi untuk scroll ke section form
  const scrollToForm = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        VisualPlay, Watch Movies
        <span className="bg-gradient-to-r from-cyan-300 to-teal-400 text-transparent bg-clip-text">
          {" "}
          for Everyone
        </span>
      </h1>

      <p className="mt-10 text-lg text-center text-zinc-100 max-w-4xl">
        Enjoy unlimited entertainment. Your platform for streaming the best
        movies and TV shows, with a focus on stunning visuals and an easy-to-use
        experience.
      </p>

      <div className="flex justify-center my-10">
        {/* Tombol Scroll */}
        <button
          onClick={scrollToForm}
          className="bg-gradient-to-r from-pink-500 to-rose-500 py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </button>

        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          Documentation
        </a>
      </div>

      {/* VIDEO SCROLLER FIXED */}
      <div className="flex mt-10 justify-start overflow-x-auto w-full px-4 space-x-4 pb-4">
        {[Zootpia, Moana, Boots, Jurrasic, Avatar3].map((video, i) => (
          <video
            key={i}
            autoPlay
            loop
            muted
            className="
              rounded-lg 
              border border-cyan-300 shadow-sm shadow-teal-400 
              mx-2
              w-[260px] sm:w-[300px] lg:w-[340px]  /* FIX width untuk semua ukuran */
              flex-shrink-0                        /* Supaya tidak mengecil */
            "
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
