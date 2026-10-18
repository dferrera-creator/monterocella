import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    as?: 'button';
}

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    as: 'a';
}

type Props = ButtonProps | AnchorProps;

const variantStyles: Record<Variant, string> = {
    primary:   'bg-[var(--accent)] text-[var(--color-obsidian)] hover:bg-[var(--accent-dark)] active:bg-[var(--accent-dark)]',
    secondary: 'bg-transparent text-[var(--fg)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
    ghost:     'bg-transparent text-[var(--fg)] hover:text-[var(--accent)]',
    whatsapp:  'bg-[#25D366] text-white hover:bg-[#128C7E]',
};

const sizeStyles: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
};

function classes(variant: Variant, size: Size, fullWidth: boolean): string {
    return [
        'inline-flex items-center justify-center font-medium',
        'rounded-[var(--radius-sm)] tracking-wide',
        'transition-colors duration-[var(--duration-fast)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--accent)]',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
    ].filter(Boolean).join(' ');
}

export function Button(props: Props) {
    const { variant = 'primary', size = 'md', fullWidth = false } = props;
    const cls = classes(variant, size, fullWidth);

    if (props.as === 'a') {
        const { as: _as, variant: _v, size: _s, fullWidth: _fw, className = '', ...rest } = props;
        return <a {...rest} className={`${cls} ${className}`.trim()} />;
    }

    const { as: _as, variant: _v, size: _s, fullWidth: _fw, className = '', ...rest } = props as ButtonProps;
    return <button {...rest} className={`${cls} ${className}`.trim()} />;
}
