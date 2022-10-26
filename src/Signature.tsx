import {PhotoSignatureProps} from "./App";
import CSS from 'csstype';
import image from "./assets/ancho-180.gif"
import image1 from "./assets/linea 2 x 150.png"
import image2 from "./assets/linea 1 x 150.png"
import image3 from "./assets/tucuman.png"
import image4 from "./assets/pino-vuelta.gif"

const Signature = (props: PhotoSignatureProps) => {
    //Direccion, modifico tamaño y color(line-height a 0)
    const styleAdress: CSS.Properties = {
        ['font-size' as any]: '16px',
        ['align-items' as any]: 'center',
        ['padding-left' as any]: '20px',
        ['width' as any]: '251px',
        ['line-height' as any]: '10px',
        ['white-space' as any]: 'nowrap',
        ['color' as any ]:'#59595b'
    } 
    const styleSignature: CSS.Properties = {
        ['height' as any]: '140px',
        ['max-width' as any]: '100%',
        [' white-space' as any]: 'nowrap',
        ['background' as any]: '#FFFFFF',
        ['color' as any ]:'#848688'
    }
    
    const styleMainImage: CSS.Properties = {
        ['width' as any]: '100%',
        ['heigth' as any]: '150px'
    } 
    const styleImageLinea: CSS.Properties = {
        ['height' as any]: '171px',
        ['width' as any]: '3px',
        ['margin-right' as any]: '20px',
        ['margin-left' as any]: '10px'
        
    } 
    //Nombre Completo, modif tamaño, line-height a 19 y  color
    const styleName: CSS.Properties = {
        ['font-size' as any]: '20px',
        ['padding-left' as any]: '20px',

        ['color' as any]: '#036838',

        ['line-height' as any]: '10px'
    }
    //Puesto, modifico tamaño, color y line-height
    const stylePosition: CSS.Properties = {
        ['font-size' as any]: '17px',
        ['padding-left' as any]: '20px',
        ['color' as any]: '#40A274',

        ['line-height' as any]: '15px',
        // Agrego 2 lineas de codigo
        ['position' as any]: 'relative',
        
        ['top' as any]: '-8px'
    }  
    const styleSignatureImage: CSS.Properties = {
        ['vertical-align' as any]: 'inherit'
    }
    const styleSignatureEmail: CSS.Properties = {
        ['vertical-align' as any]: 'inherit'
    }
    
    //Telefono y Mail, agrego color y tamaño de fuente, y line-height en 0
    const styleTd: CSS.Properties = {
        ['padding-left' as any]: '20px',
        ['font-size' as any] : '16px',

        ['color' as any]: '#59595b',        

        ['line-height' as any]: '0px'
    } 
    const styleTdImage: CSS.Properties = {
        ['padding-right' as any]: '10px'
    }
    const styleContenedor: CSS.Properties = {
        ['height' as any]: '170px'
    }
    // const styleLineHeight: CSS.Properties = {
    //     ['line-height' as any]: '40px'
    // }
    return (
        <div className={"signature"} style={styleContenedor}>
            <table cellPadding={0} cellSpacing={0} style={styleSignature} >
                <tbody>
                <tr>
                    <td style={styleTdImage} rowSpan={5}>
                        <img
                            style={styleMainImage}
                            //src="https://cofaral.s3.us-east-2.amazonaws.com/prod/images/firm/logofirma.gif"
                            src="https://cofaral.s3.us-east-2.amazonaws.com/prod/images/firm/Icono%20cofa%20pino-gira.gif"
                            //src={image4}
                            //src={image}
                            alt={""}
                        />
                    </td>
                    <td rowSpan={5}>
                        {/* { <img src="https://cofaral.s3.us-east-2.amazonaws.com/prod/images/firm/linea%202%20x%20150.png" 
                        height="150px" width="2px"  alt="" /> } */}
                        
                    </td>
                    <td style={styleName}><b >{props.fullName}</b></td>
                </tr>
                
                <tr>
                    
                    <td  colSpan={3} style={stylePosition} >{props.position}</td>
                </tr>
                <tr>
                    <td style={styleTd} colSpan={3} ><img style={styleSignatureImage} src="https://cofaral.s3.us-east-2.amazonaws.com/prod/images/firm/telefono_1.png" alt={""} />     {props.phone}</td>
                </tr>
                <tr>
                    <td style={styleTd} colSpan={3} ><img style={styleSignatureEmail} src="https://cofaral.s3.us-east-2.amazonaws.com/prod/images/firm/email.png" alt={""} /> {props.email}</td>
                </tr>
                {/* <tr>
                    <td  style={styleAdress}  colSpan={3} ><img style={styleSignatureImage} src="https://cofaral.s3.us-east-2.amazonaws.com/prod/images/firm/lugar_1.png" alt={""} />     Catamarca 1053 - Tucumán - CP:4000</td>
                </tr> */}
                <tr>
                    <td  style={styleAdress}  colSpan={3} ><img style={styleSignatureImage} src="https://cofaral.s3.us-east-2.amazonaws.com/prod/images/firm/tucuman.png" height="15xt nmhjbpx"  alt={""} /><a href="https://goo.gl/maps/KKjiYxUMZRZRrxux6">Catamarca 1053 - Tucumán</a></td>
                </tr> 


                {/* <tr>
                    <td colSpan={3}>
                        <div className={"social-logos-frame"}>
                            <a href={"https://cofaral.com.ar/"}>
                                <img src={WebLogo} alt={""}/>
                            </a>
                            <a href={"https://www.linkedin.com/"}>
                                <img src={LinkedInLogo} alt={""}/>
                            </a>
                            <a href={"https://www.facebook.com/"}>
                                <img src={FacebookLogo} alt={""}/>
                            </a>
                        </div>
                    </td>
                </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default Signature;
