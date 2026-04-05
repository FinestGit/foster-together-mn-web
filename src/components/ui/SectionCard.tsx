import type { HTMLAttributes, ReactNode } from 'react';
import './SectionCard.css';

type Props = HTMLAttributes<HTMLDivElement> & {
  title: string;
  children: ReactNode;
};

export function SectionCard({
  title,
  children,
  className = '',
  ...props
}: Props) {
  return (
    <section className={`ft-section ${className}`.trim()} {...props}>
      <h2 className="ft-section__title">{title}</h2>
      <div className="ft-section__body">{children}</div>
    </section>
  );
}
