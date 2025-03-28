import './input.style.scss';

export interface InputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    style?: any,
    placeholder?: string
    value?: string | number,
}

export function Input ({ onChange, style, placeholder, value }: InputProps){
    return(
        <input className='custom-input' value={value} style={style} onChange={onChange} placeholder={placeholder}></input>
    )
}