import React from 'react'
import { Text } from '@tarojs/components'
import { StandardProps } from '@tarojs/components/types/common'
import classnames from 'classnames'


import './index.scss'

type EIconType =
|'hao'
|'dui'
|'2'
|'baoxue'
|'daxue'
|'xiaoxue'
|'zhongxue'
|'wu'
|'baoyu'
|'dayu'
|'duoyun-copy'
|'zhongyu'
|'qingtian1'
|'delete'
|'xiaoyu';
export interface EIconProps extends StandardProps {
    black?: boolean,
    type: EIconType,
    size?: number,
    color?: string
}

const EIcon: React.FC<EIconProps> = (props) => {
    const { black, type, color, size, className, ...restProps } = props;
    const classes = classnames('icon', `icon-${type}`, className);
    const styles = {
        color,
        fontSize: size + 'rpx',
        display: black ? 'block' : ''
    }
    return (
        <Text className={classes} style={styles} {...restProps}></Text>
    )

}
EIcon.defaultProps = {
    size: 32,
    black: false
}

export default EIcon;
