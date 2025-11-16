import React, { useState } from "react";
import { Play, Pause } from "lucide-react";

export default function ActivityDemo() {
  const [isHoveredOld, setIsHoveredOld] = useState(false);
  const [isHoveredNew, setIsHoveredNew] = useState(false);
  const [videoTimeOld, setVideoTimeOld] = useState(0);
  const [videoTimeNew, setVideoTimeNew] = useState(0);
  const [isPlayingOld, setIsPlayingOld] = useState(false);
  const [isPlayingNew, setIsPlayingNew] = useState(false);

  // Simulate video time progression
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isPlayingOld && isHoveredOld) {
        setVideoTimeOld((prev) => (prev + 0.1) % 10);
      }
      if (isPlayingNew) {
        setVideoTimeNew((prev) => (prev + 0.1) % 10);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlayingOld, isHoveredOld, isPlayingNew]);

  // Reset video when unmounting (old behavior)
  React.useEffect(() => {
    if (!isHoveredOld) {
      setVideoTimeOld(0);
      setIsPlayingOld(false);
    }
  }, [isHoveredOld]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-linear-to-r from-gray-600 to-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-bold mb-3 tracking-tight">
                Le composant &lt;Activity /&gt;
              </h1>
              <p className="text-xl text-blue-100 max-w-7xl">
                Préservation de l'état sans remontage : une nouvelle approche
                pour la visibilité conditionnelle
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* OLD WAY */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all hover:shadow-2xl">
              {/* Header */}
              <div className="bg-linear-to-r from-red-500 to-red-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-red-500 font-bold text-sm">
                        AVANT
                      </span>
                    </div>
                    <span className="text-red-100 text-sm font-medium">
                      React &lt; 19.2
                    </span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-red-300 animate-pulse"></div>
                </div>
              </div>

              {/* Code Block */}
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-300">
                    <span className="text-purple-400">{"{"}</span>
                    <span className="text-blue-400">isHovered</span>
                    <span className="text-purple-400"> && </span>
                  </div>
                  <div className="text-gray-300 ml-4">
                    <span className="text-gray-500">&lt;</span>
                    <span className="text-green-400">video</span>
                    <span className="text-blue-400"> src</span>
                    <span className="text-gray-500">=</span>
                    <span className="text-yellow-300">"demo.mp4"</span>
                    <span className="text-gray-500"> /&gt;</span>
                  </div>
                  <div className="text-purple-400">{"}"}</div>
                </div>
              </div>

              {/* Interactive Demo Area */}
              <div className="p-6">
                <div
                  className="relative border-2 border-dashed border-gray-300 rounded-xl h-80 flex items-center justify-center cursor-pointer transition-all hover:border-red-400 hover:bg-gray-50"
                  onMouseEnter={() => setIsHoveredOld(true)}
                  onMouseLeave={() => setIsHoveredOld(false)}
                >
                  {isHoveredOld ? (
                    <div className="absolute inset-0 bg-linear-to-br from-red-500 to-pink-600 rounded-xl flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-300">
                      <div className="text-lg font-semibold mb-2 text-red-100">
                        Vidéo en lecture
                      </div>
                      <div className="bg-black bg-opacity-30 rounded-xl px-8 py-4 mb-6 backdrop-blur-sm">
                        <div className="text-6xl font-bold font-mono tabular-nums">
                          {videoTimeOld.toFixed(1)}
                          <span className="text-4xl">s</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingOld(!isPlayingOld);
                        }}
                        className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center gap-3 shadow-lg"
                      >
                        {isPlayingOld ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} />
                        )}
                        {isPlayingOld ? "Pause" : "Play"}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-xl font-semibold text-gray-900 mb-2">
                        Survolez cette zone
                      </p>
                      <p className="text-gray-500">Le composant sera créé</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Issue Explanation */}
              <div className="px-6 pb-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 rounded-full p-2 shrink-0">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">Problème</h4>
                      <p className="text-red-800 text-sm leading-relaxed">
                        Le composant est <strong>démonté et remonté</strong> à
                        chaque changement de visibilité. L'état interne (temps
                        vidéo, position de lecture) est perdu et la vidéo
                        redémarre à 0s.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEW WAY */}
          <div className="group">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all hover:shadow-2xl">
              {/* Header */}
              <div className="bg-linear-to-r from-green-500 to-emerald-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-green-500 font-bold text-sm">
                        APRÈS
                      </span>
                    </div>
                    <span className="text-green-100 text-sm font-medium">
                      React 19.2
                    </span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>
                </div>
              </div>

              {/* Code Block */}
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-300">
                    <span className="text-gray-500">&lt;</span>
                    <span className="text-pink-400">Activity</span>

                    <span className="text-blue-400"> mode</span>
                    <span className="text-gray-500">=</span>
                    <span className="text-purple-400">{"{"}</span>
                    <span className="text-blue-400">isHovered</span>
                    <span className="text-purple-400"> ? </span>

                    <span className="text-yellow-300">'visible'</span>
                    <span className="text-purple-400"> : </span>
                    <span className="text-yellow-300">'hidden'</span>
                    <span className="text-purple-400">{"}"}</span>

                    <span className="text-gray-500">&gt;</span>
                  </div>
                  <div className="text-gray-300 ml-4">
                    <span className="text-gray-500">&lt;</span>
                    <span className="text-green-400">video</span>
                    <span className="text-blue-400"> src</span>
                    <span className="text-gray-500">=</span>
                    <span className="text-yellow-300">"demo.mp4"</span>
                    <span className="text-gray-500"> /&gt;</span>
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-500">&lt;/</span>
                    <span className="text-pink-400">Activity</span>
                    <span className="text-gray-500">&gt;</span>
                  </div>
                </div>
              </div>

              {/* Interactive Demo Area */}
              <div className="p-6">
                <div
                  className="relative border-2 border-dashed border-gray-300 rounded-xl h-80 cursor-pointer transition-all hover:border-green-400 hover:bg-gray-50"
                  onMouseEnter={() => setIsHoveredNew(true)}
                  onMouseLeave={() => setIsHoveredNew(false)}
                >
                  {/* Video component - always mounted */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex flex-col items-center justify-center text-white p-6 transition-opacity duration-500 ${
                      isHoveredNew
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="text-lg font-semibold mb-2 text-green-100">
                      Vidéo en lecture
                    </div>
                    <div className="bg-black bg-opacity-30 rounded-xl px-8 py-4 mb-6 backdrop-blur-sm">
                      <div className="text-6xl font-bold font-mono tabular-nums">
                        {videoTimeNew.toFixed(1)}
                        <span className="text-4xl">s</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingNew(!isPlayingNew);
                      }}
                      className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center gap-3 shadow-lg"
                    >
                      {isPlayingNew ? <Pause size={20} /> : <Play size={20} />}
                      {isPlayingNew ? "Pause" : "Play"}
                    </button>
                  </div>

                  {/* Placeholder - always visible when not hovered */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center text-center p-6 transition-opacity duration-300 ${
                      isHoveredNew
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 pointer-events-auto"
                    }`}
                  >
                    <div>
                      <p className="text-xl font-semibold text-gray-900 mb-2">
                        Survolez cette zone
                      </p>
                      <p className="text-gray-500">
                        Le composant reste en mémoire
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solution Explanation */}
              <div className="px-6 pb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-2 shrink-0">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 mb-1">
                        Solution
                      </h4>
                      <p className="text-green-800 text-sm leading-relaxed">
                        Le composant reste <strong>monté en permanence</strong>,
                        seule sa visibilité change. L'état interne est préservé
                        et la vidéo continue de progresser même quand elle est
                        cachée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
