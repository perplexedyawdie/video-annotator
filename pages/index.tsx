import { useState } from "react";
import Compatibilty from "@/components/Compatibilty";
import NavBar from "@/components/NavBar";
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'

export default function Home() {
  const [vidUrl, setVidUrl] = useState<string>("")
  const router = useRouter();
  function handleUrlInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setVidUrl(event.target.value)
  }

  function handleSubmitUrl(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    try {
      if (ReactPlayer.canPlay(vidUrl)) {
        router.push(`/${vidUrl}`)
      }
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <NavBar />
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center w-full">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Video Annotation simplified!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Capture and share key moments from any video with time-stamped notes, links, etc. Easily collaborate and learn by sharing your annotated videos.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="join">
                  <div>
                    <div>
                      <input type="url" value={vidUrl} onChange={handleUrlInput} className="input input-bordered join-item" placeholder="Search" />
                    </div>
                  </div>
                  <button onClick={handleSubmitUrl} className="btn join-item btn-primary">Annotate!</button>

                </div>

              </div>
              <Compatibilty />

            </div>
          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />

          </div>
        </div>
      </div>
    </>
  );
}
