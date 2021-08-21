import { Container } from "reactstrap";

export interface IHeaderProps {
    title: string;
   
  }
  
  const PageHeader: React.FunctionComponent<IHeaderProps> = (props) => {
    const {title,children  } = props;
    return(
        <Container fluid className="p-0">
 
        <section style={{marginTop:110,}}>
        <div  style={{fontWeight:'bold', marginBottom:'5rem', backgroundColor:'whitesmoke',}}  >
        <h2  className="text-center">{title}</h2>
        </div>
        <Container>
            {children}
        </Container>
        </section>
        </Container>
    )
  }

  export default PageHeader;

