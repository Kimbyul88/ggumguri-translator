export default function DecoElements() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Orange squiggles - top left */}
      <svg
        className="absolute -left-4 top-24 w-24 h-16"
        viewBox="0 0 96 48"
        fill="none"
      >
        <path
          d="M4 24c8-16 16 16 24 0s16 16 24 0s16 16 24 0"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M4 36c8-16 16 16 24 0s16 16 24 0s16 16 24 0"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M4 12c8-16 16 16 24 0s16 16 24 0s16 16 24 0"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Orange squiggle - top right */}
      <svg
        className="absolute right-8 top-20 w-20 h-10"
        viewBox="0 0 80 32"
        fill="none"
      >
        <path
          d="M4 16c8-14 16 14 24 0s16 14 24 0s16 14 24 0"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Green cross - left */}
      <svg
        className="absolute left-6 top-[45%] w-8 h-8"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path d="M16 4v24M4 16h24" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
      </svg>

      {/* Blue star - center-right area */}
      <svg
        className="absolute right-[35%] top-[25%] w-5 h-5"
        viewBox="0 0 20 20"
        fill="#3B82F6"
      >
        <path d="M10 0l2.5 7.5H20l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
      </svg>

      {/* Blue star - left area */}
      <svg
        className="absolute left-[25%] bottom-[30%] w-4 h-4"
        viewBox="0 0 20 20"
        fill="#3B82F6"
      >
        <path d="M10 0l2.5 7.5H20l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
      </svg>

      {/* Pink semi-circle - bottom left */}
      <svg
        className="absolute left-4 bottom-[20%] w-14 h-10"
        viewBox="0 0 56 40"
        fill="none"
      >
        <path
          d="M8 36a24 24 0 0 1 40 0"
          stroke="#F472B6"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Red/pink squiggle - right side */}
      <svg
        className="absolute -right-2 top-[55%] w-20 h-14"
        viewBox="0 0 80 48"
        fill="none"
      >
        <path
          d="M4 24c8-16 16 16 24 0s16 16 24 0s16 16 24 0"
          stroke="#EF4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M4 36c8-16 16 16 24 0s16 16 24 0s16 16 24 0"
          stroke="#EF4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M4 12c8-16 16 16 24 0s16 16 24 0s16 16 24 0"
          stroke="#EF4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Green cross - bottom right */}
      <svg
        className="absolute right-12 bottom-[15%] w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M12 4v16M4 12h16" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Orange squiggle - center bottom */}
      <svg
        className="absolute left-[40%] bottom-[40%] w-16 h-8"
        viewBox="0 0 64 32"
        fill="none"
      >
        <path
          d="M4 16c6-12 12 12 18 0s12 12 18 0s12 12 18 0"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Blue star - right top */}
      <svg
        className="absolute left-[55%] top-[22%] w-5 h-5"
        viewBox="0 0 20 20"
        fill="#3B82F6"
      >
        <path d="M10 0l2.5 7.5H20l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z" />
      </svg>

      {/* Large pink cross - right bottom */}
      <svg
        className="absolute right-[8%] bottom-[25%] w-7 h-7"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path d="M14 4v20M4 14h20" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
