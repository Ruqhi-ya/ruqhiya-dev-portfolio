
export default function ResumeView() {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`

  return (
    <article
      className="animate-fade-in max-w-2xl mx-auto px-4 sm:px-6 py-8"
      aria-label="Resume"
    >
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 text-xs mb-8 font-mono"
        style={{ color: 'var(--text-muted)' }}
      >
        <span>portfolio</span>
        <Chev />
        <span style={{ color: '#f44747' }}>resume.pdf</span>
      </nav>

      <h1
        className="text-xl font-bold mb-8 flex items-center gap-2"
        style={{ color: 'var(--white)', fontFamily: 'Inter' }}
      >
        <span style={{ color: '#f44747' }}>
          <PdfIcon />
        </span>
        resume.pdf
      </h1>

      {/* Resume download area */}
      <div
        className="rounded-lg flex flex-col items-center justify-center py-16 mb-6 text-center"
        style={{
          background: 'var(--bg2)',
          border: '2px dashed var(--border2)',
        }}
      >
        <div className="text-4xl mb-3" aria-hidden="true">
          📄
        </div>

        <p
          className="text-sm font-semibold mb-1"
          style={{
            color: 'var(--white)',
            fontFamily: 'Inter',
          }}
        >
          Resume PDF
        </p>

        <p
          className="text-xs mb-6 max-w-xs leading-relaxed"
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'Inter',
          }}
        >
          View or download my latest resume.
        </p>

        <div className="flex items-center gap-3">
          {/* View Resume */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all hover:brightness-110"
            style={{
              background: 'var(--blue)',
              color: '#fff',
              fontFamily: 'Inter',
            }}
          >
            <PdfIcon />
            View Resume
          </a>

          {/* Download Resume */}
          <a
            href={resumeUrl}
            download="Ruqhiya_Resume.pdf"
            className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all hover:brightness-110"
            style={{
              background: 'var(--bg3)',
              color: 'var(--white)',
              border: '1px solid var(--border2)',
              fontFamily: 'Inter',
            }}
          >
            <DownloadIcon />
            Download
          </a>
        </div>
      </div>
    </article>
  )
}

function PdfIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function Chev() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
