import { ReactNode } from "react"

type SectionProps = {
    title?: string,
children: ReactNode}

function Section({children, title = "My Subtitle"}: SectionProps) {
  return (
    <section>
        <h1>{title}</h1>
        <div>{children}</div>
    </section>
  )
}
export default Section