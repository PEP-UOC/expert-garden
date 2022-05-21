import React from 'react'
import PropTypes from "prop-types";

//Constants
import Constants from 'expo-constants';

//Styles
import { useStyleSheet } from '@ui-kitten/components';
import globalStyles from '../../styles/globalStyles'
import styles from './styles'

//Icons
import { LeafIcon } from '../../assets/icons/Leaf'

//Components
import { SafeAreaView, ScrollView, View } from 'react-native'
import { Text, Layout } from '@ui-kitten/components';
import { SeparatorTopScreen } from '../../components/Separators/TopScreen'

// eslint-disable-next-line no-unused-vars
export const TermsAndConditionsScreen = ({ debug }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView alwaysBounceVertical={true} centerContent={true} keyboardDismissMode={'on-drag'}
				contentContainerStyle={{ ...gloStyles.scrollView }}>
				<Layout style={{ ...gloStyles.layout, justifyContent: 'flex-start' }}>
					<SeparatorTopScreen />
					<View style={{ ...ownStyles.view, maxWidth: 700 }}>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Términos y condiciones</Text>
						<Text category='p1'>Última actualización: 20 de mayo de 2022</Text>
						<Text category='p1'>Lea atentamente estos términos y condiciones antes de utilizar Nuestro Servicio.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Interpretación y definiciones</Text>
						<Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Interpretación</Text>
						<Text category='p1'>Las palabras cuya letra inicial está en mayúscula tienen significados definidos bajo las siguientes condiciones. Las siguientes definiciones tendrán el mismo significado independientemente de que aparezcan en singular o en plural.</Text>
						<Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Definiciones</Text>
						<Text category='p1'>A los efectos de estos Términos y condiciones:</Text>


						<Text category='p1'><strong>Aplicación</strong> hace referencia al programa de software proporcionado por la Empresa descargado por Usted en cualquier dispositivo electrónico, denominado Expert Garden</Text>


						<Text category='p1'><strong>Tienda de aplicaciones</strong> hace referencia al servicio de distribución digital operado y desarrollado por Apple Inc. (Apple App Store) o Google Inc. (Google Play Store) en el que se ha descargado la Aplicación. .</Text>


						<Text category='p1'><strong>Afiliado</strong> significa una entidad que controla, es controlada o está bajo el control común de una parte, donde control significa la propiedad del 50 % o más de las acciones, participación accionaria o otros valores con derecho a voto para la elección de directores u otra autoridad de gestión.</Text>


						<Text category='p1'><strong>País</strong> se refiere a: España</Text>


						<Text category='p1'><strong>Empresa</strong> (referida como la Empresa, Nosotros o Nuestro en este Acuerdo) se refiere a Expert Garden, Expert Garden, Rafelbunyol (Valencia).</Text>


						<Text category='p1'><strong>Dispositivo</strong> significa cualquier dispositivo que pueda acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.</Text>


						<Text category='p1'><strong>Servicio</strong> hace referencia a la Aplicación.</Text>


						<Text category='p1'><strong>Términos y Condiciones</strong> (también denominados Términos) significan estos Términos y Condiciones que forman el acuerdo completo entre Usted y la Compañía con respecto al uso del Servicio. Este acuerdo de Términos y Condiciones ha sido creado con la ayuda del Generador de Términos y Condiciones.</Text>


						<Text category='p1'><strong>Servicio de redes sociales de terceros</strong> hace referencia a cualquier servicio o contenido (incluidos datos, información, productos o servicios) proporcionado por un tercero que se puede mostrar, incluir o hacer disponible por el Servicio.</Text>


						<Text category='p1'><strong>Usted</strong> hace referencia a la persona que accede o utiliza el Servicio, o la empresa u otra entidad legal en nombre de la cual dicha persona accede o utiliza el Servicio, según corresponda.</Text>


						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Reconocimiento</Text>
						<Text category='p1'>Estos son los Términos y Condiciones que rigen el uso de este Servicio y el acuerdo que opera entre Usted y la Compañía. Estos Términos y condiciones establecen los derechos y obligaciones de todos los usuarios con respecto al uso del Servicio.</Text>
						<Text category='p1'>Su acceso y uso del Servicio está condicionado a Su aceptación y cumplimiento de estos Términos y condiciones. Estos Términos y condiciones se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el Servicio.</Text>
						<Text category='p1'>Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos y condiciones. Si no está de acuerdo con alguna parte de estos Términos y condiciones, no podrá acceder al Servicio.</Text>
						<Text category='p1'>Usted declara que es mayor de 18 años. La Compañía no permite que menores de 18 años utilicen el Servicio.</Text>
						<Text category='p1'>Su acceso y uso del Servicio también está condicionado a Su aceptación y cumplimiento de la Política de Privacidad de la Compañía. Nuestra Política de privacidad describe Nuestras políticas y procedimientos sobre la recopilación, el uso y la divulgación de Su información personal cuando utiliza la Aplicación o el Sitio web y le informa sobre Sus derechos de privacidad y cómo la ley lo protege. Lea atentamente Nuestra Política de Privacidad antes de utilizar Nuestro Servicio.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Enlaces a otros sitios web</Text>
						<Text category='p1'>Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por la Compañía.</Text>
						<Text category='p1'>La Compañía no tiene control ni asume ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios web o servicios de terceros. Además, reconoce y acepta que la Compañía no será responsable, directa o indirectamente, de ningún daño o pérdida causados o presuntamente causados por o en relación con el uso o la confianza en dicho contenido, bienes o servicios disponibles en o a través de dichos sitios web o servicios.</Text>
						<Text category='p1'>Le recomendamos encarecidamente que lea los términos y condiciones y las políticas de privacidad de cualquier sitio web o servicio de terceros que visite.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Terminación</Text>
						<Text category='p1'>Podemos rescindir o suspender Su acceso de inmediato, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, entre otros, si incumple estos Términos y condiciones.</Text>
						<Text category='p1'>Al finalizar, Su derecho a utilizar el Servicio cesará inmediatamente.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Limitación de responsabilidad</Text>
						<Text category='p1'>Sin perjuicio de los daños en los que pueda incurrir, la responsabilidad total de la Compañía y cualquiera de sus proveedores en virtud de cualquier disposición de estos Términos y Su recurso exclusivo para todo lo anterior se limitará al monto realmente pagado. por Usted a través del Servicio o 100 USD si no ha comprado nada a través del Servicio.</Text>
						<Text category='p1'>En la máxima medida permitida por la ley aplicable, en ningún caso la Compañía o sus proveedores serán responsables de daños especiales, incidentales, indirectos o consecuentes (incluidos, entre otros, daños por pérdida de ganancias, pérdida de datos u otra información, por interrupción del negocio, por lesiones personales, pérdida de privacidad que surja o esté relacionada de alguna manera con el uso o la incapacidad de usar el Servicio, software de terceros y/o terceros. hardware de terceros utilizado con el Servicio, o en relación con cualquier disposición de estos Términos), incluso si la Compañía o cualquier proveedor ha sido advertido de la posibilidad de tales daños e incluso si el remedio no cumple con su propósito esencial.</Text>
						<Text category='p1'>Algunos estados no permiten la exclusión de garantías implícitas o la limitación de responsabilidad por daños incidentales o consecuentes, lo que significa que algunas de las limitaciones anteriores pueden no aplicarse. En estos estados, la responsabilidad de cada parte se limitará en la mayor medida permitida por la ley.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Descargo de responsabilidad</Text>
						<Text category='p1'>El Servicio se le proporciona TAL CUAL y SEGÚN DISPONIBILIDAD y con todas las fallas y defectos sin garantía de ningún tipo. En la medida máxima permitida por la ley aplicable, la Compañía, en su propio nombre y en nombre de sus Afiliados y sus respectivos otorgantes de licencias y proveedores de servicios, renuncia expresamente a todas las garantías, ya sean expresas, implícitas, estatutarias o de otro tipo, con respecto a la Servicio, incluidas todas las garantías implícitas de comerciabilidad, idoneidad para un propósito particular, título y no infracción, y garantías que puedan surgir del curso de la negociación, el curso del desempeño, el uso o la práctica comercial. Sin limitación a lo anterior, la Compañía no ofrece ninguna garantía o compromiso, y no hace ninguna representación de que el Servicio cumplirá con Sus requisitos, logrará los resultados previstos, será compatible o funcionará con cualquier otro software, aplicación, sistema o servicio, operará sin interrupción, cumplir con los estándares de rendimiento o confiabilidad o estar libre de errores o que cualquier error o defecto puede o será corregido.</Text>
						<Text category='p1'>Sin limitar lo anterior, ni la Compañía ni ninguno de los proveedores de la compañía hace ninguna representación o garantía de ningún tipo, expresa o implícita: (i) en cuanto a la operación o disponibilidad del Servicio, o la información, contenido y materiales o productos incluidos en los mismos; (ii) que el Servicio será ininterrumpido o libre de errores; (iii) en cuanto a la precisión, confiabilidad o actualidad de cualquier información o contenido proporcionado a través del Servicio; o (iv) que el Servicio, sus servidores, el contenido o los correos electrónicos enviados desde o en nombre de la Compañía están libres de virus, secuencias de comandos, caballos de Troya, gusanos, malware, bombas de tiempo u otros componentes dañinos.</Text>
						<Text category='p1'>Algunas jurisdicciones no permiten la exclusión de ciertos tipos de garantías o limitaciones de los derechos legales aplicables de un consumidor, por lo que es posible que algunas o todas las exclusiones y limitaciones anteriores no se apliquen a usted. Pero en tal caso, las exclusiones y limitaciones establecidas en esta sección se aplicarán en la mayor medida exigible según la ley aplicable.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Ley aplicable</Text>
						<Text category='p1'>Las leyes del País, excluyendo sus conflictos de leyes, regirán estos Términos y Su uso del Servicio. Su uso de la Aplicación también puede estar sujeto a otras leyes locales, estatales, nacionales o internacionales.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Resolución de disputas</Text>
						<Text category='p1'>Si tiene alguna inquietud o disputa sobre el Servicio, acepta intentar primero resolver la disputa de manera informal comunicándose con la Compañía.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Para usuarios de la Unión Europea (UE)</Text>
						<Text category='p1'>Si usted es un consumidor de la Unión Europea, se beneficiará de las disposiciones obligatorias de la ley del país en el que reside.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Cumplimiento legal de los Estados Unidos</Text>
						<Text category='p1'>Usted declara y garantiza que (i) no se encuentra en un país que esté sujeto al embargo del gobierno de los Estados Unidos, o que haya sido designado por el gobierno de los Estados Unidos como un país que apoya al terrorismo, y (ii) No figura en ninguna lista del gobierno de los Estados Unidos de partes prohibidas o restringidas.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Divisibilidad y renuncia</Text>
						<Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Divisibilidad</Text>
						<Text category='p1'>Si alguna disposición de estos Términos se considera inaplicable o inválida, dicha disposición se cambiará e interpretará para lograr los objetivos de dicha disposición en la mayor medida posible según la ley aplicable y las disposiciones restantes continuarán. en pleno vigor y efecto.</Text>
						<Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Renuncia</Text>
						<Text category='p1'>Excepto por lo dispuesto en el presente, la falta de ejercicio de un derecho o de exigir el cumplimiento de una obligación en virtud de estos Términos no afectará la capacidad de las partes para ejercer dicho derecho o exigir dicho cumplimiento en cualquier momento posterior ni el la renuncia a un incumplimiento constituye una renuncia a cualquier incumplimiento posterior.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Traducción Interpretación</Text>
						<Text category='p1'>Es posible que estos Términos y condiciones se hayan traducido si los hemos puesto a su disposición en nuestro Servicio.
							Usted acepta que el texto original en inglés prevalecerá en caso de disputa.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Cambios a estos Términos y Condiciones</Text>
						<Text category='p1'>Nos reservamos el derecho, a Nuestro exclusivo criterio, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es importante, haremos todos los esfuerzos razonables para proporcionar un aviso de al menos 30 días antes de que entren en vigencia los nuevos términos. Lo que constituye un cambio material se determinará a Nuestro exclusivo criterio.</Text>
						<Text category='p1'>Al continuar accediendo o utilizando Nuestro Servicio después de que esas revisiones entren en vigencia, Usted acepta estar sujeto a los términos revisados. Si no está de acuerdo con los nuevos términos, total o parcialmente, deje de usar el sitio web y el Servicio.</Text>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.title, marginBottom: 0, marginTop: 30 }}>Contáctenos</Text>
						<Text category='p1'>Si tiene alguna pregunta sobre estos Términos y condiciones, puede contactarnos:</Text>
						<Text category='p1'>Al visitar esta página en nuestro sitio web:  https://expert-garden.web.app/</Text>

						<View style={{ alignItems: 'center' }}>
							<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
						</View>
					</View>
				</Layout >
			</ScrollView>
		</SafeAreaView>
	)
};

TermsAndConditionsScreen.propTypes = {
	debug: PropTypes.bool.isRequired,
};

TermsAndConditionsScreen.defaultProps = {
	debug: Constants.manifest.extra.debug || false,
};
