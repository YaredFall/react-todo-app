import React from 'react';

export default function Button({label, ...restProps })
{
    return (
        <button { ...restProps }>
            {label}
        </button>
    );
}
