import React from 'react'

function Compatibilty() {
    return (
        <>
            <div className="bg-white py-6 sm:py-8 lg:py-12 w-full">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Works with links from:</h2>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                        <p className="text-4xl">Youtube</p>
                        <p className="text-4xl">Facebook</p>
                        <p className="text-4xl">SoundCloud</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-4">
                        <p className="text-4xl">Vimeo</p>
                        <p className="text-4xl">MixCloud</p>
                        <p className="text-4xl">Twitch</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Compatibilty