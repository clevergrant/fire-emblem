import React, { FC, CSSProperties } from 'react'
import { FEMenu } from 'components'

interface IProps {
	tab: number
}

const TabComponent: FC<IProps> = props => {

	const boxStyle: CSSProperties = {
		minHeight: `40rem`,
		minWidth: `40rem`,
		alignItems: `flex-start`
	}

	return (
		<FEMenu top right bottom left style={boxStyle}>
			tab {props.tab}
		</FEMenu>
	)
}

export const Tab = TabComponent
