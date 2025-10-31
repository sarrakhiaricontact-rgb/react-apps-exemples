type Props = { battleLog: string[] };

function BattleLog({ battleLog }: Props) {
  const getLogColor = (log: string) => {
    if (log.includes("attaque !") || log.includes("dégâts infligés"))
      return "text-red-300";
    if (log.includes("dégâts reçus")) return "text-red-500 font-semibold";
    if (log.includes("Victoire")) return "text-green-400 font-bold";
    if (log.includes("Niveau supérieur")) return "text-yellow-400 font-bold";
    if (log.includes("Potion") || log.includes("restaurés"))
      return "text-blue-300";
    if (log.includes("apparaît")) return "text-purple-300";
    return "text-white";
  };

  return (
    <div className="bg-gray-900/80 rounded-xl p-4 mb-6 border-2 border-gray-600 h-40 overflow-y-auto shadow-inner flex flex-col-reverse">
      {battleLog
        .slice()
        .reverse()
        .map((log, idx) => (
          <p
            key={idx}
            className={`text-xs sm:text-sm mb-1 ${getLogColor(
              log
            )} animate-fadeIn`}
          >
            {log}
          </p>
        ))}
    </div>
  );
}

export default BattleLog;
