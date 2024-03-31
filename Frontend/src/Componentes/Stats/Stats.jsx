import { tipoAcolor } from "../../Utilities/utilities";

function Stats(props) {
    const { pokeStats, pokeTipo } = props;

    const statKeys = Object.keys(pokeStats);

    return (
        <>
            {statKeys.map((statName) => {
                const statValue = pokeStats[statName];
                return (
                    <div className="bigCardContentStats" key={statName}>
                        <div
                            className="bigCardStatsLengs"
                            style={{
                                backgroundColor: tipoAcolor(pokeTipo),
                                width: `${statValue}%`,
                                boxShadow: `2px 0 0 ${tipoAcolor(pokeTipo)}`,
                            }}
                        ></div>
                        <div
                            className="bigCardStatsRest"
                            style={{
                                backgroundColor: `${tipoAcolor(pokeTipo)}66`,
                                width: (100 - parseInt(statValue)).toString().concat("%"),
                                boxShadow: `-2px 0 0 ${tipoAcolor(pokeTipo)}66`,
                            }}
                        ></div>
                    </div>
                );
            })}
        </>
    );
}

export default Stats;
