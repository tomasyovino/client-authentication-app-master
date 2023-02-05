import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='min-h-[80vh] h-full bg-gray-50'>
        <Header />
        <div className='flex flex-col items-center justify-center min-h-[80vh]'>
            {  children }
        </div>
        <Footer />
    </div>
  )
}

export default Layout