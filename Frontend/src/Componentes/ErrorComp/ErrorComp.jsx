import React from "react";
import { Link } from "react-router-dom";

const ErrorComp = () => {

    return (
        <>
            <section className="relative z-10 bg-primary">
                <div className="container">
                    <div className="flex -mx-4">
                        <div className="w-full h-screen px-4 pt-12">
                            <div className="mx-auto max-w-[400px] text-center">
                                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                                    404
                                </h2>
                                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                                    Oops! El sitio no está disponible
                                </h4>
                                <p className="mb-8 text-lg text-white">
                                    El sitio al que quieres acceder tal vez fue eliminado
                                </p>
                                <Link to="/">
                                    <button className="inline-block px-8 py-3 text-base font-semibold text-center text-white transition border border-white rounded-lg hover:bg-white hover:text-primary">
                                        Volver a Pokedex
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-5 -z-10 md:space-x-8 lg:space-x-14">
                    <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    <div className="flex w-1/3 h-full">
                        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    </div>
                    <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                </div>
            </section>
        </>
    );
};

export default ErrorComp;
