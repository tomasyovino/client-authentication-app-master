import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, displayHeader }) => {
  return (
    <>
        { displayHeader ? <Header /> : null }
        <div className='layout'>
            {  children }
        </div>
        <Footer />
    </>
  )
}

export default Layout