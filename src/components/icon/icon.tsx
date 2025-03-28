import './icon.style.scss';

export interface IconProps {
    source: string,
    alt: string,
    className?: string,
    onClick?: () => void
}

export function Icon ({ className, source = '#', alt = 'Icon', onClick }: IconProps){
    return(
        <div className={className + ' icon'} onClick={onClick}>
            <img  src={'icons/' + source} alt={alt} />
        </div>
    )
}