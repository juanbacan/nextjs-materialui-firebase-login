import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


const RectangularSkeleton = () => {
    return (
        <Box sx={{ width: 210, mx: 2, my: 5 }}>      
            <Skeleton variant="rectangular" width={220} height={118} />
            <Skeleton />
            <Skeleton width="60%" />
        </Box>
    );
}
 
export default RectangularSkeleton;