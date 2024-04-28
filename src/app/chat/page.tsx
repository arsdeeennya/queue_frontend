/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 sticky top-0">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <a href="/">
            <span className="font-semibold text-xl tracking-tight">
              並び代行マッチングサービス
            </span>
          </a>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {/* <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Docs
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Examples
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Blog
            </a> */}
          </div>
          <div>
            <a
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              ログイン
            </a>
          </div>
        </div>
      </nav>
      <div className="h-screen flex flex-col">
        <div className="bg-gray-200 flex-1 overflow-y-scroll">
          <div className="px-4 py-2">
            <div className="flex items-center mb-2">
              {/* <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar"> */}
              <div className="font-medium">John Doe</div>
            </div>
            <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
              Hi, how can I help you?
            </div>
            <div className="flex items-center justify-end">
              <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                Sure, I can help with that.
              </div>
              {/* <img className="w-8 h-8 rounded-full" src="https://picsum.photos/50/50" alt="User Avatar"> */}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-2 sticky bottom-0">
          <div className="flex items-center">
            {/* <input className="w-full border rounded-full py-2 px-4 mr-2" type="text" placeholder="Type your message..."> */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
