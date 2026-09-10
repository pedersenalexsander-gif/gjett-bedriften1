import ContentPage, {generateMetadata as getMetadata} from '../components/content-page';
export function generateMetadata(){return getMetadata({params:Promise.resolve({slug:'ansatte'})})}
export default function Page(){return <ContentPage params={Promise.resolve({slug:'ansatte'})}/> }
