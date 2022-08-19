import React, { InputHTMLAttributes, useRef } from 'react';
import './Input.scss';

interface PropTypes extends InputHTMLAttributes<HTMLInputElement> {
    suggestion: string;
    onSuggestionSelect: (selected: string) => void;
}

export default function Input(props: PropTypes) {
    const {
        className,
        value,
        onChange,
        disabled,
        suggestion,
        onSuggestionSelect,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSuggestionClick() {
        if (!inputRef.current) {
            return;
        }

        onSuggestionSelect(suggestion);
        inputRef.current.focus();
    }

    return (
        <div className={`Input ${className}`}>
            <input
                ref={inputRef}
                className='Input-input'
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {suggestion && (
                <span
                    className='Input-suggestion'
                    onClick={handleSuggestionClick}>
                    {suggestion}
                </span>
            )}
        </div>
    );
}
