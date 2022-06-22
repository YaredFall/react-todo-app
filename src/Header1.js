import React from 'react';

export default function Header1({label, ...restProps}) {
    return (
        <h1 {...restProps}>{label}</h1>
    );
}
