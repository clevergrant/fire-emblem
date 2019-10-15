import React, { FC } from 'react'
import { TabsContainer } from 'containers'
import { Tab } from 'components'
import { Wrapper } from './style'

interface IProps {
	tab: number
	setTab: Function
}

const RootComponent: FC<IProps> = props => {

	const { tab, setTab } = props

	return (
		<Wrapper>
			<TabsContainer tab={tab} setTab={setTab} />
			<Tab tab={tab} />
		</Wrapper>
	)
}

export const Root = RootComponent
