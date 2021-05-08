import React from 'react';
import { View } from 'react-native';

export type TMode = 'horizontal' | 'vertical';

const Space = ({ mode, size }: { mode: TMode; size: number }) => {
    return (
        <View
            style={{
                width: mode === 'horizontal' ? 0 : size,
                height: mode === 'vertical' ? 0 : size,
            }}
        />
    );
};

export default Space;