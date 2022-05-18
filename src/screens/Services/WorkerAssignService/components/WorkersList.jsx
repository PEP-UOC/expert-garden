import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import styles from './styles'

//Components
import { View } from 'react-native'
import { WorkerItem } from './WorkerItem'
import { TitleSection } from '../../../../components/Titles/Section'

// eslint-disable-next-line no-unused-vars
export const WorkersList = ({ debug, workers, asignedWorker, sid }) => {

	//Styles
	const ownStyles = useStyleSheet(styles);

	return (
		<View style={{ ...ownStyles?.wrapper }}>
			<TitleSection icon={'pantone-outline'} primaryText={'Trabajadores'} secondaryText={''} />
			<View style={{ ...ownStyles.itemsWrapper }}>
				{workers && workers?.map((worker, index) => {
					return (
						<WorkerItem worker={worker} workerIndex={index} key={worker.uid} isSelected={worker.uid === asignedWorker} sid={sid} />
					)
				})}
			</View>
		</View>
	)
};

WorkersList.propTypes = {
	debug: PropTypes.bool.isRequired,
	workers: PropTypes.array.isRequired,
	asignedWorker: PropTypes.string,
	sid: PropTypes.string.isRequired,
};

WorkersList.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
