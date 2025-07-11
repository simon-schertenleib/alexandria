import * as React from "react"

const iconVariants = {
  heart: (stroke: string | 'none', fill: string | 'none') => {
    return (<svg width="800px" height="800px" viewBox="0 0 16 16">
      <g stroke={stroke} strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(0.000000, 1.000000)" stroke={stroke} fill={fill}>
          <rect x="11" y="11" width="4.958" height="0.918" className="si-glyph-fill">
          </rect>
          <rect x="13" y="9" width="0.918" height="4.957" className="si-glyph-fill">
          </rect>
          <path d="M11.917,7.958 L14.972,7.958 C15.577,6.823 15.969,5.527 15.969,4.062 C15.969,1.833 14.174,0.031 11.958,0.031 C10.045,0.031 8.447,1.379 8.047,3.179 C7.631,1.376 6.026,0.031 4.102,0.031 C1.865,0.031 0.052,1.855 0.052,4.103 C0.052,10.599 8.057,13.941 8.057,13.941 C8.057,13.941 8.842,13.617 9.917,12.967 L9.917,9.917 L11.917,9.917 L11.917,7.958 L11.917,7.958 Z" className="si-glyph-fill">
          </path>
        </g>
      </g>
    </svg>)
  },
  unheart: (stroke: string | 'none', fill: string | 'none') => {
    return (
      <svg width="800px" height="800px" viewBox="0 0 16 16">
        <g strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(0.000000, 1.000000)" stroke={stroke} fill={fill}>
            <path d="M9.917,9.917 L13.613,9.917 C14.931,8.398 15.968,6.453 15.968,4.062 C15.968,1.833 14.173,0.031 11.957,0.031 C10.044,0.031 8.446,1.379 8.046,3.179 C7.63,1.376 6.025,0.031 4.101,0.031 C1.864,0.031 0.051,1.855 0.051,4.103 C0.051,10.599 8.056,13.941 8.056,13.941 C8.056,13.941 8.841,13.617 9.916,12.967 L9.916,9.917 L9.917,9.917 Z" className="si-glyph-fill">
            </path>
            <rect x="11" y="11" width="4.958" height="0.918" className="si-glyph-fill">
            </rect>
          </g>
        </g>
      </svg>
    )
  },
};

type IconName = keyof typeof iconVariants;
function Icon({
  className,
  icon,
  stroke,
  fill
}: React.ComponentProps<"span"> & { icon: IconName, stroke: string | 'none', fill: string | 'none' }) {
  return (
    <div className={className}>
      {iconVariants[icon](stroke, fill)}
    </div>
  )
}

export { Icon }
