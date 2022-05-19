import { useEffect, useState } from 'react';
import consola from '../libs/myLogger';

//Data
import { provinces } from '../data/provinces';
import { towns } from '../data/towns';

//Components
import { IndexPath } from '@ui-kitten/components';

export function useProvinceTown(savedPostalCode, savedProvince, savedTown) {
	const [postalCode, setPostalCode] = useState(savedPostalCode || '');
	const [province, setProvince] = useState(savedProvince || '');
	const [townsList, setTownsList] = useState([]);
	const [townsSelectedIndex, setTownsSelectedIndex] = useState(
		townsList.findIndex((town) => town.NOMBRE === savedTown) !== -1
			? new IndexPath(townsList.findIndex((town) => town.NOMBRE === savedTown))
			: new IndexPath(),
	);
	const townDisplayValue = townsList[townsSelectedIndex.row]?.NOMBRE || '';

	//Provinces
	useEffect(() => {
		setProvince('');
		const provinceFound = provinces.find(
			(province) => province.value.substring(0, 2) === postalCode.substring(0, 2),
		);
		provinceFound ? setProvince(provinceFound?.label) : setProvince('');
	}, [postalCode]);

	useEffect(() => {
		if (province !== '') {
			const provinceFound = provinces.find((prov) => {
				return prov.label === province;
			});
			const townsList = towns.filter((town) => town.CPRO === provinceFound?.value);
			setTownsSelectedIndex(new IndexPath());
			setTownsList(townsList);
		}
	}, [province]);

	useEffect(() => {
		const index = new IndexPath(townsList.findIndex((town) => town.NOMBRE === savedTown));
		index > 0 && setTownsSelectedIndex(index);
	}, [townsList]);

	return [
		(newPostalCode) => {
			//consola('normal','⚪️ PRTO - SET newPostalCode', newPostalCode);
			setPostalCode(newPostalCode);
		},
		province,
		townsList,
		townsSelectedIndex,
		(newTownsSelectedIndex) => {
			//consola('normal','⚪️ PRTO - SET newTownsSelectedIndex', newTownsSelectedIndex.row);
			setTownsSelectedIndex(newTownsSelectedIndex);
		},
		townDisplayValue,
	];
}
