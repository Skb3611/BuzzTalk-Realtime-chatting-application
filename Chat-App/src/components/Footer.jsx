import React from 'react'
import logo from '../assets/logo.png'


const Footer = () => {
    let date=new Date()
    let year=date.getFullYear()
    return (
        <div>
            <footer className="text-gray-400 bg-gray-900 body-font fixed bottom-0 w-full">
                <div className="container py-3  px-5  mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <img src={logo} width={40} alt="" />
                        <span className="ml-3 text-xl">BuzzTalk</span>
                    </a>
                    <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">©{year} BuzzTalk —
                        <a href="https://www.instagram.com/shubham_bhilare_3611?igsh=MWl6MTdlOG5tdXB6MQ==" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@Shubham_bhilare</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a href='https://github.com/Skb3611' target='_blank' className="text-gray-400">
                        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
  <path stroke="none" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.045c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.107-.776.418-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.382 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.006.403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.804 5.625-5.475 5.92.43.37.823 1.1.823 2.22v3.293c0 .322.216.694.824.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
</svg>

                        </a>
                        <a href='https://x.com/Shubham60071600?t=NFASGHgAj_x81_O9vZPjgw&s=08' target='_blank' className="ml-3 text-gray-400">
                            <svg fill="currentColor"  className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a href='https://www.instagram.com/shubham_bhilare_3611?igsh=MWl6MTdlOG5tdXB6MQ==' target='_blank' className="ml-3 text-gray-400">
                            <svg fill="none" stroke="currentColor"  className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a href='https://www.linkedin.com/in/shubham-bhilare-0a694a309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='_blank' className="ml-3 text-gray-400">
                            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
