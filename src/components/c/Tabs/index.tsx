import React, { FC, MouseEvent } from 'react'
import { FEMenu } from 'components'
import { TabList } from './style'

interface IProps {
	viewstate: {
		tab: number
	}
	handlers: {
		handleTabChange: (newtab: number) => (e: MouseEvent<HTMLLIElement>) => void
	}
}

const TabsComponent: FC<IProps> = props => {

	const { viewstate, handlers } = props

	const slots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

	return (
		<FEMenu top bottom left size={.7}>
			<TabList>
				{slots.map(num =>
					<li key={num} onClick={handlers.handleTabChange(num)} >
						<span className={num === viewstate.tab ? `fe-text-green` : ``}>Slot {num}</span>
					</li>
				)}
			</TabList>
		</FEMenu>
	)
}

export const Tabs = TabsComponent
