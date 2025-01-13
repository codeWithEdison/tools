import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

const StoryDisplay = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const storyRef = useRef(null);

  const revealStory = () => {
    setIsRevealed(true);
  };

  const downloadText = () => {
    const story = `A Tale of Heartbreak and Hustle

When I was in low secondary, I had a massive crush on this girl. So, I mustered all my courage and told her how I felt... and she rejected me faster than a Wi-Fi signal in a basement. 😅

Instead of crying or getting dramatic like a movie scene, I decided to focus on something that wouldn't break my heart—school. So, I threw myself into Math and Chemistry, and suddenly I was solving equations like they were pizza orders. 🍕📚

Now, I look back and think, "Man, I really wish I could've saved that energy from the heartbreak and used it to build the biggest Machine Learning project ever!" 🚀💻

Imagine if I put all that emotional energy into coding neural networks—I'd probably be creating AI that writes love letters and predicts rejections. 😂`;

    const blob = new Blob([story], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'heartbreak-and-hustle.txt';
    link.click();
  };

  const downloadImage = async () => {
    if (storyRef.current) {
      try {
        const canvas = await html2canvas(storyRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'heartbreak-and-hustle.png';
        link.click();
      } catch (error) {
        console.error('Error downloading image:', error);
        alert('Failed to download image. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        A Tale of Heartbreak and Hustle
      </h1>

      {/* Download buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button 
          onClick={downloadText}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Download className="mr-2" size={20} />
          Download Text
        </button>
        <button 
          onClick={downloadImage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Download className="mr-2" size={20} />
          Download Image
        </button>
      </div>

      {!isRevealed ? (
        <button 
          onClick={revealStory}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Reveal Story 🕵️
        </button>
      ) : (
        <div 
          ref={storyRef}
          className="space-y-4 text-gray-700 leading-relaxed animate-fade-in p-4 bg-white"
        >
             <h1 className="text-2xl font-bold mb-4 text-gray-800 ">
             The Untold Story of My Teenage Energy 😅
      </h1>
          <p className="animate-slide-in-left">
            When I was in low secondary, I had a massive crush on this girl. 
            So, I mustered all my courage and told her how I felt... 
            and she rejected me faster than a Wi-Fi signal in a basement. 😅
          </p>
          <p className="animate-slide-in-right">
            Instead of crying or getting dramatic like a movie scene, 
            I decided to focus on something that wouldn't break my heart—school. 
            So, I threw myself into Math and Chemistry, and 
            solving equations with the same enthusiasm as a detective cracking a complex case. 🕵️‍♂️🧠
          </p>
          <p className="animate-slide-in-left">
            Now, I look back and think, "Man, I really wish I could've saved 
            that energy  and used it to build the biggest 
            Machine Learning project ever!" 🚀💻
          </p>
          <p className="animate-slide-in-right">
            Imagine if I put all that emotional energy into coding neural networks—
            I'd probably be creating AI that writes love letters and predicts rejections. 😂
            😂 But seriously, if I had that energy now... I’d have a self-driving car
             and a robot that makes me coffee in the morning!🤖☕ 

          </p>
          {/* <button 
            onClick={() => setIsRevealed(false)}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Hide Story 🙈
          </button> */}
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;