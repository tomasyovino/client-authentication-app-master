import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, displayHeader, data }) => {
  return (
    <>
        { displayHeader ? <Header data={data} /> : null }
        <div className='layout'>
            {  children }
        </div>
        <Footer />
    </>
  )
}

export default Layout