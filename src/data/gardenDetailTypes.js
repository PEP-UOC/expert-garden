//Lodash
import { flatten } from 'lodash';

export const gardenDetailTypes = [
	{
		typeId: '01',
		name: 'plantas',
		value: 'Plantas',
		subTypes: [
			{
				subTypeId: '01-01',
				name: 'plantas_ornamentales',
				value: 'Ornamentales',
				inputs: [
					{
						inputId: '01-01-01',
						name: 'especie',
						label: 'Especie',
						caption: 'Si la sabes',
						placeholder: 'Especie de la planta',
						type: 'string',
					},
					{
						inputId: '01-01-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: 'De esta especie',
						placeholder: 'Número de plantas',
						type: 'number',
					},
					{
						inputId: '01-01-03',
						name: 'dimensiones',
						label: 'Dimensiones',
						caption: 'Ancho x Alto en centimientros aprox.',
						placeholder: 'Dimensiones de la planta',
						type: 'string',
					},
					{
						inputId: '01-01-04',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características de la planta.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '01-02',
				name: 'cesped',
				value: 'Césped',
				inputs: [
					{
						inputId: '01-02-01',
						name: 'especie',
						label: 'Tipo / Especie',
						caption: 'Si lo sabes',
						placeholder: 'Especie del cesped',
						type: 'string',
					},
					{
						inputId: '01-02-02',
						name: 'superficie',
						label: 'Superficie',
						caption: 'En m2 aproximadamente',
						placeholder: 'Superficie del cesped',
						type: 'number',
					},
					{
						inputId: '01-02-03',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del cesped.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '01-03',
				name: 'setos',
				value: 'Setos',
				inputs: [
					{
						inputId: '01-03-01',
						name: 'tipo',
						label: 'Tipo',
						caption: 'Si lo sabes',
						placeholder: 'Lineal / De valla',
						type: 'string',
					},
					{
						inputId: '01-03-02',
						name: 'especie',
						label: 'Especie',
						caption: 'Si lo sabes',
						placeholder: 'Especie del seto',
						type: 'string',
					},
					{
						inputId: '01-03-03',
						name: 'dimensiones',
						label: 'Dimensiones',
						caption: 'Ancho x Alto x Largo en metros aprox.',
						placeholder: 'Dimensiones del seto',
						type: 'string',
					},
					{
						inputId: '01-03-04',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del seto.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '01-04',
				name: 'arbustos',
				value: 'Arbustos',
				inputs: [
					{
						inputId: '01-04-01',
						name: 'especie',
						label: 'Especie',
						caption: 'Si lo sabes',
						placeholder: 'Especie del arbusto',
						type: 'string',
					},
					{
						inputId: '01-04-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: 'De esta especie',
						placeholder: 'Número de arbustos',
						type: 'number',
					},
					{
						inputId: '01-04-03',
						name: 'dimensiones',
						label: 'Dimensiones',
						caption: 'Ancho x Alto en centimetros aprox.',
						placeholder: 'Dimensiones del arbusto',
						type: 'string',
					},
					{
						inputId: '01-04-04',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del arbusto.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '01-05',
				name: 'arboles',
				value: 'Árboles',
				inputs: [
					{
						inputId: '01-05-01',
						name: 'especie',
						label: 'Especie',
						caption: 'Si lo sabes',
						placeholder: 'Especie del árbol',
						type: 'string',
					},
					{
						inputId: '01-05-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: 'De esta especie',
						placeholder: 'Número de árboles',
						type: 'number',
					},
					{
						inputId: '01-05-03',
						name: 'dimensiones',
						label: 'Dimensiones',
						caption: 'Ancho x Alto en metros aprox.',
						placeholder: 'Dimensiones del árbol',
						type: 'string',
					},
					{
						inputId: '01-05-04',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del árbol.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '01-06',
				name: 'palmeras',
				value: 'Palmeras',
				inputs: [
					{
						inputId: '01-06-01',
						name: 'especie',
						label: 'Especie',
						caption: 'Si la sabes',
						placeholder: 'Especie de la palmera',
						type: 'string',
					},
					{
						inputId: '01-06-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: 'De este tipo',
						placeholder: 'Número de palmeras',
						type: 'number',
					},
					{
						inputId: '01-06-03',
						name: 'dimensiones',
						label: 'Dimensiones',
						caption: 'Ancho x Alto en metros aprox.',
						placeholder: 'Dimensiones de la palmera',
						type: 'string',
					},
					{
						inputId: '01-06-04',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características de la palmera.',
						type: 'textarea',
					},
				],
			},
		],
	},
	{
		typeId: '02',
		name: 'riego',
		value: 'Riego',
		subTypes: [
			{
				subTypeId: '02-01',
				name: 'manual',
				value: 'Manual',
				inputs: [
					{
						inputId: '02-01-01',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del sistema de riego.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '02-02',
				name: 'automatizado',
				value: 'Automatizado',
				inputs: [
					{
						inputId: '02-01-02',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del sistema de riego.',
						type: 'textarea',
					},
				],
			},
		],
	},
	{
		typeId: '03',
		name: 'mobiliario',
		value: 'Mobiliario',
		subTypes: [
			{
				subTypeId: '03-01',
				name: 'iluminacion',
				value: 'Iluminación',
				inputs: [
					{
						inputId: '03-01-01',
						name: 'tipo',
						label: 'Tipo',
						caption: '',
						placeholder: 'Tipo de iluminación',
						type: 'string',
					},
					{
						inputId: '03-01-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: '',
						placeholder: 'Cantidad de luces',
						type: 'number',
					},
					{
						inputId: '03-01-03',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del sistema de riego.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '03-02',
				name: 'fuentes',
				value: 'Fuentes',
				inputs: [
					{
						inputId: '03-02-01',
						name: 'tipo',
						label: 'Tipo',
						caption: '',
						placeholder: 'Tipo de fuente',
						type: 'string',
					},
					{
						inputId: '03-02-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: '',
						placeholder: 'Cantidad de fuentes',
						type: 'number',
					},
					{
						inputId: '03-02-03',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características de las fuentes.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '03-03',
				name: 'piscinas',
				value: 'Piscinas',
				inputs: [
					{
						inputId: '03-03-01',
						name: 'tipo',
						label: 'Tipo',
						caption: '',
						placeholder: 'Tipo de piscina',
						type: 'string',
					},
					{
						inputId: '03-03-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: '',
						placeholder: 'Cantidad de piscinas',
						type: 'number',
					},
					{
						inputId: '03-03-03',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características de la piscina.',
						type: 'textarea',
					},
				],
			},
			{
				subTypeId: '03-04',
				name: 'muebles',
				value: 'Muebles',
				inputs: [
					{
						inputId: '03-04-01',
						name: 'tipo',
						label: 'Tipo',
						caption: '',
						placeholder: 'Tipo de mobiliario',
						type: 'string',
					},
					{
						inputId: '03-04-02',
						name: 'cantidad',
						label: 'Cantidad',
						caption: '',
						placeholder: 'Cantidad',
						type: 'number',
					},
					{
						inputId: '03-04-03',
						name: 'extra',
						label: 'Comentarios extra',
						caption: '',
						placeholder:
							'Cualquier comentario es interesante para definir las características del mobiliario.',
						type: 'textarea',
					},
				],
			},
		],
	},
];

export const gardenDetailSubTypes = flatten(
	gardenDetailTypes.map((type) => {
		return type.subTypes.map((subtype) => {
			return { name: subtype.name, value: subtype.value };
		});
	}),
);
