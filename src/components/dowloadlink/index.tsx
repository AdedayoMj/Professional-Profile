import React from 'react'

interface IDowloadProps{
    pathlink:string
}


const DownloadLink : React.FunctionComponent<IDowloadProps> = (props) => {
    const {children,pathlink}=props
    return(
        // <a rel="noopener noreferrer" target="_blank" href={pathlink} download="Dr Oyelola Adegboye Resume">{children}</a>
        <a style={{color:'red'}}  rel="noopener noreferrer" target="_blank" href={pathlink} >{children}</a>
    )
}

export default DownloadLink;