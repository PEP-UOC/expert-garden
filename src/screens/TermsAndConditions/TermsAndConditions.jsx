/*
	Copyright(C) 2022 Jose Fernández Marín

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>*/

import React from 'react'
import PropTypes from "prop-types";
import { StatusBar } from 'expo-status-bar';

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
import { Platform } from 'react-native';

// eslint-disable-next-line no-unused-vars
export const TermsAndConditionsScreen = ({ debug }) => {

	//Styles
	const gloStyles = useStyleSheet(globalStyles);
	const ownStyles = useStyleSheet(styles);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView alwaysBounceVertical={true} centerContent={true}
				contentContainerStyle={{ ...gloStyles.scrollView }}>
				<Layout style={{ ...gloStyles.layout, justifyContent: 'flex-start' }}>
					<SeparatorTopScreen />
					<View style={{ ...ownStyles.view, maxWidth: 700 }}>
						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle, alignSelf: 'center' }}>EXPERT GARDEN</Text>
						<Text category='h2' style={{ ...gloStyles?.h2, ...ownStyles?.mainTitle, alignSelf: 'center' }}>Términos y condiciones / Copyright ©</Text>
						<Text category='p1' style={{ ...gloStyles?.p1, ...ownStyles?.mainTitle, alignSelf: 'center' }}>Última actualización: 23 de mayo de 2022</Text>

						<View style={{ alignItems: 'center', marginTop: 40 }}>
							<LeafIcon width={360} height={120} style={{ ...gloStyles?.leaf }} />
						</View>

						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle, alignSelf: 'center', marginBottom: 0, marginTop: 40 }}>TÉRMINOS Y CONDICIONES</Text>
						<Text category='p1' style={{ ...gloStyles?.p1, ...ownStyles?.mainTitle, alignSelf: 'center' }}>Lea atentamente estos términos y condiciones antes de utilizar Nuestro Servicio.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Interpretación y definiciones</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }}>Interpretación</Text>
						<Text category='p1' style={{ width: '100%' }}>Las palabras cuya letra inicial está en mayúscula tienen significados definidos bajo las siguientes condiciones. Las siguientes definiciones tendrán el mismo significado independientemente de que aparezcan en singular o en plural.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }}>Definiciones</Text>
						<Text category='p1' style={{ width: '100%' }}>A los efectos de estos Términos y condiciones:</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Aplicación</strong> hace referencia al programa de software proporcionado por la Empresa descargado por Usted en cualquier dispositivo electrónico, denominado Expert Garden</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Tienda de aplicaciones</strong> hace referencia al servicio de distribución digital operado y desarrollado por Apple Inc. (Apple App Store) o Google Inc. (Google Play Store) en el que se ha descargado la Aplicación. .</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Afiliado</strong> significa una entidad que controla, es controlada o está bajo el control común de una parte, donde control significa la propiedad del 50 % o más de las acciones, participación accionaria o otros valores con derecho a voto para la elección de directores u otra autoridad de gestión.</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>País</strong> se refiere a: España</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Empresa</strong> (referida como la Empresa, Nosotros o Nuestro en este Acuerdo) se refiere a Expert Garden, Expert Garden, Rafelbunyol (Valencia).</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Dispositivo</strong> significa cualquier dispositivo que pueda acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Servicio</strong> hace referencia a la Aplicación.</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Términos y Condiciones</strong> (también denominados Términos) significan estos Términos y Condiciones que forman el acuerdo completo entre Usted y la Compañía con respecto al uso del Servicio. Este acuerdo de Términos y Condiciones ha sido creado con la ayuda del Generador de Términos y Condiciones.</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Servicio de redes sociales de terceros</strong> hace referencia a cualquier servicio o contenido (incluidos datos, información, productos o servicios) proporcionado por un tercero que se puede mostrar, incluir o hacer disponible por el Servicio.</Text>
						<Text category='p1' style={{ width: '100%' }}><strong>Usted</strong> hace referencia a la persona que accede o utiliza el Servicio, o la empresa u otra entidad legal en nombre de la cual dicha persona accede o utiliza el Servicio, según corresponda.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Reconocimiento</Text>
						<Text category='p1' style={{ width: '100%' }}>Estos son los Términos y Condiciones que rigen el uso de este Servicio y el acuerdo que opera entre Usted y la Compañía. Estos Términos y condiciones establecen los derechos y obligaciones de todos los usuarios con respecto al uso del Servicio.</Text>
						<Text category='p1' style={{ width: '100%' }}>Su acceso y uso del Servicio está condicionado a Su aceptación y cumplimiento de estos Términos y condiciones. Estos Términos y condiciones se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el Servicio.</Text>
						<Text category='p1' style={{ width: '100%' }}>Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos y condiciones. Si no está de acuerdo con alguna parte de estos Términos y condiciones, no podrá acceder al Servicio.</Text>
						<Text category='p1' style={{ width: '100%' }}>Usted declara que es mayor de 18 años. La Compañía no permite que menores de 18 años utilicen el Servicio.</Text>
						<Text category='p1' style={{ width: '100%' }}>Su acceso y uso del Servicio también está condicionado a Su aceptación y cumplimiento de la Política de Privacidad de la Compañía. Nuestra Política de privacidad describe Nuestras políticas y procedimientos sobre la recopilación, el uso y la divulgación de Su información personal cuando utiliza la Aplicación o el Sitio web y le informa sobre Sus derechos de privacidad y cómo la ley lo protege. Lea atentamente Nuestra Política de Privacidad antes de utilizar Nuestro Servicio.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Enlaces a otros sitios web</Text>
						<Text category='p1' style={{ width: '100%' }}>Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por la Compañía.</Text>
						<Text category='p1' style={{ width: '100%' }}>La Compañía no tiene control ni asume ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios web o servicios de terceros. Además, reconoce y acepta que la Compañía no será responsable, directa o indirectamente, de ningún daño o pérdida causados o presuntamente causados por o en relación con el uso o la confianza en dicho contenido, bienes o servicios disponibles en o a través de dichos sitios web o servicios.</Text>
						<Text category='p1' style={{ width: '100%' }}>Le recomendamos encarecidamente que lea los términos y condiciones y las políticas de privacidad de cualquier sitio web o servicio de terceros que visite.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Terminación</Text>
						<Text category='p1' style={{ width: '100%' }}>Podemos rescindir o suspender Su acceso de inmediato, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, entre otros, si incumple estos Términos y condiciones.</Text>
						<Text category='p1' style={{ width: '100%' }}>Al finalizar, Su derecho a utilizar el Servicio cesará inmediatamente.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Limitación de responsabilidad</Text>
						<Text category='p1' style={{ width: '100%' }}>Sin perjuicio de los daños en los que pueda incurrir, la responsabilidad total de la Compañía y cualquiera de sus proveedores en virtud de cualquier disposición de estos Términos y Su recurso exclusivo para todo lo anterior se limitará al monto realmente pagado. por Usted a través del Servicio o 100 USD si no ha comprado nada a través del Servicio.</Text>
						<Text category='p1' style={{ width: '100%' }}>En la máxima medida permitida por la ley aplicable, en ningún caso la Compañía o sus proveedores serán responsables de daños especiales, incidentales, indirectos o consecuentes (incluidos, entre otros, daños por pérdida de ganancias, pérdida de datos u otra información, por interrupción del negocio, por lesiones personales, pérdida de privacidad que surja o esté relacionada de alguna manera con el uso o la incapacidad de usar el Servicio, software de terceros y/o terceros. hardware de terceros utilizado con el Servicio, o en relación con cualquier disposición de estos Términos), incluso si la Compañía o cualquier proveedor ha sido advertido de la posibilidad de tales daños e incluso si el remedio no cumple con su propósito esencial.</Text>
						<Text category='p1' style={{ width: '100%' }}>Algunos estados no permiten la exclusión de garantías implícitas o la limitación de responsabilidad por daños incidentales o consecuentes, lo que significa que algunas de las limitaciones anteriores pueden no aplicarse. En estos estados, la responsabilidad de cada parte se limitará en la mayor medida permitida por la ley.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Descargo de responsabilidad</Text>
						<Text category='p1' style={{ width: '100%' }}>El Servicio se le proporciona TAL CUAL y SEGÚN DISPONIBILIDAD y con todas las fallas y defectos sin garantía de ningún tipo. En la medida máxima permitida por la ley aplicable, la Compañía, en su propio nombre y en nombre de sus Afiliados y sus respectivos otorgantes de licencias y proveedores de servicios, renuncia expresamente a todas las garantías, ya sean expresas, implícitas, estatutarias o de otro tipo, con respecto a la Servicio, incluidas todas las garantías implícitas de comerciabilidad, idoneidad para un propósito particular, título y no infracción, y garantías que puedan surgir del curso de la negociación, el curso del desempeño, el uso o la práctica comercial. Sin limitación a lo anterior, la Compañía no ofrece ninguna garantía o compromiso, y no hace ninguna representación de que el Servicio cumplirá con Sus requisitos, logrará los resultados previstos, será compatible o funcionará con cualquier otro software, aplicación, sistema o servicio, operará sin interrupción, cumplir con los estándares de rendimiento o confiabilidad o estar libre de errores o que cualquier error o defecto puede o será corregido.</Text>
						<Text category='p1' style={{ width: '100%' }}>Sin limitar lo anterior, ni la Compañía ni ninguno de los proveedores de la compañía hace ninguna representación o garantía de ningún tipo, expresa o implícita: (i) en cuanto a la operación o disponibilidad del Servicio, o la información, contenido y materiales o productos incluidos en los mismos; (ii) que el Servicio será ininterrumpido o libre de errores; (iii) en cuanto a la precisión, confiabilidad o actualidad de cualquier información o contenido proporcionado a través del Servicio; o (iv) que el Servicio, sus servidores, el contenido o los correos electrónicos enviados desde o en nombre de la Compañía están libres de virus, secuencias de comandos, caballos de Troya, gusanos, malware, bombas de tiempo u otros componentes dañinos.</Text>
						<Text category='p1' style={{ width: '100%' }}>Algunas jurisdicciones no permiten la exclusión de ciertos tipos de garantías o limitaciones de los derechos legales aplicables de un consumidor, por lo que es posible que algunas o todas las exclusiones y limitaciones anteriores no se apliquen a usted. Pero en tal caso, las exclusiones y limitaciones establecidas en esta sección se aplicarán en la mayor medida exigible según la ley aplicable.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Ley aplicable</Text>
						<Text category='p1' style={{ width: '100%' }}>Las leyes del País, excluyendo sus conflictos de leyes, regirán estos Términos y Su uso del Servicio. Su uso de la Aplicación también puede estar sujeto a otras leyes locales, estatales, nacionales o internacionales.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Resolución de disputas</Text>
						<Text category='p1' style={{ width: '100%' }}>Si tiene alguna inquietud o disputa sobre el Servicio, acepta intentar primero resolver la disputa de manera informal comunicándose con la Compañía.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Para usuarios de la Unión Europea (UE)</Text>
						<Text category='p1' style={{ width: '100%' }}>Si usted es un consumidor de la Unión Europea, se beneficiará de las disposiciones obligatorias de la ley del país en el que reside.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Cumplimiento legal de los Estados Unidos</Text>
						<Text category='p1' style={{ width: '100%' }}>Usted declara y garantiza que (i) no se encuentra en un país que esté sujeto al embargo del gobierno de los Estados Unidos, o que haya sido designado por el gobierno de los Estados Unidos como un país que apoya al terrorismo, y (ii) No figura en ninguna lista del gobierno de los Estados Unidos de partes prohibidas o restringidas.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Divisibilidad y renuncia</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }}>Divisibilidad</Text>
						<Text category='p1' style={{ width: '100%' }}>Si alguna disposición de estos Términos se considera inaplicable o inválida, dicha disposición se cambiará e interpretará para lograr los objetivos de dicha disposición en la mayor medida posible según la ley aplicable y las disposiciones restantes continuarán. en pleno vigor y efecto.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }}>Renuncia</Text>
						<Text category='p1' style={{ width: '100%' }}>Excepto por lo dispuesto en el presente, la falta de ejercicio de un derecho o de exigir el cumplimiento de una obligación en virtud de estos Términos no afectará la capacidad de las partes para ejercer dicho derecho o exigir dicho cumplimiento en cualquier momento posterior ni el la renuncia a un incumplimiento constituye una renuncia a cualquier incumplimiento posterior.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Traducción Interpretación</Text>
						<Text category='p1' style={{ width: '100%' }}>Es posible que estos Términos y condiciones se hayan traducido si los hemos puesto a su disposición en nuestro Servicio.
							Usted acepta que el texto original en inglés prevalecerá en caso de disputa.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Cambios a estos Términos y Condiciones</Text>
						<Text category='p1' style={{ width: '100%' }}>Nos reservamos el derecho, a Nuestro exclusivo criterio, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es importante, haremos todos los esfuerzos razonables para proporcionar un aviso de al menos 30 días antes de que entren en vigencia los nuevos términos. Lo que constituye un cambio material se determinará a Nuestro exclusivo criterio.</Text>
						<Text category='p1' style={{ width: '100%' }}>Al continuar accediendo o utilizando Nuestro Servicio después de que esas revisiones entren en vigencia, Usted acepta estar sujeto a los términos revisados. Si no está de acuerdo con los nuevos términos, total o parcialmente, deje de usar el sitio web y el Servicio.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>Contáctenos</Text>
						<Text category='p1' style={{ width: '100%' }}>Si tiene alguna pregunta sobre estos Términos y condiciones, puede contactarnos:</Text>
						<Text category='p1' style={{ width: '100%' }}>Al visitar esta página en nuestro sitio web:  https://expert-garden.web.app/</Text>



						<View style={{ alignItems: 'center', marginTop: 40 }}>
							<LeafIcon width={360} height={120} style={{ ...gloStyles?.leaf }} />
						</View>



						<Text category='h1' style={{ ...gloStyles?.h1, ...ownStyles?.mainTitle, alignSelf: 'center', marginBottom: 0, marginTop: 40 }}>COPYRIGHT ©</Text>
						<Text category='p1' style={{ ...gloStyles?.p1, ...ownStyles?.mainTitle, alignSelf: 'center' }}>Lea atentamente esta licencia antes de redistribuir o modificar este programa.</Text>



						<Text category='h1' style={{ ...gloStyles?.h1, marginBottom: 0, marginTop: 40 }}>GNU GENERAL PUBLIC LICENSE</Text>

						<Text category='p1' style={{ width: '100%' }}>Version 3, 29 June 2007</Text>

						<Text category='p1' style={{ width: '100%' }}>Copyright © 2007 Free Software Foundation, Inc.
							<a href="https://fsf.org/">https://fsf.org/</a></Text>
						<Text category='p1' style={{ width: '100%' }}>
							Everyone is permitted to copy and distribute verbatim copies
							of this license document, but changing it is not allowed.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="preamble">Preamble</Text>

						<Text category='p1' style={{ width: '100%' }}>The GNU General Public License is a free, copyleft license for
							software and other kinds of works.</Text>

						<Text category='p1' style={{ width: '100%' }}>The licenses for most software and other practical works are designed
							to take away your freedom to share and change the works.  By contrast,
							the GNU General Public License is intended to guarantee your freedom to
							share and change all versions of a program--to make sure it remains free
							software for all its users.  We, the Free Software Foundation, use the
							GNU General Public License for most of our software; it applies also to
							any other work released this way by its authors.  You can apply it to
							your programs, too.</Text>

						<Text category='p1' style={{ width: '100%' }}>When we speak of free software, we are referring to freedom, not
							price.  Our General Public Licenses are designed to make sure that you
							have the freedom to distribute copies of free software (and charge for
							them if you wish), that you receive source code or can get it if you
							want it, that you can change the software or use pieces of it in new
							free programs, and that you know you can do these things.</Text>

						<Text category='p1' style={{ width: '100%' }}>To protect your rights, we need to prevent others from denying you
							these rights or asking you to surrender the rights.  Therefore, you have
							certain responsibilities if you distribute copies of the software, or if
							you modify it: responsibilities to respect the freedom of others.</Text>

						<Text category='p1' style={{ width: '100%' }}>For example, if you distribute copies of such a program, whether
							gratis or for a fee, you must pass on to the recipients the same
							freedoms that you received.  You must make sure that they, too, receive
							or can get the source code.  And you must show them these terms so they
							know their rights.</Text>

						<Text category='p1' style={{ width: '100%' }}>Developers that use the GNU GPL protect your rights with two steps:
							(1) assert copyright on the software, and (2) offer you this License
							giving you legal permission to copy, distribute and/or modify it.</Text>

						<Text category='p1' style={{ width: '100%' }}>For the developers and authors protection, the GPL clearly explains
							that there is no warranty for this free software.  For both users and
							authors sake, the GPL requires that modified versions be marked as
							changed, so that their problems will not be attributed erroneously to
							authors of previous versions.</Text>

						<Text category='p1' style={{ width: '100%' }}>Some devices are designed to deny users access to install or run
							modified versions of the software inside them, although the manufacturer
							can do so.  This is fundamentally incompatible with the aim of
							protecting users freedom to change the software.  The systematic
							pattern of such abuse occurs in the area of products for individuals to
							use, which is precisely where it is most unacceptable.  Therefore, we
							have designed this version of the GPL to prohibit the practice for those
							products.  If such problems arise substantially in other domains, we
							stand ready to extend this provision to those domains in future versions
							of the GPL, as needed to protect the freedom of users.</Text>

						<Text category='p1' style={{ width: '100%' }}>Finally, every program is threatened constantly by software patents.
							States should not allow patents to restrict development and use of
							software on general-purpose computers, but in those that do, we wish to
							avoid the special danger that patents applied to a free program could
							make it effectively proprietary.  To prevent this, the GPL assures that
							patents cannot be used to render the program non-free.</Text>

						<Text category='p1' style={{ width: '100%' }}>The precise terms and conditions for copying, distribution and
							modification follow.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="terms">TERMS AND CONDITIONS</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section0">0. Definitions.</Text>

						<Text category='p1' style={{ width: '100%' }}>“This License” refers to version 3 of the GNU General Public License.</Text>

						<Text category='p1' style={{ width: '100%' }}>“Copyright” also means copyright-like laws that apply to other kinds of
							works, such as semiconductor masks.</Text>

						<Text category='p1' style={{ width: '100%' }}>“The Program” refers to any copyrightable work licensed under this
							License.  Each licensee is addressed as “you”.  “Licensees” and
							“recipients” may be individuals or organizations.</Text>

						<Text category='p1' style={{ width: '100%' }}>To “modify” a work means to copy from or adapt all or part of the work
							in a fashion requiring copyright permission, other than the making of an
							exact copy.  The resulting work is called a “modified version” of the
							earlier work or a work “based on” the earlier work.</Text>

						<Text category='p1' style={{ width: '100%' }}>A “covered work” means either the unmodified Program or a work based
							on the Program.</Text>

						<Text category='p1' style={{ width: '100%' }}>To “propagate” a work means to do anything with it that, without
							permission, would make you directly or secondarily liable for
							infringement under applicable copyright law, except executing it on a
							computer or modifying a private copy.  Propagation includes copying,
							distribution (with or without modification), making available to the
							public, and in some countries other activities as well.</Text>

						<Text category='p1' style={{ width: '100%' }}>To “convey” a work means any kind of propagation that enables other
							parties to make or receive copies.  Mere interaction with a user through
							a computer network, with no transfer of a copy, is not conveying.</Text>

						<Text category='p1' style={{ width: '100%' }}>An interactive user interface displays “Appropriate Legal Notices”
							to the extent that it includes a convenient and prominently visible
							feature that (1) displays an appropriate copyright notice, and (2)
							tells the user that there is no warranty for the work (except to the
							extent that warranties are provided), that licensees may convey the
							work under this License, and how to view a copy of this License.  If
							the interface presents a list of user commands or options, such as a
							menu, a prominent item in the list meets this criterion.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section1">1. Source Code.</Text>

						<Text category='p1' style={{ width: '100%' }}>The “source code” for a work means the preferred form of the work
							for making modifications to it.  “Object code” means any non-source
							form of a work.</Text>

						<Text category='p1' style={{ width: '100%' }}>A “Standard Interface” means an interface that either is an official
							standard defined by a recognized standards body, or, in the case of
							interfaces specified for a particular programming language, one that
							is widely used among developers working in that language.</Text>

						<Text category='p1' style={{ width: '100%' }}>The “System Libraries” of an executable work include anything, other
							than the work as a whole, that (a) is included in the normal form of
							packaging a Major Component, but which is not part of that Major
							Component, and (b) serves only to enable use of the work with that
							Major Component, or to implement a Standard Interface for which an
							implementation is available to the public in source code form.  A
							“Major Component”, in this context, means a major essential component
							(kernel, window system, and so on) of the specific operating system
							(if any) on which the executable work runs, or a compiler used to
							produce the work, or an object code interpreter used to run it.</Text>

						<Text category='p1' style={{ width: '100%' }}>The “Corresponding Source” for a work in object code form means all
							the source code needed to generate, install, and (for an executable
							work) run the object code and to modify the work, including scripts to
							control those activities.  However, it does not include the works
							System Libraries, or general-purpose tools or generally available free
							programs which are used unmodified in performing those activities but
							which are not part of the work.  For example, Corresponding Source
							includes interface definition files associated with source files for
							the work, and the source code for shared libraries and dynamically
							linked subprograms that the work is specifically designed to require,
							such as by intimate data communication or control flow between those
							subprograms and other parts of the work.</Text>

						<Text category='p1' style={{ width: '100%' }}>The Corresponding Source need not include anything that users
							can regenerate automatically from other parts of the Corresponding
							Source.</Text>

						<Text category='p1' style={{ width: '100%' }}>The Corresponding Source for a work in source code form is that
							same work.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section2">2. Basic Permissions.</Text>

						<Text category='p1' style={{ width: '100%' }}>All rights granted under this License are granted for the term of
							copyright on the Program, and are irrevocable provided the stated
							conditions are met.  This License explicitly affirms your unlimited
							permission to run the unmodified Program.  The output from running a
							covered work is covered by this License only if the output, given its
							content, constitutes a covered work.  This License acknowledges your
							rights of fair use or other equivalent, as provided by copyright law.</Text>

						<Text category='p1' style={{ width: '100%' }}>You may make, run and propagate covered works that you do not
							convey, without conditions so long as your license otherwise remains
							in force.  You may convey covered works to others for the sole purpose
							of having them make modifications exclusively for you, or provide you
							with facilities for running those works, provided that you comply with
							the terms of this License in conveying all material for which you do
							not control copyright.  Those thus making or running the covered works
							for you must do so exclusively on your behalf, under your direction
							and control, on terms that prohibit them from making any copies of
							your copyrighted material outside their relationship with you.</Text>

						<Text category='p1' style={{ width: '100%' }}>Conveying under any other circumstances is permitted solely under
							the conditions stated below.  Sublicensing is not allowed; section 10
							makes it unnecessary.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section3">3. Protecting Users Legal Rights From Anti-Circumvention Law.</Text>

						<Text category='p1' style={{ width: '100%' }}>No covered work shall be deemed part of an effective technological
							measure under any applicable law fulfilling obligations under article
							11 of the WIPO copyright treaty adopted on 20 December 1996, or
							similar laws prohibiting or restricting circumvention of such
							measures.</Text>

						<Text category='p1' style={{ width: '100%' }}>When you convey a covered work, you waive any legal power to forbid
							circumvention of technological measures to the extent such circumvention
							is effected by exercising rights under this License with respect to
							the covered work, and you disclaim any intention to limit operation or
							modification of the work as a means of enforcing, against the works
							users, your or third parties legal rights to forbid circumvention of
							technological measures.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section4">4. Conveying Verbatim Copies.</Text>

						<Text category='p1' style={{ width: '100%' }}>You may convey verbatim copies of the Programs source code as you
							receive it, in any medium, provided that you conspicuously and
							appropriately publish on each copy an appropriate copyright notice;
							keep intact all notices stating that this License and any
							non-permissive terms added in accord with section 7 apply to the code;
							keep intact all notices of the absence of any warranty; and give all
							recipients a copy of this License along with the Program.</Text>

						<Text category='p1' style={{ width: '100%' }}>You may charge any price or no price for each copy that you convey,
							and you may offer support or warranty protection for a fee.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section5">5. Conveying Modified Source Versions.</Text>

						<Text category='p1' style={{ width: '100%' }}>You may convey a work based on the Program, or the modifications to
							produce it from the Program, in the form of source code under the
							terms of section 4, provided that you also meet all of these conditions:</Text>


						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>a - The work must carry prominent notices stating that you modified
							it, and giving a relevant date.</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>b - The work must carry prominent notices stating that it is
							released under this License and any conditions added under section
							7.  This requirement modifies the requirement in section 4 to
							“keep intact all notices”.</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>c - You must license the entire work, as a whole, under this
							License to anyone who comes into possession of a copy.  This
							License will therefore apply, along with any applicable section 7
							additional terms, to the whole of the work, and all its parts,
							regardless of how they are packaged.  This License gives no
							permission to license the work in any other way, but it does not
							invalidate such permission if you have separately received it.</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>d - If the work has interactive user interfaces, each must display
							Appropriate Legal Notices; however, if the Program has interactive
							interfaces that do not display Appropriate Legal Notices, your
							work need not make them do so.</Text>


						<Text category='p1' style={{ width: '100%' }}>A compilation of a covered work with other separate and independent
							works, which are not by their nature extensions of the covered work,
							and which are not combined with it such as to form a larger program,
							in or on a volume of a storage or distribution medium, is called an
							“aggregate” if the compilation and its resulting copyright are not
							used to limit the access or legal rights of the compilations users
							beyond what the individual works permit.  Inclusion of a covered work
							in an aggregate does not cause this License to apply to the other
							parts of the aggregate.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section6">6. Conveying Non-Source Forms.</Text>

						<Text category='p1' style={{ width: '100%' }}>You may convey a covered work in object code form under the terms
							of sections 4 and 5, provided that you also convey the
							machine-readable Corresponding Source under the terms of this License,
							in one of these ways:</Text>


						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>a - Convey the object code in, or embodied in, a physical product
							(including a physical distribution medium), accompanied by the
							Corresponding Source fixed on a durable physical medium
							customarily used for software interchange.</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>b - Convey the object code in, or embodied in, a physical product
							(including a physical distribution medium), accompanied by a
							written offer, valid for at least three years and valid for as
							long as you offer spare parts or customer support for that product
							model, to give anyone who possesses the object code either (1) a
							copy of the Corresponding Source for all the software in the
							product that is covered by this License, on a durable physical
							medium customarily used for software interchange, for a price no
							more than your reasonable cost of physically performing this
							conveying of source, or (2) access to copy the
							Corresponding Source from a network server at no charge.</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>c - Convey individual copies of the object code with a copy of the
							written offer to provide the Corresponding Source.  This
							alternative is allowed only occasionally and noncommercially, and
							only if you received the object code with such an offer, in accord
							with subsection 6b.</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>d - Convey the object code by offering access from a designated
							place (gratis or for a charge), and offer equivalent access to the
							Corresponding Source in the same way through the same place at no
							further charge.  You need not require recipients to copy the
							Corresponding Source along with the object code.  If the place to
							copy the object code is a network server, the Corresponding Source
							may be on a different server (operated by you or a third party)
							that supports equivalent copying facilities, provided you maintain
							clear directions next to the object code saying where to find the
							Corresponding Source.  Regardless of what server hosts the
							Corresponding Source, you remain obligated to ensure that it is
							available for as long as needed to satisfy these requirements.</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>e - Convey the object code using peer-to-peer transmission, provided
							you inform other peers where the object code and Corresponding
							Source of the work are being offered to the general public at no
							charge under subsection 6d.</Text>


						<Text category='p1' style={{ width: '100%' }}>A separable portion of the object code, whose source code is excluded
							from the Corresponding Source as a System Library, need not be
							included in conveying the object code work.</Text>

						<Text category='p1' style={{ width: '100%' }}>A “User Product” is either (1) a “consumer product”, which means any
							tangible personal property which is normally used for personal, family,
							or household purposes, or (2) anything designed or sold for incorporation
							into a dwelling.  In determining whether a product is a consumer product,
							doubtful cases shall be resolved in favor of coverage.  For a particular
							product received by a particular user, “normally used” refers to a
							typical or common use of that class of product, regardless of the status
							of the particular user or of the way in which the particular user
							actually uses, or expects or is expected to use, the product.  A product
							is a consumer product regardless of whether the product has substantial
							commercial, industrial or non-consumer uses, unless such uses represent
							the only significant mode of use of the product.</Text>

						<Text category='p1' style={{ width: '100%' }}>“Installation Information” for a User Product means any methods,
							procedures, authorization keys, or other information required to install
							and execute modified versions of a covered work in that User Product from
							a modified version of its Corresponding Source.  The information must
							suffice to ensure that the continued functioning of the modified object
							code is in no case prevented or interfered with solely because
							modification has been made.</Text>

						<Text category='p1' style={{ width: '100%' }}>If you convey an object code work under this section in, or with, or
							specifically for use in, a User Product, and the conveying occurs as
							part of a transaction in which the right of possession and use of the
							User Product is transferred to the recipient in perpetuity or for a
							fixed term (regardless of how the transaction is characterized), the
							Corresponding Source conveyed under this section must be accompanied
							by the Installation Information.  But this requirement does not apply
							if neither you nor any third party retains the ability to install
							modified object code on the User Product (for example, the work has
							been installed in ROM).</Text>

						<Text category='p1' style={{ width: '100%' }}>The requirement to provide Installation Information does not include a
							requirement to continue to provide support service, warranty, or updates
							for a work that has been modified or installed by the recipient, or for
							the User Product in which it has been modified or installed.  Access to a
							network may be denied when the modification itself materially and
							adversely affects the operation of the network or violates the rules and
							protocols for communication across the network.</Text>

						<Text category='p1' style={{ width: '100%' }}>Corresponding Source conveyed, and Installation Information provided,
							in accord with this section must be in a format that is publicly
							documented (and with an implementation available to the public in
							source code form), and must require no special password or key for
							unpacking, reading or copying.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section7">7. Additional Terms.</Text>

						<Text category='p1' style={{ width: '100%' }}>“Additional permissions” are terms that supplement the terms of this
							License by making exceptions from one or more of its conditions.
							Additional permissions that are applicable to the entire Program shall
							be treated as though they were included in this License, to the extent
							that they are valid under applicable law.  If additional permissions
							apply only to part of the Program, that part may be used separately
							under those permissions, but the entire Program remains governed by
							this License without regard to the additional permissions.</Text>

						<Text category='p1' style={{ width: '100%' }}>When you convey a copy of a covered work, you may at your option
							remove any additional permissions from that copy, or from any part of
							it.  (Additional permissions may be written to require their own
							removal in certain cases when you modify the work.)  You may place
							additional permissions on material, added by you to a covered work,
							for which you have or can give appropriate copyright permission.</Text>

						<Text category='p1' style={{ width: '100%' }}>Notwithstanding any other provision of this License, for material you
							add to a covered work, you may (if authorized by the copyright holders of
							that material) supplement the terms of this License with terms:</Text>


						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>a - Disclaiming warranty or limiting liability differently from the
							terms of sections 15 and 16 of this License; or</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>b - Requiring preservation of specified reasonable legal notices or
							author attributions in that material or in the Appropriate Legal
							Notices displayed by works containing it; or</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>c - Prohibiting misrepresentation of the origin of that material, or
							requiring that modified versions of such material be marked in
							reasonable ways as different from the original version; or</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>d - Limiting the use for publicity purposes of names of licensors or
							authors of the material; or</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>e - Declining to grant rights under trademark law for use of some
							trade names, trademarks, or service marks; or</Text>

						<Text category='p1' style={{ width: '100%', marginLeft: 60, marginBottom: 10, marginTop: 10 }}>f - Requiring indemnification of licensors and authors of that
							material by anyone who conveys the material (or modified versions of
							it) with contractual assumptions of liability to the recipient, for
							any liability that these contractual assumptions directly impose on
							those licensors and authors.</Text>


						<Text category='p1' style={{ width: '100%' }}>All other non-permissive additional terms are considered “further
							restrictions” within the meaning of section 10.  If the Program as you
							received it, or any part of it, contains a notice stating that it is
							governed by this License along with a term that is a further
							restriction, you may remove that term.  If a license document contains
							a further restriction but permits relicensing or conveying under this
							License, you may add to a covered work material governed by the terms
							of that license document, provided that the further restriction does
							not survive such relicensing or conveying.</Text>

						<Text category='p1' style={{ width: '100%' }}>If you add terms to a covered work in accord with this section, you
							must place, in the relevant source files, a statement of the
							additional terms that apply to those files, or a notice indicating
							where to find the applicable terms.</Text>

						<Text category='p1' style={{ width: '100%' }}>Additional terms, permissive or non-permissive, may be stated in the
							form of a separately written license, or stated as exceptions;
							the above requirements apply either way.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section8">8. Termination.</Text>

						<Text category='p1' style={{ width: '100%' }}>You may not propagate or modify a covered work except as expressly
							provided under this License.  Any attempt otherwise to propagate or
							modify it is void, and will automatically terminate your rights under
							this License (including any patent licenses granted under the third
							paragraph of section 11).</Text>

						<Text category='p1' style={{ width: '100%' }}>However, if you cease all violation of this License, then your
							license from a particular copyright holder is reinstated (a)
							provisionally, unless and until the copyright holder explicitly and
							finally terminates your license, and (b) permanently, if the copyright
							holder fails to notify you of the violation by some reasonable means
							prior to 60 days after the cessation.</Text>

						<Text category='p1' style={{ width: '100%' }}>Moreover, your license from a particular copyright holder is
							reinstated permanently if the copyright holder notifies you of the
							violation by some reasonable means, this is the first time you have
							received notice of violation of this License (for any work) from that
							copyright holder, and you cure the violation prior to 30 days after
							your receipt of the notice.</Text>

						<Text category='p1' style={{ width: '100%' }}>Termination of your rights under this section does not terminate the
							licenses of parties who have received copies or rights from you under
							this License.  If your rights have been terminated and not permanently
							reinstated, you do not qualify to receive new licenses for the same
							material under section 10.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section9">9. Acceptance Not Required for Having Copies.</Text>

						<Text category='p1' style={{ width: '100%' }}>You are not required to accept this License in order to receive or
							run a copy of the Program.  Ancillary propagation of a covered work
							occurring solely as a consequence of using peer-to-peer transmission
							to receive a copy likewise does not require acceptance.  However,
							nothing other than this License grants you permission to propagate or
							modify any covered work.  These actions infringe copyright if you do
							not accept this License.  Therefore, by modifying or propagating a
							covered work, you indicate your acceptance of this License to do so.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section10">10. Automatic Licensing of Downstream Recipients.</Text>

						<Text category='p1' style={{ width: '100%' }}>Each time you convey a covered work, the recipient automatically
							receives a license from the original licensors, to run, modify and
							propagate that work, subject to this License.  You are not responsible
							for enforcing compliance by third parties with this License.</Text>

						<Text category='p1' style={{ width: '100%' }}>An “entity transaction” is a transaction transferring control of an
							organization, or substantially all assets of one, or subdividing an
							organization, or merging organizations.  If propagation of a covered
							work results from an entity transaction, each party to that
							transaction who receives a copy of the work also receives whatever
							licenses to the work the partys predecessor in interest had or could
							give under the previous paragraph, plus a right to possession of the
							Corresponding Source of the work from the predecessor in interest, if
							the predecessor has it or can get it with reasonable efforts.</Text>

						<Text category='p1' style={{ width: '100%' }}>You may not impose any further restrictions on the exercise of the
							rights granted or affirmed under this License.  For example, you may
							not impose a license fee, royalty, or other charge for exercise of
							rights granted under this License, and you may not initiate litigation
							(including a cross-claim or counterclaim in a lawsuit) alleging that
							any patent claim is infringed by making, using, selling, offering for
							sale, or importing the Program or any portion of it.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section11">11. Patents.</Text>

						<Text category='p1' style={{ width: '100%' }}>A “contributor” is a copyright holder who authorizes use under this
							License of the Program or a work on which the Program is based.  The
							work thus licensed is called the contributors “contributor version”.</Text>

						<Text category='p1' style={{ width: '100%' }}>A contributors “essential patent claims” are all patent claims
							owned or controlled by the contributor, whether already acquired or
							hereafter acquired, that would be infringed by some manner, permitted
							by this License, of making, using, or selling its contributor version,
							but do not include claims that would be infringed only as a
							consequence of further modification of the contributor version.  For
							purposes of this definition, “control” includes the right to grant
							patent sublicenses in a manner consistent with the requirements of
							this License.</Text>

						<Text category='p1' style={{ width: '100%' }}>Each contributor grants you a non-exclusive, worldwide, royalty-free
							patent license under the contributors essential patent claims, to
							make, use, sell, offer for sale, import and otherwise run, modify and
							propagate the contents of its contributor version.</Text>

						<Text category='p1' style={{ width: '100%' }}>In the following three paragraphs, a “patent license” is any express
							agreement or commitment, however denominated, not to enforce a patent
							(such as an express permission to practice a patent or covenant not to
							sue for patent infringement).  To “grant” such a patent license to a
							party means to make such an agreement or commitment not to enforce a
							patent against the party.</Text>

						<Text category='p1' style={{ width: '100%' }}>If you convey a covered work, knowingly relying on a patent license,
							and the Corresponding Source of the work is not available for anyone
							to copy, free of charge and under the terms of this License, through a
							publicly available network server or other readily accessible means,
							then you must either (1) cause the Corresponding Source to be so
							available, or (2) arrange to deprive yourself of the benefit of the
							patent license for this particular work, or (3) arrange, in a manner
							consistent with the requirements of this License, to extend the patent
							license to downstream recipients.  “Knowingly relying” means you have
							actual knowledge that, but for the patent license, your conveying the
							covered work in a country, or your recipients use of the covered work
							in a country, would infringe one or more identifiable patents in that
							country that you have reason to believe are valid.</Text>

						<Text category='p1' style={{ width: '100%' }}>If, pursuant to or in connection with a single transaction or
							arrangement, you convey, or propagate by procuring conveyance of, a
							covered work, and grant a patent license to some of the parties
							receiving the covered work authorizing them to use, propagate, modify
							or convey a specific copy of the covered work, then the patent license
							you grant is automatically extended to all recipients of the covered
							work and works based on it.</Text>

						<Text category='p1' style={{ width: '100%' }}>A patent license is “discriminatory” if it does not include within
							the scope of its coverage, prohibits the exercise of, or is
							conditioned on the non-exercise of one or more of the rights that are
							specifically granted under this License.  You may not convey a covered
							work if you are a party to an arrangement with a third party that is
							in the business of distributing software, under which you make payment
							to the third party based on the extent of your activity of conveying
							the work, and under which the third party grants, to any of the
							parties who would receive the covered work from you, a discriminatory
							patent license (a) in connection with copies of the covered work
							conveyed by you (or copies made from those copies), or (b) primarily
							for and in connection with specific products or compilations that
							contain the covered work, unless you entered into that arrangement,
							or that patent license was granted, prior to 28 March 2007.</Text>

						<Text category='p1' style={{ width: '100%' }}>Nothing in this License shall be construed as excluding or limiting
							any implied license or other defenses to infringement that may
							otherwise be available to you under applicable patent law.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section12">12. No Surrender of Others Freedom.</Text>

						<Text category='p1' style={{ width: '100%' }}>If conditions are imposed on you (whether by court order, agreement or
							otherwise) that contradict the conditions of this License, they do not
							excuse you from the conditions of this License.  If you cannot convey a
							covered work so as to satisfy simultaneously your obligations under this
							License and any other pertinent obligations, then as a consequence you may
							not convey it at all.  For example, if you agree to terms that obligate you
							to collect a royalty for further conveying from those to whom you convey
							the Program, the only way you could satisfy both those terms and this
							License would be to refrain entirely from conveying the Program.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section13">13. Use with the GNU Affero General Public License.</Text>

						<Text category='p1' style={{ width: '100%' }}>Notwithstanding any other provision of this License, you have
							permission to link or combine any covered work with a work licensed
							under version 3 of the GNU Affero General Public License into a single
							combined work, and to convey the resulting work.  The terms of this
							License will continue to apply to the part which is the covered work,
							but the special requirements of the GNU Affero General Public License,
							section 13, concerning interaction through a network will apply to the
							combination as such.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section14">14. Revised Versions of this License.</Text>

						<Text category='p1' style={{ width: '100%' }}>The Free Software Foundation may publish revised and/or new versions of
							the GNU General Public License from time to time.  Such new versions will
							be similar in spirit to the present version, but may differ in detail to
							address new problems or concerns.</Text>

						<Text category='p1' style={{ width: '100%' }}>Each version is given a distinguishing version number.  If the
							Program specifies that a certain numbered version of the GNU General
							Public License “or any later version” applies to it, you have the
							option of following the terms and conditions either of that numbered
							version or of any later version published by the Free Software
							Foundation.  If the Program does not specify a version number of the
							GNU General Public License, you may choose any version ever published
							by the Free Software Foundation.</Text>

						<Text category='p1' style={{ width: '100%' }}>If the Program specifies that a proxy can decide which future
							versions of the GNU General Public License can be used, that proxys
							public statement of acceptance of a version permanently authorizes you
							to choose that version for the Program.</Text>

						<Text category='p1' style={{ width: '100%' }}>Later license versions may give you additional or different
							permissions.  However, no additional obligations are imposed on any
							author or copyright holder as a result of your choosing to follow a
							later version.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section15">15. Disclaimer of Warranty.</Text>

						<Text category='p1' style={{ width: '100%' }}>THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
							APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
							HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM “AS IS” WITHOUT WARRANTY
							OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
							THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
							PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
							IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
							ALL NECESSARY SERVICING, REPAIR OR CORRECTION.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section16">16. Limitation of Liability.</Text>

						<Text category='p1' style={{ width: '100%' }}>IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
							WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
							THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
							GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
							USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
							DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
							PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
							EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
							SUCH DAMAGES.</Text>

						<Text category='h2' style={{ ...gloStyles?.h2, marginBottom: 0, marginTop: 20 }} id="section17">17. Interpretation of Sections 15 and 16.</Text>

						<Text category='p1' style={{ width: '100%' }}>If the disclaimer of warranty and limitation of liability provided
							above cannot be given local legal effect according to their terms,
							reviewing courts shall apply local law that most closely approximates
							an absolute waiver of all civil liability in connection with the
							Program, unless a warranty or assumption of liability accompanies a
							copy of the Program in return for a fee.</Text>

						<View style={{ alignItems: 'center', marginBottom: 40 }}>
							<LeafIcon width={180} height={60} style={{ ...gloStyles?.leaf }} />
						</View>
						<StatusBar style={Platform.OS === 'android' ? 'light' : 'dark'} backgroundColor='#31a060' translucent={false} />
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
