"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink/75 px-6 text-paper">
      <div className="max-w-lg">
        <p className="font-comic text-pool">Even the healing factor sat this one out.</p>
        <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">SOMETHING TORE.</h1>
        <p className="mt-4 text-mist">The page failed to render. You can try again.</p>
        {error.digest ? <p className="mt-2 text-xs text-mist">Reference {error.digest}</p> : null}
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex min-h-12 items-center bg-pool px-5 font-display text-2xl text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
