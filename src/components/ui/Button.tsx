import type { ButtonHTMLAttributes } from "react";
import './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
}

export function Button({ variant = 'primary', className = '', ...props }: Props) {
    const variantClass = `ft-button--${variant}`
    return <button type="button" className={`ft-button ${variantClass} ${className}`.trim()} {...props}/>
}