

function Footer() {
  return (
    <footer className="py-6 mt-12 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full mb-4 text-center md:w-1/3 md:text-left md:mb-0">
            <h2 className="text-xl font-bold">MyWebsite</h2>
            <p className="text-gray-400">© 2024 MyWebsite. All rights reserved.</p>
          </div>
          
          <div className="w-full text-center md:w-1/3 md:text-right">
            <ul className="flex justify-center space-x-4 md:justify-end">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
