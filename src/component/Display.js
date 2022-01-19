import React from 'react';

function Display({timeState: {h, m, s}}) {

    return (
        <>

            {h < 10 ? `0${h}` : `${h}`}
            &nbsp;:&nbsp;
            {m < 10 ? `0${m}` : `${m}`}
            &nbsp;:&nbsp;
            {s < 10 ? `0${s}` : `${s}`}

        </>
    );
}

export {Display};
