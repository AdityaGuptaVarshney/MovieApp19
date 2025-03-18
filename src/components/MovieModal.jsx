"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "lucide-react";

const TMDB_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmVkMDNlOTc1NGM3M2I1MWU1ZDdmZjJiMjA4NmE2MyIsIm5iZiI6MTc0MTk2NzY5MS45NDksInN1YiI6IjY3ZDQ1MTRiZmFjMTYzMGMyNjAyOTk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Az6exBLbiY6Y7xd3PskX8HaZoq0VVWCINiZw3XbNUqU"; // Replace with your actual access token

export default function MovieModal({ isOpen, onClose, movieId }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (!movieId) return;

        axios
            .get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos`, {
                headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            })
            .then((res) => setMovie(res.data))
            .catch((err) => console.error(err));
    }, [movieId]);

    if (!movie) return null;

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="max-w-4xl w-full bg-gray-900 text-white rounded-xl p-6 shadow-lg">
                            <div className="flex justify-between">
                                <h2 className="text-2xl font-bold">{movie.title}</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-white">
                                    ✕
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="rounded-lg w-full"
                                    />
                                    {movie.videos?.results?.[0] && (
                                        <iframe
                                            className="w-full rounded-lg"
                                            height="230"
                                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                                            title="Trailer"
                                            allowFullScreen
                                        />
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <p>{movie.overview}</p>
                                    <div className="flex items-center space-x-2">
                                        <StarIcon className="w-5 h-5 text-yellow-400" />
                                        <span>{movie.vote_average.toFixed(1)} / 10</span>
                                    </div>
                                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                                    <p><strong>Budget:</strong> ${movie.budget?.toLocaleString()}</p>
                                    <p><strong>Revenue:</strong> ${movie.revenue?.toLocaleString()}</p>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}