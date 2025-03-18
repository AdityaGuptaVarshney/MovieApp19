import React from 'react'

const MovieCard = ({movie: {title , vote_average , poster_path , release_date , original_language , onClick = () => {}   }}) => {
    return (
        <div className="movie-card" >
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/No-Poster (1).png'} alt="poster_path"/>
            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src='Rating.svg' alt="vote_average"/>
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{original_language}</p>

                    <span>•</span>
                    <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>



                </div>

                {/* New "View Details" Button */}
                <button
                    onClick={onClick}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    View Details
                </button>
            </div>
        </div>
    )
}
export default MovieCard
