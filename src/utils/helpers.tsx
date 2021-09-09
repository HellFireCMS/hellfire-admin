import { styled } from "@stitches/react";

export const BottomPadding = styled('div', {
    padding: "0px 0px 20px",
})

export const Flexbox = styled('div', {
    display: 'flex',
    
    variants: {
        direction: {
            row: {
                flexDirection: 'row'
            },
            column: {
                flexDirection: 'column'
            }
        },
        align: {
            center: {
                alignItems: 'center',
            },
            end: {
                alignItems: 'end',
            },
            start: {
                alignItems: 'start',
            }
        },
        justify: {
            center: {
                alignItems: 'center',
            },
            end: {
                alignItems: 'end',
            },
            start: {
                alignItems: 'start',
            }
        },
    }
})