import React from 'react';

const TruncatedText = ({ text, maxWords }) => {
    const words = text.split(' ');
    const truncatedWords = words.slice(0, maxWords);
    const truncatedText = truncatedWords.join(' ');

    const displayText = words.length > maxWords ? `${truncatedText} ...` : text;

    return <p>{displayText}</p>;
};

export default TruncatedText;
