
import { Link } from 'react-router-dom';

function Category() {
  return (
    <>
      <div className='text-3xl text-[#6CCFF6]'>Category</div>
      <div className='container mt-5'>
        <div className="links">
          <div className='flex gap-6 inner_container'>
            <Link className="link" to="/?category=typescript">
              <span className='cursor-pointer p-2 bg-[#6CCFF6] rounded-full text-black'>#typescript</span>
            </Link>
            <Link className="link" to="/?category=react">
              <span className='cursor-pointer p-2 bg-[#6CCFF6] rounded-full text-black'>#react</span>
            </Link>
            <Link className="link" to="/?category=database">
              <span className='cursor-pointer p-2 bg-[#6CCFF6] rounded-full text-black'>#database</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;

