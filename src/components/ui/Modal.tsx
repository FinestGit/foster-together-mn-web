import type { ReactNode } from 'react';
import './Modal.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  if (!open) {
    return null;
  }

  const titleId = 'ft-modal-title';
  const descriptionId = 'ft-modal-description';
  return (
    <div className="ft-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="ft-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="ft-modal-title">
          {title}
        </h2>
        {description && (
          <p id={descriptionId} className="ft-modal-body">
            {description}
          </p>
        )}
        {children && <div className="ft-modal-body">{children}</div>}
        {footer && <div className="ft-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
