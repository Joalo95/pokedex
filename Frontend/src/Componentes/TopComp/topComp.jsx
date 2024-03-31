import "./topComp.css";
import img from "./Imgs/Pokeball.png";

function TopComp(params) {

  const inputChange = (e) => {
    params.changeSearch(e.target.value);
    let a = params.sortAndFilter(e.target.value);
    params.setOrderFilter(a);
  };

  return (
    <div className="w-[80vw] h-10 mb-1 mt-0 flex justify-around items-center">
      <div className="flex w-36">
        <img className="w-8 h-8 m-1" src={img} alt="pokeball" />
        <h1 className="my-2 px-2 text-black font-bold text-center">Pokedex</h1>
      </div>
      <button
        className={`p-2 rounded-lg bg-transparent border-none w-8 h-8 changeSortingButton changeSortingButton${params.sorting}`}
        onClick={() => params.changeSorting(!params.sorting)}
      ></button>
      <input
        className="bg-transparent placeholder:text-black rounded-lg border-solid border-[0.05rem] border-black mr-3 px-2 py-1 leading-tight focus:outline-none"
        placeholder="Search by name"
        onChange={inputChange}
        type="text"
        value={params.search}
      />
    </div>
  );
}

export default TopComp;
