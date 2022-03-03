import React from 'react';
import Grid from '@mui/material/Grid';

import RectangularSkeleton from './RectangularSkeleton';

const StackRectangularSkeleton = () => {
    return (
        <Grid container justifyContent="center">
            <RectangularSkeleton />
            <RectangularSkeleton />
            <RectangularSkeleton />
            <RectangularSkeleton />
        </Grid> 
    );
}
 
export default StackRectangularSkeleton;

  