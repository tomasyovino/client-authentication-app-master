import Header from './Header'

const Layout = ({ children, displayHeader }) => {
  return (
    <>
        { displayHeader ? <Header /> : null }
        <div className='layout'>
            {  children }
        </div>
    </>
  )
}

export default Layout