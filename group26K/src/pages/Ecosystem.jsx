/**@author Dejuan
 * @file Ecosystem.jsx
 * @description Component displaying ecosystem information through images, text,
 * and text-to-speech. Includes interactive flip-cards for flora and fauna with
 * accessibility-focused narration.
 */


import { useState } from "react";
import { IoPaw } from "react-icons/io5";
import { PiPlantFill } from "react-icons/pi";
import { TbMushroomFilled } from "react-icons/tb";
import { TbTrees } from "react-icons/tb";
import { FaVolumeUp, FaPause } from "react-icons/fa";
import deer from "../assets/deer.jpg";
import fern from "../assets/fern.png";
import lake from "../assets/lake.jpg";
import heron from "../assets/heron.jpg";
import coyote from "../assets/coyote.jpg";

/**
 * Ecosystem Component
 * @returns {JSX.Element} Component rendering the ecosystem information.
 */
const Ecosystem = () => {
  /**
   * State to track the currently spoken text.
   * @type {[string, Function]}
   */
  const [speakingText, setSpeakingText] = useState("");

  /**
   * Handles text-to-speech functionality.
   * Toggles speech synthesis for the provided text.
   *
   * @author Raish Raj Joshi
   *
   * @param {string} text - Text to be spoken.
   */


  const handleSpeakText = (text) => {
    if (speakingText === text) {
      // Pause if the same text is being spoken
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel(); // Stop any ongoing speech immediately
      setSpeakingText(""); // Reset the speaking text
    } else {
      // Stop current speech and start new text
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-CA";

      utterance.onend = () => {
        setSpeakingText(""); // Reset after speaking
      };

      window.speechSynthesis.speak(utterance);
      setSpeakingText(text); // Update speaking text
    }
  };

  return (
    <div className="min-h-screen">
      {/* Ecosystem Section */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 sm:pl-20">
          {/* Ecosystem Heading and TTS Button*/}
          <div className="flex items-center mb-4 pt-20">
            <TbTrees className="text-green-700 dark:text-green-300 text-8xl mr-3" />
            <h2 className="text-7xl font-semibold text-blue-500 pl-2 pr-2">
              Ecosystem
            </h2>
            <button
              onClick={() =>
                handleSpeakText(
                  "This woodland conservation site is home to a diverse and vibrant ecosystem, teeming with life and natural beauty. Our woodlands are characterized by a rich variety of flora and fauna, each playing a crucial role in maintaining the ecological balance."
                )
              }
              className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText ===
              "This woodland conservation site is home to a diverse and vibrant ecosystem, teeming with life and natural beauty. Our woodlands are characterized by a rich variety of flora and fauna, each playing a crucial role in maintaining the ecological balance." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Ecosystem Decscriptive Text and Lake Image */}
            <div className="flex flex-col justify-center items-center">
              <p className="text-1g sm:text-2xl leading-relaxed pt-5 pb-10 w-full sm:w-[650px]">
                This woodland conservation site is home to a diverse and vibrant
                ecosystem, teeming with life and natural beauty. Our woodlands
                are characterized by a rich variety of flora and fauna, each
                playing a crucial role in maintaining the ecological balance.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex relative pt-10 px-auto justify-center items-center">
                    <img
                      src={lake}
                      alt="Lake"
                      className="sm:pr-0 h-auto rounded shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Flipping Images and TTS Buttons */}
            <div className="flex gap-4 justify-center sm:pl-20">
              <div className="flex flex-col gap-4">
                <div className="relative w-64 h-64 group [transform-style:preserve-3d] perspective">
                  <div className="absolute inset-0 transform transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* TTS Button */}
                    <button
                      onClick={() =>
                        handleSpeakText(
                          "Herons are wading birds known for their long legs and necks, often found near water bodies."
                        )
                      }
                      className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                      aria-label="Read out loud"
                    >
                      {speakingText ===
                      "Herons are wading birds known for their long legs and necks, often found near water bodies." ? (
                        <FaPause className="text-xl" />
                      ) : (
                        <FaVolumeUp className="text-xl" />
                      )}
                    </button>

                    {/* Heron Image */}
                    
                    <div
                      className="absolute inset-0 rounded-full shadow-md bg-cover bg-center [backface-visibility:hidden]"
                      style={{ backgroundImage: `url(${heron})` }}
                    >
                      {/* <img src={imageURLs?.find((img) => img?.title === 'heron')?.url || ''} /> */}

                    </div>

                    {/* Text on back side of image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-light-background text-black dark:bg-gray-800 dark:text-dark-text text-center rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="px-10">
                        Herons are wading birds known for their long legs and
                        necks, often found near water bodies.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative w-64 h-64 group ml-[190px] sm:ml-64 [transform-style:preserve-3d] perspective">
                  <div className="absolute inset-0 transform transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Deer Image */}
                    <div
                      className="absolute inset-0 rounded-full shadow-md bg-cover bg-center [backface-visibility:hidden]"
                      style={{ backgroundImage: `url(${deer})` }}
                    ></div>

                    {/* TTS Button */}
                    <button
                      onClick={() =>
                        handleSpeakText(
                          "Deer are graceful herbivores, commonly found in forests and grasslands."
                        )
                      }
                      className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                      aria-label="Read out loud"
                    >
                      {speakingText ===
                      "Deer are graceful herbivores, commonly found in forests and grasslands." ? (
                        <FaPause className="text-xl" />
                      ) : (
                        <FaVolumeUp className="text-xl" />
                      )}
                    </button>

                    {/* Text on back side of image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-light-background text-black dark:bg-gray-800 dark:text-dark-text text-center rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="px-10">
                        Deer are graceful herbivores, commonly found in forests
                        and grasslands.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative w-64 h-64 group [transform-style:preserve-3d] perspective">
                  <div className="absolute inset-0 transform transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Coyote Image */}
                    <div
                      className="absolute inset-0 rounded-full shadow-md bg-cover bg-center [backface-visibility:hidden]"
                      style={{ backgroundImage: `url(${coyote})` }}
                    ></div>
                    <button
                      onClick={() =>
                        handleSpeakText(
                          "The coyote is a highly adaptable, opportunistic predator, playing a key role in maintaining the balance of local ecosystems by controlling populations of small mammals."
                        )
                      }
                      className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                      aria-label="Read out loud"
                    >
                      {speakingText ===
                      "The coyote is a highly adaptable, opportunistic predator, playing a key role in maintaining the balance of local ecosystems by controlling populations of small mammals." ? (
                        <FaPause className="text-xl" />
                      ) : (
                        <FaVolumeUp className="text-xl" />
                      )}
                    </button>

                    {/* Text on back side of image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-light-background text-black dark:bg-gray-800 dark:text-dark-text text-center rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="px-10 text-sm">
                        The coyote is a highly adaptable, opportunistic
                        predator, playing a key role in maintaining the balance
                        of local ecosystems by controlling populations of small
                        mammals.
                      </p>
                    </div>
                  </div>
                  {/* TTS Button */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Fern Background Image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-opacity-50 py-8 shadow-md"
        style={{ backgroundImage: `url(${fern})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gray-600 bg-opacity-60"></div>
        <div className="relative z-10 p-8">
          {/* Key Features Intro and TTS Button */}
          <div className="flex items-start">
            <p className="light-disc leading-relaxed text-xl text-white pl-20 pb-10">
              Key features of our ecosystem:
            </p>
            {/* TTS Button */}
            <button
              onClick={() =>
                handleSpeakText(
                  "Yellow Birch Trees: These majestic trees are a hallmark of our woodland, providing habitat and food for numerous species. Their distinctive yellow bark and graceful form make them a standout feature."
                )
              }
              className="ml-4 p-2 bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText ===
              "Yellow Birch Trees: These majestic trees are a hallmark of our woodland, providing habitat and food for numerous species. Their distinctive yellow bark and graceful form make them a standout feature." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
            <br></br>
          </div>
          {/* Key Features Dotted List */}
          <ul className="list-disc list-inside text-lg text-white sm:px-40">
            <li className="pb-5">
              <b className="text-xl">Yellow Birch Trees:</b> These majestic
              trees are a hallmark of our woodland, providing habitat and food
              for numerous species. Their distinctive yellow bark and graceful
              form make them a standout feature.
            </li>
            <li>
              <b className="text-xl">Wetlands:</b> Our wetlands are vital for
              water purification, flood control, and providing a habitat for a
              wide range of wildlife. They are a haven for birds, amphibians,
              and aquatic plants.
            </li>
            <li className="pt-5">
              <b className="text-xl">Historical Artifacts:</b> Scattered
              throughout the woodland are remnants of the past, providing
              insight into how people lived in a time long forgotten.
            </li>
          </ul>
        </div>
      </section>

      {/* Padding between list section and Flora/Fauna/Fungi section */}
      <div className="py-8"></div>

      {/* Flora, Fauna, and Fungi Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <div className="bg-light-background text-light-text dark:bg-gray-800 dark:text-dark-text p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            {/* Flora Section */}
            <div className="pt-6 pb-6">
              <div className="flex flex-col items-center mb-4">
                <PiPlantFill className="text-green-700 text-6xl mb-2" />
                <div className="flex items-center">
                  {/* Flora Heading */}
                  <h3 className="text-3xl font-semibold pl-10 pr-2 text-blue-500">
                    Flora
                  </h3>
                  {/* TTS Button */}
                  <button
                    onClick={() =>
                      handleSpeakText(
                        "Our woodlands are adorned with a variety of plant species, including towering Yellow Birch Trees, delicate wildflowers, and lush ferns."
                      )
                    }
                    className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                    aria-label="Read out loud"
                  >
                    {speakingText ===
                    "Our woodlands are adorned with a variety of plant species, including towering Yellow Birch Trees, delicate wildflowers, and lush ferns." ? (
                      <FaPause className="text-xl" />
                    ) : (
                      <FaVolumeUp className="text-xl" />
                    )}
                  </button>
                </div>
              </div>
              {/* Flora Descriptive Text */}
              <p className="text-lg leading-relaxed text-center mx-20">
                Our woodlands are adorned with a variety of plant species,
                including towering Yellow Birch Trees, delicate wildflowers, and
                lush ferns.
              </p>
            </div>
          </div>

          <div className="bg-light-background text-light-text dark:bg-gray-800 dark:text-dark-text p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            {/* Fauna Section */}
            <div className="pt-6 pb-6">
              <div className="flex flex-col items-center mb-4">
                <IoPaw className="text-orange-700 text-6xl mb-2" />
                <div className="flex items-center">
                  {/* Fauna Heading */}
                  <h3 className="text-3xl font-semibold pl-10 pr-2 text-blue-500">
                    Fauna
                  </h3>
                  {/* TTS Button */}
                  <button
                    onClick={() =>
                      handleSpeakText(
                        "Among the fauna, you can find graceful deer, playful foxes, and a myriad of bird species, each contributing to the vibrant ecosystem."
                      )
                    }
                    className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                    aria-label="Read out loud"
                  >
                    {speakingText ===
                    "Among the fauna, you can find graceful deer, playful foxes, and a myriad of bird species, each contributing to the vibrant ecosystem." ? (
                      <FaPause className="text-xl" />
                    ) : (
                      <FaVolumeUp className="text-xl" />
                    )}
                  </button>
                </div>
              </div>
              {/* Fauna Descriptive Text */}
              <p className="text-lg leading-relaxed text-center mx-20">
                Among the fauna, you can find graceful deer, playful foxes, and
                a myriad of bird species, each contributing to the vibrant
                ecosystem.
              </p>
            </div>
          </div>

          <div className="bg-light-background text-light-text dark:bg-gray-800 dark:text-dark-text p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            {/* Fungi Section */}
            <div className="pt-6 pb-6">
              <div className="flex flex-col items-center mb-4">
                <TbMushroomFilled className="text-purple-700 text-6xl mb-2" />
                <div className="flex items-center">
                  {/* Fungi Heading */}
                  <h3 className="text-3xl font-semibold pl-10 pr-2 text-blue-500">
                    Fungi
                  </h3>
                  {/* TTS Button */}
                  <button
                    onClick={() =>
                      handleSpeakText(
                        "Woodland fungi play a vital role in the ecosystem, breaking down organic matter and forming symbiotic relationships with trees and plants."
                      )
                    }
                    className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                    aria-label="Read out loud"
                  >
                    {speakingText ===
                    "Woodland fungi play a vital role in the ecosystem, breaking down organic matter and forming symbiotic relationships with trees and plants." ? (
                      <FaPause className="text-xl" />
                    ) : (
                      <FaVolumeUp className="text-xl" />
                    )}
                  </button>
                </div>
              </div>
              {/* Fauna Descriptive Text */}
              <p className="text-lg leading-relaxed text-center mx-20">
                Woodland fungi play a vital role in the ecosystem, breaking down
                organic matter and forming symbiotic relationships with trees
                and plants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecosystem;
